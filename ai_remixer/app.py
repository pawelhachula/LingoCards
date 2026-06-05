import datetime
import sys
import os
import time
import shutil
import json
import tempfile
os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'
import subprocess
from pathlib import Path
from flask import Flask, request, jsonify, render_template, send_from_directory
from werkzeug.utils import secure_filename
from pydub import AudioSegment
from pydub import effects
import numpy as np
import librosa

app = Flask(__name__)
app.debug = False
app.config['DEBUG'] = False
app.config['PROPAGATE_EXCEPTIONS'] = False
app.config['TRAP_HTTP_EXCEPTIONS'] = False
BASE_DIR = Path(__file__).resolve().parent

def choose_data_dir():
    candidates = [
        BASE_DIR / 'runtime_data',
        Path(os.environ.get('LOCALAPPDATA', '')) / 'AI Remix Studio' if os.environ.get('LOCALAPPDATA') else None,
        Path.home() / 'Documents' / 'AI Remix Studio',
        Path(tempfile.gettempdir()) / 'AI Remix Studio',
    ]

    for candidate in candidates:
        if candidate is None:
            continue
        try:
            candidate.mkdir(parents=True, exist_ok=True)
            test_file = candidate / '.write_test'
            test_file.write_text('ok', encoding='utf-8')
            test_file.unlink(missing_ok=True)
            return candidate
        except Exception as e:
            print(f"Data directory not writable ({candidate}): {e}", flush=True)

    raise RuntimeError('No writable data directory found for uploads, stems, and exports.')

DATA_DIR = choose_data_dir()
UPLOAD_FOLDER = DATA_DIR / 'uploads'
STEMS_FOLDER = DATA_DIR / 'stems'
EXPORTS_FOLDER = DATA_DIR / 'exports'
DEMUCS_MODEL = 'htdemucs'
APP_PORT = int(os.environ.get('AI_REMIXER_PORT', '5055'))
USE_DEMUCS = False  # Disabled to prevent crashes
APP_VERSION = 'fast-fallback-2026-04-19-2'


def clamp(value, minimum, maximum):
    return max(minimum, min(maximum, value))


def apply_chorus_effect(segment, amount):
    amount = clamp(float(amount or 0), 0.0, 1.0)
    if amount <= 0:
        return segment

    wet = segment
    for delay_ms, gain in [(14, -8), (22, -10), (31, -12)]:
        delayed = AudioSegment.silent(duration=delay_ms, frame_rate=segment.frame_rate) + segment.apply_gain(gain)
        wet = wet.overlay(delayed)

    return segment.overlay(wet.apply_gain(-16 + amount * 12))


def apply_soft_distortion(segment, amount):
    amount = clamp(float(amount or 0), 0.0, 1.0)
    if amount <= 0:
        return segment

    if segment.sample_width != 2:
        segment = segment.set_sample_width(2)

    samples = np.array(segment.get_array_of_samples(), dtype=np.float32)
    max_amp = float(2 ** (8 * segment.sample_width - 1))
    drive = 1.0 + amount * 14.0

    norm = samples / max_amp
    shaped = np.tanh(norm * drive) / np.tanh(drive)
    shaped = np.clip(shaped, -1.0, 1.0)
    out = (shaped * (max_amp - 1)).astype(np.int16)
    return segment._spawn(out.tobytes())

def advanced_audio_process(segment, pitch_steps=0, rate=1.0):
    if abs(pitch_steps) <= 0.001 and abs(rate - 1.0) <= 0.001:
        return segment
    
    # Convert AudioSegment to numpy array (float32)
    samples = np.array(segment.get_array_of_samples(), dtype=np.float32)
    
    if segment.channels == 2:
        samples = samples.reshape((-1, 2)).T # shape: (2, N)
    else:
        samples = samples.reshape((1, -1)) # shape: (1, N)
        
    max_amp = float(2**(8*segment.sample_width - 1))
    samples /= max_amp
    
    sr = segment.frame_rate
    
    try:
        if abs(rate - 1.0) > 0.001:
            samples = librosa.effects.time_stretch(samples, rate=rate)
            
        if abs(pitch_steps) > 0.001:
            samples = librosa.effects.pitch_shift(samples, sr=sr, n_steps=pitch_steps)
            
        samples = np.clip(samples, -1.0, 1.0)
        samples = (samples * (max_amp - 1)).astype(np.int16)
        
        if segment.channels == 2:
            samples = samples.T.flatten()
        else:
            samples = samples.flatten()
            
        return segment._spawn(samples.tobytes())
    except Exception as e:
        print(f"Librosa processing error: {e}", flush=True)
        # Fallback to original segment if processing fails
        return segment

def pydub_to_np(audio_segment):
    samples = np.array(audio_segment.get_array_of_samples(), dtype=np.float32)
    max_amp = float(2**(8*audio_segment.sample_width - 1))
    samples /= max_amp
    if audio_segment.channels == 2:
        samples = samples.reshape((-1, 2))
    else:
        samples = np.column_stack((samples, samples))
    return samples

def np_to_pydub(samples, frame_rate=44100):
    samples = np.clip(samples, -1.0, 1.0)
    samples = (samples * 32767.0).astype(np.int16)
    return AudioSegment(
        samples.tobytes(), 
        frame_rate=frame_rate,
        sample_width=2, 
        channels=2
    )

app.config['UPLOAD_FOLDER'] = str(UPLOAD_FOLDER)
app.config['STEMS_FOLDER'] = str(STEMS_FOLDER)
app.config['EXPORTS_FOLDER'] = str(EXPORTS_FOLDER)
LIBRARY_FILE = str(EXPORTS_FOLDER / 'library.json')

# Create directories if they don't exist
for folder in [app.config['UPLOAD_FOLDER'], app.config['STEMS_FOLDER'], app.config['EXPORTS_FOLDER']]:
    os.makedirs(folder, exist_ok=True)


def get_demucs_command():
    # On this Windows setup the generated demucs.exe wrapper can crash with
    # 3221225477, while the module entrypoint works with the same environment.
    return [sys.executable, '-m', 'demucs.separate']

