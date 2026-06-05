// AI Remix Studio - Clean Implementation
// Global state
window.trackName = '';
window.trackDisplayName = '';
window.originalTrackUrl = null;
window.pendingStems = null;
window.stemAudios = {};
window.masterVolumeLevel = 1.0; // 100% default
let isPreviewPlaying = false;
let previewCurrentTime = 0;
let previewDuration = 0;
let previewInterval = null;
let currentPresetKey = null;
let pendingPreset = null;

// Error display
window.addEventListener('error', function(e) {
    console.error('ERROR:', e.message, 'at', e.filename, ':', e.lineno);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('PROMISE REJECTION:', e.reason);
});

// Utility: Read API response
async function readApiResponse(response) {
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        return response.json();
    }
    const text = await response.text();
    if (!text) return { error: `HTTP ${response.status}` };
    if (text.trim().startsWith('<')) {
        return { error: 'Server error - check Flask terminal' };
    }
    return { error: text.length > 500 ? text.slice(0, 500) + '...' : text };
}

// Utility: Translation (i18n)
let currentLocale = {};
let currentLang = 'en';

async function loadLocale(lang) {
    try {
        const res = await fetch(`/static/locales/${lang}.json`);
        if (res.ok) {
            currentLocale = await res.json();
            currentLang = lang;
            applyI18n();
        }
    } catch(e) { console.warn('Failed to load locale:', lang, e); }
}

function t(key, defaultText) {
    return currentLocale[key] || defaultText || key;
}

function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (currentLocale[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = currentLocale[key];
            } else {
                el.textContent = currentLocale[key];
            }
        }
    });
    document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
        const key = el.getAttribute('data-i18n-tooltip');
        if (currentLocale[key]) el.title = currentLocale[key];
    });
}

// Init language from selector or browser
(function initLang() {
    const sel = document.getElementById('lang-select');
    const saved = localStorage.getItem('ai_remix_lang');
    const browserLang = navigator.language?.slice(0, 2) || 'en';
    const lang = saved || (['pl', 'es', 'de'].includes(browserLang) ? browserLang : 'en');
    if (sel) sel.value = lang;
    loadLocale(lang);
    if (sel) {
        sel.addEventListener('change', (e) => {
            localStorage.setItem('ai_remix_lang', e.target.value);
            loadLocale(e.target.value);
        });
    }
})();

// Utility: Format time
function formatAudioTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// Utility: DB to volume (HTML5 Audio requires 0-1 range)
function dbToVolume(db) {
    if (db <= -60) {
        console.log(`dbToVolume(${db}) = 0 (muted)`);
        return 0;
    }
    const result = Math.min(1, Math.pow(10, db / 20));
    console.log(`dbToVolume(${db}) = ${result}`);
    return result;
}

// Show notification
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    if (type === 'error') alert(message);
}

// Presets
const presets = {
    lofi: { vocals: 0, drums: -8, bass: 6, other: -4, pitch: -2, tempo: 0.92, reverb: 0.4, delay: 0.3, bassboost: 4 },
    club: { vocals: 2, drums: 4, bass: 6, other: -2, pitch: 0, tempo: 1.08, reverb: 0.5, delay: 0.2, bassboost: 8 },
    vocal_boost: { vocals: 6, drums: -12, bass: -12, other: -12, pitch: 0, tempo: 1, reverb: 0.3, delay: 0, bassboost: 2 },
    vocal: { vocals: 6, drums: -12, bass: -12, other: -12, pitch: 0, tempo: 1, reverb: 0.3, delay: 0, bassboost: 2 },
    instrumental: { vocals: -60, drums: 2, bass: 2, other: 2, pitch: 0, tempo: 1, reverb: 0.2, delay: 0.1, bassboost: 3 },
    bass_boost: { vocals: -8, drums: 0, bass: 8, other: -4, pitch: 0, tempo: 1, reverb: 0.2, delay: 0.1, bassboost: 10 },
    nightcore: { vocals: 2, drums: 2, bass: 2, other: 2, pitch: 4, tempo: 1.25, reverb: 0.2, delay: 0, bassboost: 2 },
    slowed_reverb: { vocals: 0, drums: -2, bass: 2, other: 0, pitch: -2, tempo: 0.85, reverb: 0.6, delay: 0.4, bassboost: 2 },
    karaoke: { vocals: -60, drums: 2, bass: 2, other: 4, pitch: 0, tempo: 1, reverb: 0.2, delay: 0.1, bassboost: 2 },
    chill: { vocals: 0, drums: -6, bass: 2, other: -2, pitch: 0, tempo: 0.95, reverb: 0.4, delay: 0.2, bassboost: 2 },
    trance: { vocals: -4, drums: 4, bass: 4, other: 2, pitch: 0, tempo: 1.15, reverb: 0.5, delay: 0.3, bassboost: 4 },
    rock: { vocals: 2, drums: 4, bass: 4, other: 0, pitch: 0, tempo: 1.05, reverb: 0.3, delay: 0.1, bassboost: 6 },
    metal: { vocals: 4, drums: 6, bass: 6, other: 2, pitch: -2, tempo: 1.1, reverb: 0.2, delay: 0.1, bassboost: 8 },
    reset: { vocals: 0, drums: 0, bass: 0, other: 0, pitch: 0, tempo: 1, reverb: 0, delay: 0, bassboost: 0 }
};

