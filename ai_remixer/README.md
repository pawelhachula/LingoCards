# AI Remix Studio

A powerful local web application for AI-based music remixing. Upload a single track, and the app uses Demucs to separate it into vocals, drums, bass, and other instruments. You can then adjust tempo, pitch, volume, apply effects in real-time, use presets, and export your final remix!

## Requirements

Before starting, you **MUST** have **FFmpeg** installed on your system, as it is required by `pydub` and `demucs` to process audio files.
- **Windows**: Download from [gyan.dev](https://www.gyan.dev/ffmpeg/builds/) (get the `ffmpeg-release-essentials.zip`), extract it, and add the `bin` folder to your system's `PATH`.

## Installation

1. Open your terminal/command prompt.
2. Navigate to this directory (`ai_remixer`).
3. (Optional but recommended) Create a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
4. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
   *Note: Demucs relies on PyTorch. Depending on your system (GPU vs CPU), you may want to install a specific accelerated version of PyTorch from [pytorch.org](https://pytorch.org/). By default, the CPU version is used, which can take several minutes to process a song.*

## Running the App

1. Start the Flask server:
   ```bash
   python app.py
   ```
2. Open your web browser and go to: `http://127.0.0.1:5000`

## Usage Guide

1. **Upload**: Click "Upload & Analyze" and select an MP3 or WAV file. The analysis (Demucs source separation) may take a few minutes depending on your computer's processing power.
2. **Remix Controls**:
   - Use the **Stem Mixer** sliders to balance Vocals, Drums, Bass, and Other Instruments.
   - Use the **Master Effects** sliders to change Pitch (without affecting speed), Tempo (without affecting pitch), Reverb, Delay, and Bass Boost.
3. **Real-time Preview**: Click "Play Preview" to hear your changes apply instantly right in the browser using the Web Audio API.
4. **Presets**: Click the preset buttons (LOFI, CLUB, VOCAL BOOST, etc.) to instantly load curated settings.
5. **Export**: Click **Export Final Remix** to render your remix on the backend and download it as an MP3!