def normalize_for_demucs(input_path, track_name):
    output_path = UPLOAD_FOLDER / f"{track_name}.wav"
    print("Preparing WAV for Demucs:", output_path, flush=True)

    try:
        audio = AudioSegment.from_file(input_path)
        audio = audio.set_channels(2).set_frame_rate(44100).set_sample_width(2)
        audio.export(output_path, format='wav')
        return output_path
    except Exception as e:
        print("Audio conversion failed, using original file:", e, flush=True)
        return input_path

def run_demucs(input_path):
    env = os.environ.copy()
    env['KMP_DUPLICATE_LIB_OK'] = 'True'
    env['OMP_NUM_THREADS'] = '1'
    env['MKL_NUM_THREADS'] = '1'

    cmd = [
        *get_demucs_command(),
        '-n',
        DEMUCS_MODEL,
        '-d',
        'cpu',
        '-j',
        '1',
        '--segment',
        '7',
        '-o',
        app.config['STEMS_FOLDER'],
        str(input_path),
    ]
    print("Running Demucs:", " ".join(cmd), flush=True)
    log_path = DATA_DIR / 'demucs_last.log'
    
    try:
        with open(log_path, 'w', encoding='utf-8', errors='replace') as log_file:
            # Add timeout to prevent hanging
            result = subprocess.run(
                cmd,
                stdout=log_file,
                stderr=subprocess.STDOUT,
                text=True,
                env=env,
                cwd=str(BASE_DIR),
                timeout=300,  # 5 minute timeout
            )

        if result.returncode != 0:
            try:
                log_text = log_path.read_text(encoding='utf-8', errors='replace')
            except Exception:
                log_text = ''
            detail = '\n'.join(log_text.strip().splitlines()[-20:])
            raise subprocess.CalledProcessError(result.returncode, cmd, output=detail, stderr=detail)
            
        print("Demucs completed successfully", flush=True)
        
    except subprocess.TimeoutExpired:
        print("Demucs timed out after 5 minutes", flush=True)
        raise subprocess.CalledProcessError(124, cmd, output="Demucs processing timed out")
    except Exception as e:
        print(f"Demucs process failed: {e}", flush=True)
        raise subprocess.CalledProcessError(1, cmd, output=f"Process error: {str(e)}")

    return result

def create_basic_stems(input_path, track_name):
    print(f"Creating fast fallback stems for {track_name} using ffmpeg", flush=True)
    stems_dir = STEMS_FOLDER / DEMUCS_MODEL / track_name
    stems_dir.mkdir(parents=True, exist_ok=True)

    # FFMPEG is much faster than pydub for these filters on long files
    filters = {
        'bass': 'lowpass=f=250',
        'drums': 'highpass=f=2500',
        'vocals': 'highpass=f=200,lowpass=f=4000',
        'other': 'volume=0.9'
    }

    for name, filter_str in filters.items():
        out_path = stems_dir / f'{name}.wav'
        print(f"Generating {name} stem...", flush=True)
        try:
            cmd = [
                'ffmpeg', '-y', '-i', str(input_path),
                '-af', filter_str,
                '-ar', '44100', '-ac', '2',
                str(out_path)
            ]
            subprocess.run(cmd, check=True, capture_output=True)
        except Exception as e:
            print(f"FFmpeg failed for {name}, falling back to silent placeholder: {e}", flush=True)
            # Create a silent file as absolute fallback
            silent = AudioSegment.silent(duration=1000)
            silent.export(out_path, format='wav')

    return stems_dir

def find_stems_dir(track_name):
    expected = STEMS_FOLDER / DEMUCS_MODEL / track_name
    required = {'vocals.wav', 'drums.wav', 'bass.wav', 'other.wav'}

    try:
        if expected.is_dir():
            existing = {p.name for p in expected.iterdir() if p.is_file()}
            if required.issubset(existing):
                return expected
    except OSError as e:
        print(f"Could not inspect stems directory: {e}", flush=True)

    existing = set()
    try:
        if expected.is_dir():
            existing = {p.name for p in expected.iterdir() if p.is_file()}
    except OSError:
        existing = set()

    missing = sorted(required - existing)
    raise FileNotFoundError(f"Stem files were not created for '{track_name}'. Missing: {', '.join(missing)}")

def load_library():
    if os.path.exists(LIBRARY_FILE):
        try:
            with open(LIBRARY_FILE, 'r') as f:
                return json.load(f)
        except:
            return []
    return []

def save_library(lib):
    with open(LIBRARY_FILE, 'w') as f:
        json.dump(lib, f, indent=4)

def audio_file_candidates(filename):
    candidates = [
        UPLOAD_FOLDER / filename,
        BASE_DIR / 'uploads' / filename,
    ]
    # Check in subdirectories (uploads/track_name/filename)
    track_name_guess = filename.rsplit('.', 1)[0]
    candidates.append(UPLOAD_FOLDER / track_name_guess / filename)
    
    # Final fallback: find any file with this name in UPLOAD_FOLDER
    for p in UPLOAD_FOLDER.rglob(filename):
        if p.is_file():
            candidates.append(p)
            
    return candidates

def find_upload_file(filename):
    for candidate in audio_file_candidates(filename):
        if candidate.exists() and candidate.is_file():
            return candidate
    return None

def stems_payload(stems_dir):
    stems_path = f"/stems/{DEMUCS_MODEL}/{stems_dir.name}"
    return {
        'vocals': f"{stems_path}/vocals.wav",
        'drums': f"{stems_path}/drums.wav",
        'bass': f"{stems_path}/bass.wav",
        'other': f"{stems_path}/other.wav",
    }

def read_upload_metadata():
    metadata_file = UPLOAD_FOLDER / 'uploads_metadata.json'
    if metadata_file.exists():
        try:
            with open(metadata_file, 'r') as f:
                return json.load(f)
        except Exception:
            return []
    return []