// Update mix progress UI
function updateMixProgressUI() {
    const mixProgress = document.getElementById('mix-progress');
    const mixCurrent = document.getElementById('mix-time-current');
    const mixTotal = document.getElementById('mix-time-total');
    if (!mixProgress || !mixCurrent) return;
    
    const html5Audio = window.stemAudios.vocals || Object.values(window.stemAudios)[0];
    if (html5Audio && html5Audio.currentTime !== undefined) {
        previewCurrentTime = html5Audio.currentTime;
    }
    
    const pct = previewDuration ? (previewCurrentTime / previewDuration) * 100 : 0;
    mixProgress.value = pct;
    mixCurrent.innerText = formatAudioTime(previewCurrentTime);
    if (mixTotal && previewDuration) {
        mixTotal.innerText = formatAudioTime(previewDuration);
    }
}

// Play a single URL through the mixer transport (progress bar, play/stop buttons)
function playUrlInMixer(url, name) {
    stopPreview();
    // Clear previous stems
    Object.values(window.stemAudios).forEach(a => { if (a) { a.pause(); a.src = ''; } });
    window.stemAudios = {};
    
    const audio = new Audio(url);
    audio.volume = window.masterVolumeLevel || 1.0;
    window.stemAudios._remix = audio;
    
    const titleEl = document.getElementById('workspace-track-name');
    if (titleEl && name) titleEl.textContent = name;
    
    const playBtn = document.getElementById('play-btn');
    const mixTotal = document.getElementById('mix-time-total');
    
    audio.addEventListener('loadedmetadata', () => {
        previewDuration = audio.duration;
        if (mixTotal) mixTotal.innerText = formatAudioTime(previewDuration);
    }, { once: true });
    
    audio.play().catch(e => console.error('Play error:', e));
    isPreviewPlaying = true;
    if (playBtn) playBtn.innerText = t('pause_mix', 'Pause Preview');
    previewInterval = setInterval(updateMixProgressUI, 200);
    
    // Show workspace if hidden
    const ws = document.getElementById('workspace');
    const wp = document.getElementById('welcome-placeholder');
    if (ws) ws.classList.remove('hidden');
    if (wp) wp.classList.add('hidden');
}

// Play global audio
function playGlobalAudio(url, name, type) {
    const globalAudio = document.getElementById('global-audio');
    const gPlayBtn = document.getElementById('player-play-btn');
    if (!globalAudio) return;
    
    globalAudio.src = url;
    globalAudio.play().catch(e => console.error('Play error:', e));
    
    document.getElementById('player-track-name').innerText = name || t('no_track', 'No track');
    document.getElementById('player-track-type').innerText = type || t('none', 'None');
    if (gPlayBtn) gPlayBtn.innerText = "⏸";
}

// Stop preview
function stopPreview() {
    Object.values(window.stemAudios).forEach(a => {
        a.pause();
        a.currentTime = 0;
    });
    isPreviewPlaying = false;
    previewCurrentTime = 0;
    
    const playBtn = document.getElementById('play-btn');
    const mixProgress = document.getElementById('mix-progress');
    const mixCurrent = document.getElementById('mix-current');
    
    if (playBtn) playBtn.innerText = t('play_mix', 'Play Preview');
    if (mixProgress) mixProgress.value = 0;
    if (mixCurrent) mixCurrent.innerText = "0:00";
    clearInterval(previewInterval);
}

// Apply preset
function applyPreset(presetKey) {
    console.log('applyPreset called:', presetKey);
    const p = presets[presetKey];
    console.log('Preset values:', p);
    if (!p) {
        console.error('Preset not found:', presetKey);
        return;
    }
    currentPresetKey = presetKey;
    
    const volVocals = document.getElementById('vol-vocals');
    const volDrums = document.getElementById('vol-drums');
    const volBass = document.getElementById('vol-bass');
    const volOther = document.getElementById('vol-other');
    
    console.log('Sliders found:', {
        volVocals: !!volVocals,
        volDrums: !!volDrums,
        volBass: !!volBass,
        volOther: !!volOther
    });
    
    // Always update UI sliders
    if (volVocals) volVocals.value = p.vocals;
    if (volDrums) volDrums.value = p.drums;
    if (volBass) volBass.value = p.bass;
    if (volOther) volOther.value = p.other;
    
    // Update audio effects sliders
    const fxPitch = document.getElementById('fx-pitch');
    const fxTempo = document.getElementById('fx-tempo');
    const fxReverb = document.getElementById('fx-reverb');
    const fxDelay = document.getElementById('fx-delay');
    const fxBassBoost = document.getElementById('fx-bassboost');
    
    if (fxPitch && p.pitch !== undefined) fxPitch.value = p.pitch;
    if (fxTempo && p.tempo !== undefined) fxTempo.value = p.tempo;
    if (fxReverb && p.reverb !== undefined) fxReverb.value = p.reverb;
    if (fxDelay && p.delay !== undefined) fxDelay.value = p.delay;
    if (fxBassBoost && p.bassboost !== undefined) fxBassBoost.value = p.bassboost;
    
    console.log('Updated FX sliders:', { pitch: p.pitch, tempo: p.tempo, reverb: p.reverb, delay: p.delay, bassboost: p.bassboost });
    
    // Apply tempo realtime if audio is playing
    if (p.tempo !== undefined) applyTempoRealtime(p.tempo);
    
    console.log('window.stemAudios:', Object.keys(window.stemAudios));
    
    // If audio not initialized yet, save preset for later
    if (Object.keys(window.stemAudios).length === 0) {
        console.log('Audio not initialized, saving preset for later');
        pendingPreset = p;
        showNotification(`Applied ${presetKey} preset (will take effect on play)`, 'success');
        return;
    }
    
    // Apply to active audio
    console.log('Applying preset to audio, stemAudios count:', Object.keys(window.stemAudios).length);
    const masterLevel = window.masterVolumeLevel || 1.0;
    ['vocals', 'drums', 'bass', 'other'].forEach(stem => {
        if (window.stemAudios[stem]) {
            const dbValue = p[stem];
            const stemVol = dbToVolume(dbValue);
            const finalVol = stemVol * masterLevel;
            console.log(`Setting ${stem} volume: ${dbValue}dB -> ${stemVol} * ${masterLevel} = ${finalVol}`);
            window.stemAudios[stem].volume = finalVol;
        } else {
            console.log(`No audio for stem: ${stem}`);
        }
    });
    
    showNotification(`Applied ${presetKey} preset`, 'success');
}