def write_upload_metadata(uploads):
    metadata_file = UPLOAD_FOLDER / 'uploads_metadata.json'
    with open(metadata_file, 'w') as f:
        json.dump(uploads, f, indent=4)

def upsert_upload_record(record):
    uploads = read_upload_metadata()
    uploads = [item for item in uploads if item.get('track_name') != record.get('track_name')]
    if not record.get('display_name'):
        record['display_name'] = record.get('track_name', '')
    uploads.insert(0, record)
    write_upload_metadata(uploads)


def sanitize_display_name(name, fallback):
    cleaned = (name or '').strip()
    if not cleaned:
        cleaned = fallback
    return cleaned[:120]

def ensure_upload_stems(track_name, filename):
    try:
        stems_dir = find_stems_dir(track_name)
        # Repair legacy fallback stems where vocals were exported as silence.
        vocals_path = stems_dir / 'vocals.wav'
        try:
            vocals = AudioSegment.from_file(vocals_path)
            if vocals.rms < 5:
                raise FileNotFoundError("Legacy silent vocals detected, regenerating stems.")
        except Exception:
            source = find_upload_file(filename)
            if source is None:
                raise FileNotFoundError(f"Upload file not found: {filename}")
            prepared_input = normalize_for_demucs(source, track_name)
            return create_basic_stems(prepared_input, Path(prepared_input).stem)
        return stems_dir
    except FileNotFoundError:
        source = find_upload_file(filename)
        if source is None:
            raise FileNotFoundError(f"Upload file not found: {filename}")
        prepared_input = normalize_for_demucs(source, track_name)
        return create_basic_stems(prepared_input, Path(prepared_input).stem)

@app.route('/')
def index():
    return render_template('index.html')

@app.errorhandler(Exception)
def handle_unexpected_error(e):
    import traceback
    error_text = traceback.format_exc()
    print(error_text, flush=True)
    try:
        (DATA_DIR / 'last_error.log').write_text(error_text, encoding='utf-8', errors='replace')
    except Exception:
        pass
    return jsonify({'error': str(e) or e.__class__.__name__}), 500

@app.route('/api/health')
def health():
    return jsonify({
        'success': True,
        'version': APP_VERSION,
        'port': APP_PORT,
        'use_demucs': USE_DEMUCS,
        'data_dir': str(DATA_DIR),
    })

@app.route('/api/upload', methods=['POST'])
def upload():
    try:
        print("--- UPLOAD API CALLED ---", flush=True)

        if 'file' not in request.files:
            print("Upload Error: No file part in request", flush=True)
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']

        if file.filename == '':
            print("Upload Error: No selected file", flush=True)
            return jsonify({'error': 'No selected file'}), 400

        print(f"Uploading file: {file.filename}", flush=True)
        filename = secure_filename(file.filename)
        if not filename:
            filename = f"upload_{int(time.time())}.mp3"
            print(f"Filename was empty after sanitization, using fallback: {filename}", flush=True)
        
        track_name = os.path.splitext(filename)[0]
        if not track_name:
            track_name = f"track_{int(time.time())}"

        existing = read_upload_metadata()
        print(f"DEBUG: Checking duplicates for track_name: {track_name}", flush=True)
        print(f"DEBUG: Metadata has {len(existing)} items", flush=True)
        
        # Check if track exists in metadata AND file physically exists
        existing_item = next((item for item in existing if item.get('track_name') == track_name), None)
        if existing_item:
            existing_filename = existing_item.get('filename')
            print(f"DEBUG: Found existing item with filename: {existing_filename}", flush=True)
            
            # Check if file physically exists
            found_file = find_upload_file(existing_filename)
            print(f"DEBUG: find_upload_file result: {found_file}", flush=True)
            
            if found_file is not None:
                print(f"Upload Error: Track {track_name} already exists (file found at {found_file})", flush=True)
                return jsonify({'error': 'Track already exists in uploads.', 'duplicate': True}), 409
            else:
                # File doesn't exist physically, remove from metadata and allow re-upload
                print(f"Track {track_name} found in metadata but file missing, allowing re-upload", flush=True)
                uploads = [item for item in existing if item.get('track_name') != track_name]
                write_upload_metadata(uploads)
        else:
            print(f"DEBUG: No existing item found for track_name: {track_name}", flush=True)

        UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
        filepath = UPLOAD_FOLDER / filename
        
        print(f"Saving file to: {filepath}", flush=True)
        file.save(str(filepath))
        print("FILE SAVED SUCCESS", flush=True)

        # Keep upload focused on file saving and stem separation.
        bpm = 120.0
        key = 'Unknown'

        print("Normalizing audio for processing...", flush=True)
        prepared_input = normalize_for_demucs(filepath, track_name)
        stem_track_name = Path(prepared_input).stem
        print(f"Normalized input ready: {prepared_input}", flush=True)

        if USE_DEMUCS:
            try:
                print("Starting Demucs separation...", flush=True)
                run_demucs(prepared_input)
                stems_dir = find_stems_dir(stem_track_name)
                print("Demucs completed successfully", flush=True)
            except subprocess.CalledProcessError as demucs_error:
                print(f"Demucs failed with {demucs_error.returncode}; using fallback stems", flush=True)
                stems_dir = create_basic_stems(prepared_input, stem_track_name)
            except Exception as e:
                print(f"Unexpected error during Demucs: {e}", flush=True)
                try:
                    stems_dir = create_basic_stems(prepared_input, stem_track_name)
                except Exception as fallback_error:
                    print(f"Fallback stems also failed: {fallback_error}", flush=True)
                    return jsonify({'error': f'Audio processing failed: {str(e)}'}), 500
        else:
            print("Using fast fallback stems (Demucs disabled)", flush=True)
            stems_dir = create_basic_stems(prepared_input, stem_track_name)

        if not stems_dir.exists():
            print("Error: stems_dir does not exist after processing", flush=True)
            return jsonify({'error': 'Stem files were not created.'}), 500

        record = {
            'track_name': stems_dir.name,
            'display_name': track_name,
            'filename': filename,
            'bpm': round(bpm, 1),
            'key': key,
            'date': time.strftime("%Y-%m-%d %H:%M"),
        }
        print(f"Updating metadata for {track_name}", flush=True)
        upsert_upload_record(record)

        print("UPLOAD COMPLETE SUCCESS", flush=True)
        return jsonify({
            'success': True,
            'track_name': stems_dir.name,
            'original_url': f"/uploads/{filename}",
            'bpm': round(bpm, 1),
            'key': key,
            'stems': stems_payload(stems_dir)
        })

    except Exception as e:
        import traceback
        error_text = traceback.format_exc()
        print("FATAL UPLOAD ERROR:", error_text, flush=True)
        try:
            (DATA_DIR / 'last_upload_error.log').write_text(error_text, encoding='utf-8', errors='replace')
        except Exception:
            pass
        return jsonify({'error': str(e) or e.__class__.__name__}), 500

@app.route('/api/export-hq', methods=['POST'])
def export_hq():
    data = request.json or {}
    track_name = data.get('track_name')
    volumes = data.get('volumes', {'vocals': 0, 'drums': 0, 'bass': 0, 'other': 0})
    stem_options = data.get('stem_options', {}) or {}
    pitch = float(data.get('pitch', 0) or 0)
    rate = float(data.get('rate', 1.0) or 1.0)
    reverb_amt = float(data.get('reverb', 0) or 0)
    delay_amt = float(data.get('delay', 0) or 0)
    bassboost = float(data.get('bassboost', 0) or 0)
    vocal_pitch = float(data.get('vocal_pitch', 0) or 0)
    vocal_chorus = float(data.get('vocal_chorus', 0) or 0)
    vocal_dist = float(data.get('vocal_dist', 0) or 0)
    vocal_pitch_shift = float(data.get('vocal_pitch_shift', 0) or 0)
    voice_gender = data.get('voice_gender', 'none')
    remix_label = sanitize_display_name(data.get('remix_label'), 'RMX')

    stems_dir = STEMS_FOLDER / DEMUCS_MODEL / track_name

    try:
        mix = None
        solo_active = any(bool((stem_options.get(s) or {}).get('solo')) for s in ['vocals', 'drums', 'bass', 'other'])

        for stem_name in ['vocals', 'drums', 'bass', 'other']:
            stem_path = stems_dir / f"{stem_name}.wav"
            if not stem_path.exists():
                continue

            opts = stem_options.get(stem_name) or {}
            if bool(opts.get('muted')):
                continue
            if solo_active and not bool(opts.get('solo')):
                continue

            vol_db = float(volumes.get(stem_name, 0) or 0)
            if vol_db <= -60:
                continue

            segment = AudioSegment.from_file(stem_path).set_channels(2).set_frame_rate(44100)

            pan_val = clamp(float(opts.get('pan', 0) or 0), -1.0, 1.0)
            segment = segment.pan(pan_val)

            if stem_name == 'vocals':
                vp = clamp(vocal_pitch, -12.0, 12.0)
                if abs(vp) > 0.001:
                    vp_ratio = 2 ** (vp / 12.0)
                    segment = segment._spawn(
                        segment.raw_data,
                        overrides={'frame_rate': int(segment.frame_rate * vp_ratio)}
                    ).set_frame_rate(44100)
                
                # Voice gender modulation
                if voice_gender != 'none':
                    try:
                        if voice_gender == 'male_to_female':
                            # Shift formants up and add brightness
                            gender_ratio = 1.25   # More noticeable pitch shift
                            formant_shift = 1.4
                        elif voice_gender == 'female_to_male':
                            # Shift formants down and add warmth
                            gender_ratio = 0.75   # More noticeable pitch shift
                            formant_shift = 0.6
                        else:
                            gender_ratio = 1.0
                            formant_shift = 1.0
                        
                        # Apply gender pitch shift
                        if gender_ratio != 1.0:
                            segment = segment._spawn(
                                segment.raw_data,
                                overrides={'frame_rate': int(segment.frame_rate * gender_ratio)}
                            ).set_frame_rate(44100)
                        
                        # Apply formant filtering for gender characteristics
                        if formant_shift > 1.0:  # Female characteristics
                            segment = segment.high_pass_filter(200).low_pass_filter(10000).apply_gain(4)
                        elif formant_shift < 1.0:  # Male characteristics
                            segment = segment.high_pass_filter(100).low_pass_filter(7000).apply_gain(-2)
                            
                    except Exception as e:
                        print(f"Voice gender modulation failed: {e}", flush=True)
                        pass  # Fallback to normal processing
                
                segment = apply_chorus_effect(segment, vocal_chorus)
                segment = apply_soft_distortion(segment, vocal_dist)

            segment = segment.apply_gain(vol_db)
            mix = segment if mix is None else mix.overlay(segment)

        if mix is None:
            return jsonify({'error': 'All stems muted'}), 400

        # Enhanced processing for HQ export
        speed = max(0.5, min(1.5, rate))
        pitch_ratio = 2 ** (max(-12, min(12, pitch)) / 12)
        ratio = speed * pitch_ratio
        if abs(ratio - 1.0) > 0.001:
            mix = mix._spawn(mix.raw_data, overrides={'frame_rate': int(mix.frame_rate * ratio)}).set_frame_rate(48000)

        if delay_amt > 0:
            # Improved delay with feedback and filtering
            delay_time = int(150 + delay_amt * 250)  # Variable delay time
            feedback_gain = -20 + delay_amt * 8  # Controlled feedback
            delayed = AudioSegment.silent(duration=delay_time) + mix.apply_gain(feedback_gain)
            # Add slight filtering to delay for warmth
            delayed = delayed.low_pass_filter(8000).apply_gain(-2)
            mix = mix.overlay(delayed)

        # Enhanced reverb with better diffusion and tail
        if reverb_amt > 0:
            wet = mix
            # More sophisticated reverb with multiple delay taps for natural decay
            for delay_ms, gain, filter_freq in [(40, -12, 8000), (80, -15, 6000), (120, -18, 4000), (200, -21, 2000)]:
                delayed = AudioSegment.silent(duration=delay_ms) + mix.apply_gain(gain)
                if filter_freq < 10000:
                    delayed = delayed.low_pass_filter(filter_freq)
                wet = wet.overlay(delayed)
            # Smoother reverb mix with better gain control
            reverb_gain = -18 + reverb_amt * 12  # More conservative gain range
            mix = mix.overlay(wet.apply_gain(reverb_gain))

        if bassboost > 0:
            # Simple, clean bass boost
            boost_db = bassboost * 0.8  # Convert to reasonable dB gain
            
            # Create bass frequency boost
            bass_freq = mix.low_pass_filter(250).high_pass_filter(40)
            bass_freq = bass_freq.apply_gain(boost_db)
            
            # Normalize to prevent clipping
            bass_freq = effects.normalize(bass_freq, headroom=3.0)
            
            # Mix with original
            mix = mix.overlay(bass_freq)

        # HQ Mastering pass with maximum quality processing
        # Use highest sample rate and bit depth
        mix = mix.set_channels(2).set_frame_rate(96000).set_sample_width(4)  # 32-bit float, 96kHz
        
        # Gentle high-pass to remove subsonic rumble
        mix = mix.high_pass_filter(20)
        
        # Gentle low-pass to prevent harshness (air band)
        mix = mix.low_pass_filter(22000)
        
        # Multi-stage compression for better dynamics
        mix = effects.compress_dynamic_range(mix, threshold=-10.0, ratio=1.5, attack=3, release=80)
        mix = effects.compress_dynamic_range(mix, threshold=-16.0, ratio=2.0, attack=8, release=120)
        mix = effects.compress_dynamic_range(mix, threshold=-20.0, ratio=2.5, attack=15, release=200)
        
        # Enhanced harmonic excitation for presence
        try:
            # Add subtle harmonic enhancement using distortion at very low levels
            harmonics = apply_soft_distortion(mix, 0.1).apply_gain(-28)
            mix = mix.overlay(harmonics)
        except:
            pass  # Fallback if harmonic enhancement fails
        
        # Final normalization with proper headroom for streaming
        mix = effects.normalize(mix, headroom=0.3)

        basename = f"{track_name}_remix_hq_{int(time.time())}"
        wav_name = f"{basename}.wav"
        mp3_name = f"{basename}.mp3"
        flac_name = f"{basename}.flac"
        out_wav = EXPORTS_FOLDER / wav_name
        out_mp3 = EXPORTS_FOLDER / mp3_name
        out_flac = EXPORTS_FOLDER / flac_name
        
        # Export in multiple formats for maximum quality
        # WAV: 32-bit float, 96kHz
        mix.export(out_wav, format='wav', parameters=[
            '-acodec', 'pcm_f32le',  # 32-bit float PCM
            '-ar', '96000',          # 96kHz sample rate
            '-ac', '2',              # Stereo
            '-compression_level', '0'  # No compression
        ])
        
        # FLAC: Lossless compression, 96kHz
        mix.export(out_flac, format='flac', parameters=[
            '-ar', '96000',          # 96kHz sample rate
            '-ac', '2',              # Stereo
            '-compression_level', '0'  # Fastest compression (best for quality)
        ])
        
        # MP3: Highest quality VBR, 48kHz
        mix.export(out_mp3, format='mp3', parameters=[
            '-q:a', '0',             # Highest quality VBR
            '-ar', '48000',          # 48kHz sample rate
            '-ac', '2',              # Stereo
            '-b:a', '320k',          # 320kbps bitrate
            '-joint_stereo', '1',    # Joint stereo for better quality
            '-compression_level', '0', # Least compression
            '-cbr', '1'             # Constant bitrate for consistency
        ])

        # Save to library with all formats
        url = f"/exports/{wav_name}"
        metadata = {
            'id': str(int(time.time())),
            'name': f"{track_name} {remix_label} (HQ)",
            'date': time.strftime("%Y-%m-%d %H:%M"),
            'url': url,
            'mp3_url': f"/exports/{mp3_name}",
            'flac_url': f"/exports/{flac_name}",
            'quality': 'hq'
        }
        
        # Add to library
        lib = load_library()
        lib.append(metadata)
        save_library(lib)

        return jsonify({'success': True, 'url': url, 'metadata': metadata})

    except Exception as e:
        print("HQ Export error:", e, flush=True)
        return jsonify({'error': str(e)}), 500