// Handle volume change
function handleVolumeChange(stem, value) {
    const volume = parseFloat(value);
    console.log(`Volume change: ${stem} = ${volume}dB`);
    if (window.stemAudios[stem]) {
        const stemVol = dbToVolume(volume);
        const finalVol = stemVol * (window.masterVolumeLevel || 1.0);
        window.stemAudios[stem].volume = finalVol;
        console.log(`  -> Set ${stem} volume: ${stemVol} * ${window.masterVolumeLevel} = ${finalVol}`);
    } else {
        console.log(`  -> No audio element for ${stem}`);
    }
}

// Toggle preview
function togglePreview() {
    console.log('togglePreview called, isPreviewPlaying:', isPreviewPlaying);
    console.log('window.pendingStems:', window.pendingStems);
    console.log('window.stemAudios:', Object.keys(window.stemAudios));
    
    const playBtn = document.getElementById('play-btn');
    const mixTotal = document.getElementById('mix-time-total');
    const mixCurrent = document.getElementById('mix-time-current');
    const globalAudio = document.getElementById('global-audio');
    const gPlayBtn = document.getElementById('player-play-btn');
    
    if (globalAudio && !globalAudio.paused) {
        globalAudio.pause();
        if (gPlayBtn) gPlayBtn.innerText = "▶";
    }
    
    if (!isPreviewPlaying) {
        // Start preview
        console.log('Starting preview...');
        
        if (Object.keys(window.stemAudios).length === 0 && window.pendingStems) {
            console.log('Initializing stem audios from window.pendingStems...');
            const masterLevel = window.masterVolumeLevel || 1.0;
            ['vocals', 'drums', 'bass', 'other'].forEach(stem => {
                console.log(`Processing stem: ${stem}, URL:`, window.pendingStems[stem]);
                if (!window.pendingStems[stem]) {
                    console.log(`Skipping ${stem} - no URL`);
                    return;
                }
                const audio = new Audio(window.pendingStems[stem]);
                const slider = document.getElementById(`vol-${stem}`);
                const sliderValue = slider ? parseFloat(slider.value) : 0;
                const stemVol = dbToVolume(sliderValue);
                const finalVol = stemVol * masterLevel;
                audio.volume = finalVol;
                window.stemAudios[stem] = audio;
                console.log(`Created audio for ${stem}, slider=${sliderValue}dB, stemVol=${stemVol}, master=${masterLevel}, final=${finalVol}`);
            });
            
            // Apply pending preset if exists
            if (pendingPreset) {
                console.log('Applying pending preset:', pendingPreset);
                ['vocals', 'drums', 'bass', 'other'].forEach(stem => {
                    if (window.stemAudios[stem] && pendingPreset[stem] !== undefined) {
                        const stemVol = dbToVolume(pendingPreset[stem]);
                        const finalVol = stemVol * masterLevel;
                        window.stemAudios[stem].volume = finalVol;
                        console.log(`Applied pending preset ${stem}: ${stemVol} * ${masterLevel} = ${finalVol}`);
                    }
                });
                pendingPreset = null;
            }
            
            const firstAudio = Object.values(window.stemAudios)[0];
            console.log('First audio:', firstAudio);
            if (firstAudio) {
                const setDuration = () => {
                    previewDuration = firstAudio.duration;
                    console.log('Audio duration loaded:', previewDuration);
                    if (mixTotal) mixTotal.innerText = formatAudioTime(previewDuration);
                };
                if (firstAudio.readyState >= 1) {
                    setDuration();
                } else {
                    firstAudio.addEventListener('loadedmetadata', setDuration, { once: true });
                }
            }
        }
        
        const startTime = previewCurrentTime || 0;
        console.log('Starting playback from time:', startTime);
        console.log('Number of stem audios:', Object.values(window.stemAudios).length);
        
        Object.values(window.stemAudios).forEach((a, idx) => {
            console.log(`Playing stem ${idx}:`, a.src);
            a.currentTime = startTime;
            a.play().catch(e => console.error('Play error for stem:', idx, e));
        });
        
        isPreviewPlaying = true;
        if (playBtn) playBtn.innerText = t('pause_mix', 'Pause Preview');
        previewInterval = setInterval(updateMixProgressUI, 200);
        console.log('Preview started');
        
    } else {
        // Pause preview
        console.log('Pausing preview...');
        const a = window.stemAudios.vocals || Object.values(window.stemAudios)[0];
        previewCurrentTime = a ? a.currentTime : 0;
        Object.values(window.stemAudios).forEach(a => a.pause());
        isPreviewPlaying = false;
        if (playBtn) playBtn.innerText = t('play_mix', 'Play Preview');
        clearInterval(previewInterval);
        console.log('Preview paused');
    }
}

// Helper to hide export result on changes
function hideExportResult() {
    const exResult = document.getElementById('export-result');
    if (exResult && !exResult.classList.contains('hidden')) {
        exResult.classList.add('hidden');
    }
}

// Reset mixer state fully (for loading new tracks)
function resetMixerState() {
    stopPreview();
    Object.values(window.stemAudios).forEach(a => { if (a) { a.pause(); a.src = ''; } });
    window.stemAudios = {};
    window.pendingStems = null;
    isPreviewPlaying = false;
    previewCurrentTime = 0;
    previewDuration = 0;
    pendingPreset = null;
    clearInterval(previewInterval);
    // Hide export result from previous remix
    hideExportResult();
    // Reset sliders
    ['vol-vocals','vol-drums','vol-bass','vol-other'].forEach(id => {
        const s = document.getElementById(id); if (s) s.value = 0;
    });
    ['fx-pitch','fx-vocal-pitch'].forEach(id => {
        const s = document.getElementById(id); if (s) s.value = 0;
    });
    const fxTempo = document.getElementById('fx-tempo'); if (fxTempo) fxTempo.value = 1;
    ['fx-reverb','fx-delay','fx-vocal-chorus','fx-vocal-dist'].forEach(id => {
        const s = document.getElementById(id); if (s) s.value = 0;
    });
    const fxBass = document.getElementById('fx-bassboost'); if (fxBass) fxBass.value = 0;
}

// Clear mixer completely (used by Remove button)
function clearMixer() {
    resetMixerState();
    window.trackName = '';
    window.trackDisplayName = '';
    window.originalTrackUrl = null;
    const ws = document.getElementById('workspace');
    const wp = document.getElementById('welcome-placeholder');
    if (ws) ws.classList.add('hidden');
    if (wp) wp.classList.remove('hidden');
    const bpmDisplay = document.getElementById('bpm-display');
    if (bpmDisplay) bpmDisplay.innerText = '-';
    const keyDisplay = document.getElementById('key-display');
    if (keyDisplay) keyDisplay.innerText = '-';
    const titleEl = document.getElementById('workspace-track-name');
    if (titleEl) titleEl.textContent = '';
}

// Handle upload
async function handleUpload() {
    console.log('Upload handler called');
    const fileInput = document.getElementById('audio-upload');
    const uploadBtn = document.getElementById('upload-btn');
    const loadingEl = document.getElementById('loading');
    
    if (!fileInput || !fileInput.files[0]) {
        alert(t('please_select_file', 'Please select a file'));
        return;
    }
    
    const file = fileInput.files[0];
    console.log('File selected:', file.name);
    
    // Reset previous state before new upload
    resetMixerState();
    
    window.originalTrackUrl = URL.createObjectURL(file);
    
    const formData = new FormData();
    formData.append('file', file);
    
    if (loadingEl) loadingEl.classList.remove('hidden');
    if (uploadBtn) uploadBtn.disabled = true;
    
    try {
        const response = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await readApiResponse(response);
        
        if (!response.ok || data.error) {
            if (data.duplicate) {
                alert(t('track_exists', 'This track already exists'));
                if (loadingEl) loadingEl.classList.add('hidden');
                if (uploadBtn) uploadBtn.disabled = false;
                return;
            }
            throw new Error(data.error || `HTTP ${response.status}`);
        }
        
        window.trackName = data.track_name;
        window.trackDisplayName = data.track_name;
        
        document.getElementById('bpm-display').innerText = data.bpm || '-';
        document.getElementById('key-display').innerText = data.key === 'Unknown' ? t('unknown', 'Unknown') : (data.key || '-');
        
        const titleEl = document.getElementById('workspace-track-name');
        if (titleEl) titleEl.textContent = window.trackDisplayName;
        
        window.pendingStems = data.stems;
        
        const workspaceEl = document.getElementById('workspace');
        const welcomeEl = document.getElementById('welcome-placeholder');
        
        if (loadingEl) loadingEl.classList.add('hidden');
        if (uploadBtn) uploadBtn.disabled = false;
        if (welcomeEl) welcomeEl.classList.add('hidden');
        if (workspaceEl) workspaceEl.classList.remove('hidden');
        
        // Auto-start playback in mixer
        setTimeout(() => togglePreview(), 500);
        
        loadUploadsList();
        
    } catch (e) {
        console.error('Upload error:', e);
        alert('Upload failed: ' + e.message);
        if (loadingEl) loadingEl.classList.add('hidden');
        if (uploadBtn) uploadBtn.disabled = false;
    }
}