@app.route('/api/export', methods=['POST'])
def export():
    data = request.json or {}
    print(f"DEBUG export: received data: {data}", flush=True)
    
    track_name = data.get('track_name')
    volumes = data.get('volumes', {'vocals': 0, 'drums': 0, 'bass': 0, 'other': 0})
    stem_options = data.get('stem_options', {}) or {}
    pitch = float(data.get('pitch', 0) or 0)
    rate = float(data.get('rate', 1.0) or 1.0)
    reverb_amt = float(data.get('reverb', 0) or 0)
    delay_amt = float(data.get('delay', 0) or 0)
    bassboost = float(data.get('bassboost', 0) or 0)
    vocal_pitch = float(data.get('vocal_pitch', 0) or 0)
    vocal_chorus = float(data.get('vocal_chorus', 0) or 0)
    vocal_dist = float(data.get('vocal_dist', 0) or 0)
    vocal_pitch_shift = float(data.get('vocal_pitch_shift', 0) or 0)
    master_vol = float(data.get('master_volume', 1.0))
    remix_label = sanitize_display_name(data.get('remix_label'), 'RMX')

    print(f"DEBUG export: track_name={track_name}, volumes={volumes}", flush=True)
    
    if not track_name:
        return jsonify({'error': 'Missing track_name'}), 400

    stems_dir = STEMS_FOLDER / DEMUCS_MODEL / track_name
    print(f"DEBUG export: stems_dir={stems_dir}, exists={stems_dir.exists()}", flush=True)

    try:
        mix_samples = None
        solo_active = any(bool((stem_options.get(s) or {}).get('solo')) for s in ['vocals', 'drums', 'bass', 'other'])
        print(f"DEBUG export: solo_active={solo_active}", flush=True)

        for stem_name in ['vocals', 'drums', 'bass', 'other']:
            stem_path = stems_dir / f"{stem_name}.wav"
            print(f"DEBUG export: checking {stem_name}, exists={stem_path.exists()}", flush=True)
            if not stem_path.exists():
                continue

            opts = stem_options.get(stem_name) or {}
            if bool(opts.get('muted')):
                continue
            if solo_active and not bool(opts.get('solo')):
                continue

            vol_db = float(volumes.get(stem_name, 0) or 0)
            print(f"DEBUG export: {stem_name} vol_db={vol_db}", flush=True)
            if vol_db <= -60:
                print(f"DEBUG export: {stem_name} SKIPPING (<= -60)", flush=True)
                continue

            print(f"DEBUG export: {stem_name} ADDING TO MIX", flush=True)
            segment = AudioSegment.from_file(stem_path).set_channels(2).set_frame_rate(44100)

            pan_val = clamp(float(opts.get('pan', 0) or 0), -1.0, 1.0)
            segment = segment.pan(pan_val)

            if stem_name == 'vocals':
                vp = clamp(vocal_pitch, -12.0, 12.0)
                if abs(vp) > 0.001:
                    # HQ pitch shift without altering length/tempo
                    segment = advanced_audio_process(segment, pitch_steps=vp, rate=1.0)
                
                segment = apply_chorus_effect(segment, vocal_chorus)
                segment = apply_soft_distortion(segment, vocal_dist)

            import math
            # Frontend calculates: stemVol = Math.min(1.0, Math.pow(10, vol_db / 20))
            stem_linear = min(1.0, 10 ** (vol_db / 20.0))
            
            # Frontend calculates: finalVol = stemVol * master_vol
            # HTML5 Audio caps final volume at 1.0
            linear_gain = min(1.0, stem_linear * master_vol)

            print(f"DEBUG export: applying linear gain {linear_gain:.4f} to {stem_name} (vol: {vol_db}, master: {master_vol:.2f})", flush=True)
            
            # Convert to numpy float32 and apply gain
            stem_np = pydub_to_np(segment) * linear_gain
            
            if mix_samples is None:
                mix_samples = stem_np
            else:
                # Add them together (ensure same length)
                max_len = max(len(mix_samples), len(stem_np))
                if len(mix_samples) < max_len:
                    mix_samples = np.pad(mix_samples, ((0, max_len - len(mix_samples)), (0,0)))
                if len(stem_np) < max_len:
                    stem_np = np.pad(stem_np, ((0, max_len - len(stem_np)), (0,0)))
                mix_samples += stem_np

            print(f"DEBUG export: {stem_name} added", flush=True)

        print(f"DEBUG export: loop done, mix_samples is None: {mix_samples is None}", flush=True)
        if mix_samples is None:
            return jsonify({'error': 'All stems muted'}), 400
            
        # Convert mixed float32 numpy array back to Pydub AudioSegment
        mix = np_to_pydub(mix_samples)

        # HQ preview/export effects using Librosa
        speed = max(0.5, min(1.5, rate))
        pitch_val = max(-12, min(12, pitch))
        if abs(speed - 1.0) > 0.001 or abs(pitch_val) > 0.001:
            mix = advanced_audio_process(mix, pitch_steps=pitch_val, rate=speed)

        if delay_amt > 0:
            # Improved delay with feedback and filtering
            delay_time = int(150 + delay_amt * 250)  # Variable delay time
            feedback_gain = -20 + delay_amt * 8  # Controlled feedback
            delayed = AudioSegment.silent(duration=delay_time) + mix.apply_gain(feedback_gain)
            # Add slight filtering to delay for warmth
            delayed = delayed.low_pass_filter(8000).apply_gain(-2)
            mix = mix.overlay(delayed)

        # Enhanced reverb with better diffusion and tail
        if reverb_amt > 0:
            wet = mix
            # More sophisticated reverb with multiple delay taps for natural decay
            for delay_ms, gain, filter_freq in [(40, -12, 8000), (80, -15, 6000), (120, -18, 4000), (200, -21, 2000)]:
                delayed = AudioSegment.silent(duration=delay_ms) + mix.apply_gain(gain)
                if filter_freq < 10000:
                    delayed = delayed.low_pass_filter(filter_freq)
                wet = wet.overlay(delayed)
            # Smoother reverb mix with better gain control
            reverb_gain = -18 + reverb_amt * 12  # More conservative gain range
            mix = mix.overlay(wet.apply_gain(reverb_gain))

        if bassboost > 0:
            # Simple, clean bass boost
            boost_db = bassboost * 0.8  # Convert to reasonable dB gain
            
            # Create bass frequency boost
            bass_freq = mix.low_pass_filter(250).high_pass_filter(40)
            bass_freq = bass_freq.apply_gain(boost_db)
            
            # Normalize to prevent clipping
            bass_freq = effects.normalize(bass_freq, headroom=3.0)
            
            # Mix with original
            mix = mix.overlay(bass_freq)

        # --- MASTERING: IDENTICAL TO PREVIEW ---
        mix = mix.set_channels(2).set_frame_rate(44100)
        
        # We only normalize if the mix is clipping, otherwise we leave dynamics 100% untouched.
        # This guarantees identical sound quality to what you hear in the browser.
        if mix.max_dBFS > -0.1:
            mix = effects.normalize(mix, headroom=0.5)

        basename = f"{track_name}_remix_{int(time.time())}"
        wav_name = f"{basename}.wav"
        out_wav = EXPORTS_FOLDER / wav_name
        
        # Export as fast, lossless 16-bit WAV (CD Quality)
        mix.export(out_wav, format='wav', parameters=["-acodec", "pcm_s16le", "-ar", "44100", "-ac", "2"])

        wav_url = f"/exports/{wav_name}"
        metadata = {
            'id': str(int(time.time())),
            'name': remix_label,
            'date': time.strftime("%Y-%m-%d %H:%M"),
            'url': wav_url,
            'mp3_url': wav_url
        }
        
        # Add to library
        lib = load_library()
        lib.append(metadata)
        save_library(lib)
        print(f"DEBUG export: added to library, library now has {len(lib)} items", flush=True)

        return jsonify({'success': True, 'url': wav_url, 'metadata': metadata})

    except Exception as e:
        import traceback
        print("Export error:", e, flush=True)
        print(traceback.format_exc(), flush=True)
        return jsonify({'error': str(e)}), 500

@app.route('/stems/<path:filename>')
def serve_stems(filename):
    return send_from_directory(app.config['STEMS_FOLDER'], filename)

@app.route('/api/stems', methods=['GET'])
def get_stems():
    track_name = request.args.get('track', '')
    if not track_name:
        return jsonify({'error': 'Missing track parameter'}), 400
    
    # Find stems directory
    stems_dir = STEMS_FOLDER / DEMUCS_MODEL / track_name
    if not stems_dir.exists():
        # Try alternative locations
        for alt_dir in [STEMS_FOLDER / track_name, BASE_DIR / 'stems' / DEMUCS_MODEL / track_name, BASE_DIR / 'stems' / track_name]:
            if alt_dir.exists():
                stems_dir = alt_dir
                break
    
    if not stems_dir.exists():
        return jsonify({'error': 'Stems not found for this track'}), 404
    
    # Check for required stem files
    required_stems = ['vocals.wav', 'drums.wav', 'bass.wav', 'other.wav']
    stems = {}
    for stem in required_stems:
        stem_path = stems_dir / stem
        if stem_path.exists():
            stems[stem.replace('.wav', '')] = f"/stems/{DEMUCS_MODEL}/{track_name}/{stem}"
        else:
            return jsonify({'error': f'Missing stem file: {stem}'}), 404
    
    return jsonify({
        'success': True,
        'track_name': track_name,
        'stems': stems
    })