// Show rename modal and return a promise with the chosen name
function askRemixName(defaultName) {
    return new Promise((resolve) => {
        const modal = document.getElementById('rename-modal');
        const input = document.getElementById('rename-modal-input');
        const title = document.getElementById('rename-modal-title');
        const saveBtn = document.getElementById('rename-modal-save');
        const cancelBtn = document.getElementById('rename-modal-cancel');
        if (!modal || !input) { resolve(defaultName); return; }
        
        title.textContent = t('rename_prompt_remix', 'Remix name:');
        input.value = defaultName;
        modal.classList.remove('hidden');
        input.focus();
        input.select();
        
        function cleanup() {
            modal.classList.add('hidden');
            saveBtn.removeEventListener('click', onSave);
            cancelBtn.removeEventListener('click', onCancel);
            input.removeEventListener('keydown', onKey);
        }
        function onSave() { cleanup(); resolve(input.value.trim() || defaultName); }
        function onCancel() { cleanup(); resolve(null); }
        function onKey(e) { if (e.key === 'Enter') onSave(); if (e.key === 'Escape') onCancel(); }
        saveBtn.addEventListener('click', onSave);
        cancelBtn.addEventListener('click', onCancel);
        input.addEventListener('keydown', onKey);
    });
}

// Save remix — rendered on backend using NumPy (safe from clipping)
async function saveRemix() {
    if (!window.trackName) {
        showNotification(t('please_select_file', 'Please load a track first'), 'error');
        return;
    }
    if (!window.pendingStems && Object.keys(window.stemAudios).length === 0) {
        showNotification(t('no_stems', 'No audio stems available'), 'error');
        return;
    }
    
    const presetLabel = currentPresetKey ? currentPresetKey.toUpperCase() : 'RMX';
    const defaultName = (window.trackDisplayName || window.trackName).replace(/_/g, ' ') + ' ' + presetLabel;
    const remixName = await askRemixName(defaultName);
    if (remixName === null) return;
    
    const exportLoading = document.getElementById('export-loading');
    const exportsResult = document.getElementById('export-result');
    const saveBtn = document.getElementById('save-remix-btn');
    
    if (exportLoading) exportLoading.classList.remove('hidden');
    if (exportsResult) exportsResult.classList.add('hidden');
    if (saveBtn) { saveBtn.disabled = true; saveBtn.innerText = '⏳ ' + t('rendering', 'Rendering…'); }
    
    const exportData = {
        track_name: window.trackName,
        volumes: {
            vocals: parseFloat(document.getElementById('vol-vocals')?.value || 0),
            drums: parseFloat(document.getElementById('vol-drums')?.value || 0),
            bass: parseFloat(document.getElementById('vol-bass')?.value || 0),
            other: parseFloat(document.getElementById('vol-other')?.value || 0)
        },
        master_volume: window.masterVolumeLevel || 1.0,
        pitch: parseFloat(document.getElementById('fx-pitch')?.value || 0),
        rate: parseFloat(document.getElementById('fx-tempo')?.value || 1),
        reverb: parseFloat(document.getElementById('fx-reverb')?.value || 0),
        delay: parseFloat(document.getElementById('fx-delay')?.value || 0),
        bassboost: parseFloat(document.getElementById('fx-bassboost')?.value || 0),
        vocal_pitch: parseFloat(document.getElementById('fx-vocal-pitch')?.value || 0),
        vocal_chorus: parseFloat(document.getElementById('fx-vocal-chorus')?.value || 0),
        vocal_dist: parseFloat(document.getElementById('fx-vocal-dist')?.value || 0),
        remix_label: remixName
    };
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 300000);
        
        const response = await fetch('/api/export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exportData),
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText.slice(0, 200)}`);
        }
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        
        if (exportLoading) exportLoading.classList.add('hidden');
        if (exportsResult) exportsResult.classList.remove('hidden');
        
        const downloadLink = document.getElementById('download-link');
        if (downloadLink && data.url) downloadLink.href = data.url;
        
        const playRemixBtn = document.getElementById('play-remix-btn');
        if (playRemixBtn && data.url) {
            playRemixBtn.onclick = () => playUrlInMixer(data.url, remixName);
        }
        
        loadLibrary();
        
        if (saveBtn) { saveBtn.disabled = false; saveBtn.innerText = '💾 ' + t('save_remix', 'Save Remix'); }
        
    } catch (e) {
        console.error('Export error:', e);
        if (exportLoading) exportLoading.classList.add('hidden');
        if (saveBtn) { saveBtn.disabled = false; saveBtn.innerText = '💾 ' + t('save_remix', 'Save Remix'); }
        
        if (e.name === 'AbortError') {
            showNotification(t('export_timeout', 'Export timed out. Try again.'), 'error');
        } else {
            showNotification(t('export_failed', 'Export failed: ') + e.message, 'error');
        }
    }
}

// Load uploads list from server
async function loadUploadsList() {
    console.log('Loading uploads list...');
    try {
        const response = await fetch('/api/uploads');
        if (!response.ok) {
            console.error('Failed to load uploads:', response.status);
            return;
        }
        const uploads = await response.json();
        console.log('Loaded uploads:', uploads);
        
        const uploadsList = document.getElementById('uploads-list');
        
        if (!uploadsList) {
            console.error('uploads-list element not found');
            return;
        }
        
        // Clear current list
        uploadsList.innerHTML = '';
        
        if (uploads.length === 0) {
            uploadsList.innerHTML = '<p class="text-muted" style="text-align:center; font-size: 0.9rem;">No previous uploads.</p>';
            return;
        }
        
        // Add each upload to the list
        uploads.forEach(upload => {
            const displayName = (upload.display_name || upload.track_name).replace(/_/g, ' ');
            const shortName = displayName.length > 35 ? displayName.substring(0, 32) + '...' : displayName;
            
            const item = document.createElement('div');
            item.className = 'upload-item';
            item.dataset.trackName = upload.track_name;
            item.dataset.filename = upload.filename;
            item.innerHTML = `
                <span class="upload-name" style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 8px;" title="${displayName}">${shortName}</span>
                <button class="btn small load-upload-btn" style="padding: 2px 6px; font-size: 0.7rem; margin-right: 4px; background: rgba(0, 212, 255, 0.2); color: #00d4ff; border: 1px solid rgba(0, 212, 255, 0.4); border-radius: 3px; cursor: pointer; font-weight: 500;" data-track="${upload.track_name}" data-file="${upload.filename}">Load</button>
                <button class="btn small danger delete-upload-btn" style="padding: 2px 6px; font-size: 0.7rem; background: rgba(255, 51, 102, 0.2); color: #ff3366; border: 1px solid rgba(255, 51, 102, 0.4); border-radius: 3px; cursor: pointer; font-weight: 500;" data-track="${upload.track_name}" data-file="${upload.filename}">×</button>
            `;
            uploadsList.appendChild(item);
        });
        
        console.log(`Displayed ${uploads.length} uploads`);
        
        // Add event listeners to load buttons
        document.querySelectorAll('.load-upload-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const trackName = e.target.dataset.track;
                const filename = e.target.dataset.file;
                console.log('Loading upload:', trackName, filename);
                await loadExistingTrack(trackName, filename);
            });
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-upload-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const trackName = e.target.dataset.track;
                const filename = e.target.dataset.file;
                if (confirm(t('delete_confirm', 'Delete this upload?'))) {
                    await deleteUpload(trackName, filename);
                }
            });
        });
        
    } catch (e) {
        console.error('Error loading uploads:', e);
    }
}

// Load existing track
async function loadExistingTrack(trackName, filename) {
    console.log('loadExistingTrack:', trackName, filename);
    
    try {
        const response = await fetch(`/api/stems?track=${encodeURIComponent(trackName)}`);
        const data = await readApiResponse(response);
        
        if (data.error) {
            showNotification(data.error, 'error');
            return;
        }
        
        // Set global state
        window.trackName = trackName;
        window.trackDisplayName = trackName;
        window.originalTrackUrl = `/uploads/${filename}`;
        
        const titleEl = document.getElementById('workspace-track-name');
        if (titleEl) titleEl.textContent = window.trackDisplayName;
        
        // Store stems for later initialization
        window.pendingStems = data.stems;
        
        // Show workspace
        const workspace = document.getElementById('workspace');
        const welcomePlaceholder = document.getElementById('welcome-placeholder');
        
        if (welcomePlaceholder) welcomePlaceholder.classList.add('hidden');
        if (workspace) workspace.classList.remove('hidden');
        
        showNotification('Track loaded!', 'success');
        
    } catch (e) {
        console.error('Error loading track:', e);
        showNotification('Failed to load track', 'error');
    }
}

// Clear mixer workspace (does NOT delete from uploads)
function clearMixer() {
    console.log('Clearing mixer workspace...');
    
    // Stop any playing audio
    stopPreview();
    
    // Clear stem audios
    Object.values(window.stemAudios).forEach(audio => {
        if (audio) {
            audio.pause();
            audio.src = '';
        }
    });
    window.stemAudios = {};
    
    // Clear current track data
    window.trackName = '';
    window.trackDisplayName = '';
    window.originalTrackUrl = null;
    window.pendingStems = null;
    
    // Reset preset
    currentPresetKey = 'custom';
    
    // Hide workspace and show welcome
    const workspace = document.getElementById('workspace');
    const welcomePlaceholder = document.getElementById('welcome-placeholder');
    if (workspace) workspace.classList.add('hidden');
    if (welcomePlaceholder) welcomePlaceholder.classList.remove('hidden');
    
    showNotification('Mixer cleared', 'success');
    console.log('Mixer workspace cleared');
}

// Delete upload
async function deleteUpload(trackName, filename) {
    console.log('deleteUpload called with:', trackName, filename);
    
    if (!trackName || !filename) {
        console.error('Missing trackName or filename');
        showNotification('Error: Missing track info', 'error');
        return;
    }
    
    // Stop any playing audio
    stopPreview();
    
    // Stop global audio if playing
    const globalAudio = document.getElementById('global-audio');
    if (globalAudio && !globalAudio.paused) {
        globalAudio.pause();
        globalAudio.src = '';
    }
    
    // Clear current track data
    window.trackName = '';
    window.trackDisplayName = '';
    window.originalTrackUrl = null;
    window.pendingStems = null;
    
    // Hide workspace and show welcome
    const workspace = document.getElementById('workspace');
    const welcomePlaceholder = document.getElementById('welcome-placeholder');
    if (workspace) workspace.classList.add('hidden');
    if (welcomePlaceholder) welcomePlaceholder.classList.remove('hidden');
    
    try {
        console.log('Sending delete request...');
        const response = await fetch('/api/uploads/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ track_name: trackName, filename: filename })
        });
        
        console.log('Delete response status:', response.status);
        
        const data = await response.json();
        console.log('Delete response data:', data);
        
        if (data.success) {
            showNotification('Upload deleted', 'success');
            loadUploadsList(); // Refresh list
        } else {
            showNotification(data.error || 'Failed to delete', 'error');
        }
        
    } catch (e) {
        console.error('Error deleting upload:', e);
        showNotification('Failed to delete upload: ' + e.message, 'error');
    }
}

// Load library (remix exports) into sidebar
async function loadLibrary() {
    try {
        const res = await fetch('/api/library');
        const lib = await res.json();
        const list = document.getElementById('library-list');
        if (!list) return;
        list.innerHTML = '';
        
        if (lib.length === 0) {
            list.innerHTML = `<p class="text-muted" style="text-align:center; font-size: 0.9rem;">${t('no_remixes', 'No remixes saved yet.')}</p>`;
            return;
        }
        
        lib.forEach(track => {
            const name = track.name || 'Untitled';
            const shortName = name.length > 40 ? name.substring(0, 37) + '...' : name;
            const playUrl = track.mp3_url || track.url || '';
            const dlUrl = track.url || track.mp3_url || '#';
            const el = document.createElement('div');
            el.className = 'library-item';
            el.innerHTML = `
                <div class="library-item-info">
                    <strong title="${name}">${shortName}</strong>
                    <small>${track.date || ''}</small>
                </div>
                <div class="library-actions">
                    <button class="btn secondary lib-play-btn" title="${t('play_remix', 'Play')}" data-url="${playUrl}" data-name="${name}">▶</button>
                    <a class="btn secondary" href="${dlUrl}" download title="${t('download', 'Download')}">⬇</a>
                    <button class="btn danger lib-del-btn" data-id="${track.id}" title="${t('delete', 'Delete')}">✕</button>
                </div>
            `;
            list.appendChild(el);
        });
        
        // Play through mixer (controllable with Play/Stop/progress)
        list.querySelectorAll('.lib-play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const url = btn.dataset.url;
                const name = btn.dataset.name;
                if (url) playUrlInMixer(url, name);
            });
        });
        
        // Delete from library
        list.querySelectorAll('.lib-del-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                if (!id) { console.error('No track id for delete'); return; }
                if (confirm(t('delete_confirm', 'Delete this remix?'))) {
                    try {
                        const resp = await fetch(`/api/library/${id}`, { method: 'DELETE' });
                        const result = await resp.json();
                        console.log('Delete result:', result);
                    } catch(err) { console.error('Delete failed:', err); }
                    loadLibrary();
                }
            });
        });
    } catch(e) { console.error('Library load failed:', e); }
}

// Apply tempo realtime via playbackRate on all stem audios
function applyTempoRealtime(rate) {
    Object.values(window.stemAudios).forEach(a => {
        if (a) a.playbackRate = rate;
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    
    // Load previous uploads + library
    loadUploadsList();
    loadLibrary();
    
    const uploadBtn = document.getElementById('upload-btn');
    const playBtn = document.getElementById('play-btn');
    const stopBtn = document.getElementById('stop-btn');
    const saveRemixBtn = document.getElementById('save-remix-btn');
    const mixProgress = document.getElementById('mix-progress');
    const globalAudio = document.getElementById('global-audio');
    const gPlayBtn = document.getElementById('player-play-btn');
    const gProgress = document.getElementById('player-progress');
    const gVolume = document.getElementById('player-volume');
    const gMuteBtn = document.getElementById('player-mute-btn');
    
    // Upload button
    if (uploadBtn) uploadBtn.addEventListener('click', handleUpload);
    
    // Play/Stop buttons
    if (playBtn) playBtn.addEventListener('click', togglePreview);
    if (stopBtn) stopBtn.addEventListener('click', stopPreview);
    
    // Save remix button
    if (saveRemixBtn) saveRemixBtn.addEventListener('click', saveRemix);
    
    // Remove track button
    const removeTrackBtn = document.getElementById('remove-track-btn');
    if (removeTrackBtn) {
        removeTrackBtn.addEventListener('click', () => {
            if (window.trackName && confirm(t('clear_mixer_confirm', 'Clear mixer workspace?'))) {
                clearMixer();
            }
        });
    }
    
    // Volume sliders
    ['vocals', 'drums', 'bass', 'other'].forEach(stem => {
        const slider = document.getElementById(`vol-${stem}`);
        if (slider) {
            slider.addEventListener('input', (e) => {
                handleVolumeChange(stem, e.target.value);
                hideExportResult();
            });
        }
    });
    
    // Master volume slider
    const masterVolume = document.getElementById('master-volume');
    const masterVolumeVal = document.getElementById('master-volume-val');
    if (masterVolume) {
        masterVolume.addEventListener('input', (e) => {
            hideExportResult();
            const val = parseInt(e.target.value);
            if (masterVolumeVal) masterVolumeVal.innerText = val + '%';
            window.masterVolumeLevel = val / 100;
            Object.entries(window.stemAudios).forEach(([stemName, audio]) => {
                if (audio) {
                    const slider = document.getElementById(`vol-${stemName}`);
                    const stemDb = slider ? parseFloat(slider.value) : 0;
                    audio.volume = dbToVolume(stemDb) * window.masterVolumeLevel;
                }
            });
        });
    }
    
    // === AUDIO EFFECTS SLIDERS ===
    // Tempo — realtime via playbackRate
    const fxTempo = document.getElementById('fx-tempo');
    if (fxTempo) {
        fxTempo.addEventListener('input', (e) => {
            hideExportResult();
            const rate = parseFloat(e.target.value);
            applyTempoRealtime(rate);
            const label = fxTempo.previousElementSibling || fxTempo.closest('.slider-group')?.querySelector('label');
            if (label) label.textContent = `${t('tempo_rate', 'Tempo')}: ${rate.toFixed(2)}x`;
        });
    }
    
    // Pitch — show current value (applied on export)
    const fxPitch = document.getElementById('fx-pitch');
    if (fxPitch) {
        fxPitch.addEventListener('input', (e) => {
            hideExportResult();
            const val = parseInt(e.target.value);
            const label = fxPitch.previousElementSibling || fxPitch.closest('.slider-group')?.querySelector('label');
            if (label) label.textContent = `${t('pitch_shift', 'Pitch')}: ${val > 0 ? '+' : ''}${val} st`;
        });
    }
    
    // Reverb — show current value (applied on export)
    const fxReverb = document.getElementById('fx-reverb');
    if (fxReverb) {
        fxReverb.addEventListener('input', (e) => {
            hideExportResult();
            const val = parseFloat(e.target.value);
            const label = fxReverb.previousElementSibling || fxReverb.closest('.slider-group')?.querySelector('label');
            if (label) label.textContent = `${t('reverb', 'Reverb')}: ${Math.round(val * 100)}%`;
        });
    }
    
    // Delay — show current value (applied on export)
    const fxDelay = document.getElementById('fx-delay');
    if (fxDelay) {
        fxDelay.addEventListener('input', (e) => {
            hideExportResult();
            const val = parseFloat(e.target.value);
            const label = fxDelay.previousElementSibling || fxDelay.closest('.slider-group')?.querySelector('label');
            if (label) label.textContent = `${t('delay', 'Delay')}: ${Math.round(val * 100)}%`;
        });
    }
    
    // Bass boost — show current value (applied on export)
    const fxBass = document.getElementById('fx-bassboost');
    if (fxBass) {
        fxBass.addEventListener('input', (e) => {
            hideExportResult();
            const val = parseInt(e.target.value);
            const label = fxBass.previousElementSibling || fxBass.closest('.slider-group')?.querySelector('label');
            if (label) label.textContent = `${t('bass_boost', 'Bass Boost')}: ${val} dB`;
        });
    }
    
    // Vocal FX sliders — show values
    const fxVocalPitch = document.getElementById('fx-vocal-pitch');
    if (fxVocalPitch) {
        fxVocalPitch.addEventListener('input', (e) => {
            hideExportResult();
            const val = parseInt(e.target.value);
            const label = fxVocalPitch.previousElementSibling || fxVocalPitch.closest('.slider-group')?.querySelector('label');
            if (label) label.textContent = `${t('vocal_pitch', 'Vocal Pitch')}: ${val > 0 ? '+' : ''}${val} st`;
        });
    }
    const fxVocalChorus = document.getElementById('fx-vocal-chorus');
    if (fxVocalChorus) {
        fxVocalChorus.addEventListener('input', (e) => {
            hideExportResult();
            const val = parseFloat(e.target.value);
            const label = fxVocalChorus.previousElementSibling || fxVocalChorus.closest('.slider-group')?.querySelector('label');
            if (label) label.textContent = `${t('vocal_chorus', 'Chorus')}: ${Math.round(val * 100)}%`;
        });
    }
    const fxVocalDist = document.getElementById('fx-vocal-dist');
    if (fxVocalDist) {
        fxVocalDist.addEventListener('input', (e) => {
            hideExportResult();
            const val = parseFloat(e.target.value);
            const label = fxVocalDist.previousElementSibling || fxVocalDist.closest('.slider-group')?.querySelector('label');
            if (label) label.textContent = `${t('vocal_dist', 'Distortion')}: ${Math.round(val * 100)}%`;
        });
    }
    
    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            hideExportResult();
            const presetKey = e.target.dataset.preset;
            if (presetKey && presets[presetKey]) applyPreset(presetKey);
        });
    });
    
    // Mix mode buttons
    document.querySelectorAll('.mix-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            hideExportResult();
            const mode = btn.dataset.mode;
            if (mode === 'vocal') applyPreset('vocal');
            else if (mode === 'instrumental') applyPreset('instrumental');
            else if (mode === 'full') applyPreset('club');
        });
    });
    
    // Progress slider
    if (mixProgress) {
        mixProgress.addEventListener('input', (e) => {
            if (!previewDuration) return;
            const pct = parseFloat(e.target.value) / 100;
            const newTime = Math.max(0, previewDuration * pct);
            Object.values(window.stemAudios).forEach(a => { a.currentTime = newTime; });
            previewCurrentTime = newTime;
            updateMixProgressUI();
        });
    }
    
    // Global audio player controls
    if (gPlayBtn && globalAudio) {
        gPlayBtn.addEventListener('click', () => {
            if (globalAudio.paused) { globalAudio.play(); gPlayBtn.innerText = "⏸"; }
            else { globalAudio.pause(); gPlayBtn.innerText = "▶"; }
        });
    }
    if (gProgress && globalAudio) {
        gProgress.addEventListener('input', (e) => {
            if (globalAudio.duration) globalAudio.currentTime = (e.target.value / 100) * globalAudio.duration;
        });
        globalAudio.addEventListener('timeupdate', () => {
            if (globalAudio.duration) gProgress.value = (globalAudio.currentTime / globalAudio.duration) * 100;
        });
    }
    if (gVolume && globalAudio) {
        gVolume.addEventListener('input', (e) => { globalAudio.volume = e.target.value / 100; });
    }
    if (gMuteBtn && globalAudio) {
        gMuteBtn.addEventListener('click', () => {
            globalAudio.muted = !globalAudio.muted;
            gMuteBtn.innerText = globalAudio.muted ? "🔇" : "🔊";
        });
    }
    
    console.log('App initialized successfully');
});