@app.route('/api/uploads', methods=['GET'])
def get_uploads_list():
    uploads = read_upload_metadata()
    print(f"DEBUG get_uploads_list: metadata has {len(uploads)} items", flush=True)
    
    seen = {item.get('filename') for item in uploads}
    seen_track_names = {item.get('track_name', '') for item in uploads}
    print(f"DEBUG get_uploads_list: seen filenames: {seen}", flush=True)

    # Scan folders for files not in metadata
    for folder in [UPLOAD_FOLDER, BASE_DIR / 'uploads']:
        if not folder.exists():
            print(f"DEBUG get_uploads_list: folder {folder} does not exist", flush=True)
            continue
        print(f"DEBUG get_uploads_list: scanning folder {folder}", flush=True)
        for path in folder.iterdir():
            if not path.is_file():
                continue
            if path.suffix.lower() not in {'.mp3', '.wav', '.flac', '.m4a', '.ogg', '.opus'}:
                print(f"DEBUG get_uploads_list: skipping {path.name} - wrong extension", flush=True)
                continue
            if path.name in seen or path.name == 'notify.wav':
                print(f"DEBUG get_uploads_list: skipping {path.name} - already in metadata or notify.wav", flush=True)
                continue
            # Skip if track_name already exists (prevents .wav and .opus duplicates)
            if path.stem in seen_track_names:
                print(f"DEBUG get_uploads_list: skipping {path.name} - track_name {path.stem} already exists", flush=True)
                continue
            print(f"DEBUG get_uploads_list: adding {path.name} from folder scan", flush=True)
            uploads.append({
                'track_name': path.stem,
                'display_name': path.stem,
                'filename': path.name,
                'bpm': 120.0,
                'key': 'Unknown',
                'date': time.strftime("%Y-%m-%d %H:%M", time.localtime(path.stat().st_mtime)),
            })
            seen.add(path.name)
            seen_track_names.add(path.stem)

    # Return all items that have files physically present
    cleaned = []
    for item in uploads:
        filename = item.get('filename')
        track_name = item.get('track_name', '')
        print(f"DEBUG get_uploads_list: checking item {track_name}, filename={filename}", flush=True)
        if not filename:
            print(f"DEBUG get_uploads_list: skipping - no filename", flush=True)
            continue
        if track_name.startswith(('Millios_full_upload_test', 'notify_upload_test')):
            print(f"DEBUG get_uploads_list: skipping - test record", flush=True)
            continue
        found = find_upload_file(filename)
        print(f"DEBUG get_uploads_list: find_upload_file({filename}) = {found}", flush=True)
        if found is not None:
            if not item.get('display_name'):
                item['display_name'] = track_name
            cleaned.append(item)
            print(f"DEBUG get_uploads_list: added to cleaned", flush=True)
        else:
            print(f"DEBUG get_uploads_list: file not found, skipping", flush=True)

    print(f"DEBUG get_uploads_list: returning {len(cleaned)} items", flush=True)
    return jsonify(cleaned)

@app.route('/api/uploads/delete', methods=['POST'])
def delete_upload():
    data = request.json or {}
    track_name = data.get('track_name')
    filename = data.get('filename')
    if not track_name or not filename:
        return jsonify({'error': 'Missing track_name or filename'}), 400

    uploads = [item for item in read_upload_metadata() if item.get('track_name') != track_name and item.get('filename') != filename]
    write_upload_metadata(uploads)

    for candidate in audio_file_candidates(filename):
        try:
            if candidate.exists() and candidate.is_file():
                candidate.unlink()
        except Exception as e:
            print("Could not delete upload file:", e, flush=True)

    # Also remove normalized WAV if it exists.
    for folder in [UPLOAD_FOLDER, BASE_DIR / 'uploads']:
        try:
            wav_candidate = folder / f"{track_name}.wav"
            if wav_candidate.exists() and wav_candidate.is_file():
                wav_candidate.unlink()
        except Exception as e:
            print("Could not delete normalized wav:", e, flush=True)

    stems_dir = STEMS_FOLDER / DEMUCS_MODEL / track_name
    if stems_dir.exists():
        shutil.rmtree(stems_dir, ignore_errors=True)

    return jsonify({'success': True})


@app.route('/api/uploads/rename', methods=['POST'])
def rename_upload():
    data = request.json or {}
    track_name = data.get('track_name')
    new_name = sanitize_display_name(data.get('new_name'), '')
    if not track_name or not new_name:
        return jsonify({'error': 'Missing track_name or new_name'}), 400

    uploads = read_upload_metadata()
    updated = False
    for item in uploads:
        if item.get('track_name') == track_name:
            item['display_name'] = new_name
            updated = True
            break
    if not updated:
        return jsonify({'error': 'Track not found'}), 404
    write_upload_metadata(uploads)
    return jsonify({'success': True})

@app.route('/api/prepare-upload', methods=['POST'])
def prepare_upload():
    data = request.json or {}
    track_name = data.get('track_name')
    filename = data.get('filename')
    if not track_name or not filename:
        return jsonify({'error': 'Missing track_name or filename'}), 400

    stems_dir = ensure_upload_stems(track_name, filename)
    return jsonify({
        'success': True,
        'track_name': stems_dir.name,
        'original_url': f"/uploads/{filename}",
        'stems': stems_payload(stems_dir),
    })

@app.route('/uploads/<filename>')
def serve_upload(filename):
    if (UPLOAD_FOLDER / filename).exists():
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    legacy_folder = BASE_DIR / 'uploads'
    return send_from_directory(str(legacy_folder), filename)

@app.route('/api/save_remix_blob', methods=['POST'])
def save_remix_blob():
    try:
        track_name = request.form.get('track_name', 'Unknown')
        remix_label = sanitize_display_name(request.form.get('remix_label'), 'RMX')
        file = request.files.get('file')
        
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400
            
        basename = f"{track_name}_{remix_label}_{int(time.time())}"
        wav_name = f"{basename}.wav"
        out_wav = EXPORTS_FOLDER / wav_name
        
        file.save(str(out_wav))
        
        # Opcjonalnie: konwersja na MP3 dla mniejszego rozmiaru w bibliotece
        try:
            mp3_name = f"{basename}.mp3"
            out_mp3 = EXPORTS_FOLDER / mp3_name
            AudioSegment.from_file(out_wav).export(out_mp3, format="mp3", bitrate="192k")
            final_name = mp3_name
            # Zostawiamy też WAV albo usuwamy (dla uproszczenia zostawimy na razie mp3 dla biblioteki)
        except Exception as e:
            print(f"Error converting to mp3, keeping wav: {e}", flush=True)
            final_name = wav_name

        library_data = []
        if LIBRARY_FILE.exists():
            with open(LIBRARY_FILE, 'r', encoding='utf-8') as f:
                library_data = json.load(f)

        new_entry = {
            'id': str(int(time.time())),
            'name': f"{track_name} ({remix_label})",
            'filename': final_name,
            'url': f"/exports/{final_name}",
            'date': time.strftime("%Y-%m-%d %H:%M")
        }
        library_data.insert(0, new_entry)

        with open(LIBRARY_FILE, 'w', encoding='utf-8') as f:
            json.dump(library_data, f, indent=2)

        return jsonify({'success': True, 'track': new_entry})
    except Exception as e:
        print(f"Error saving blob: {e}", flush=True)
        return jsonify({'error': str(e)}), 500

@app.route('/api/library', methods=['GET'])
def get_library():
    return jsonify(load_library())

@app.route('/api/library', methods=['POST'])
def add_to_library():
    data = request.json or {}
    data['name'] = sanitize_display_name(data.get('name'), 'Untitled RMX')
    lib = load_library()
    lib.append(data)
    save_library(lib)
    return jsonify({'success': True})

@app.route('/api/library/<track_id>', methods=['DELETE'])
def delete_from_library(track_id):
    lib = load_library()
    track_to_delete = next((t for t in lib if t['id'] == track_id), None)
    if track_to_delete:
        try:
            file_path = os.path.join(app.config['EXPORTS_FOLDER'], os.path.basename(track_to_delete['url']))
            if os.path.exists(file_path):
                os.remove(file_path)
            mp3_url = track_to_delete.get('mp3_url')
            if mp3_url:
                mp3_path = os.path.join(app.config['EXPORTS_FOLDER'], os.path.basename(mp3_url))
                if os.path.exists(mp3_path):
                    os.remove(mp3_path)
        except Exception as e:
            print("Error deleting file:", e)
        lib = [t for t in lib if t['id'] != track_id]
        save_library(lib)
    return jsonify({'success': True})


@app.route('/api/library/rename', methods=['POST'])
def rename_library_track():
    data = request.json or {}
    track_id = data.get('id')
    new_name = sanitize_display_name(data.get('new_name'), '')
    if not track_id or not new_name:
        return jsonify({'error': 'Missing id or new_name'}), 400

    lib = load_library()
    updated = False
    for item in lib:
        if item.get('id') == track_id:
            item['name'] = new_name
            updated = True
            break
    if not updated:
        return jsonify({'error': 'Track not found'}), 404
    save_library(lib)
    return jsonify({'success': True})

@app.route('/exports/<filename>')
def serve_exports(filename):
    return send_from_directory(app.config['EXPORTS_FOLDER'], filename)

@app.route('/api/remove/<track_name>', methods=['DELETE'])
def remove_track(track_name):
    try:
        # Clear generated stems only. Keep original uploads on disk so users can
        # re-load previously uploaded tracks after removing them from workspace.
        stems_dir = os.path.join(app.config['STEMS_FOLDER'], 'htdemucs', track_name)
        if os.path.exists(stems_dir):
            shutil.rmtree(stems_dir)
            
        return jsonify({'success': True})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=False, port=APP_PORT, use_reloader=False)
