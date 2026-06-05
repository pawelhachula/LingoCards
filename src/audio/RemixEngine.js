class RemixEngine {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'interactive', sampleRate: 44100 });
    this.tracks = [];
    this.maxTracks = 4;
    this.isPlaying = false;
    this.startTime = 0;
    this.pauseTime = 0;
    this.masterGain = this.ctx.createGain();
    this.limiter = this.ctx.createDynamicsCompressor();
    this.limiter.threshold.setValueAtTime(-0.5, this.ctx.currentTime);
    this.masterGain.connect(this.limiter);
    this.limiter.connect(this.ctx.destination);
    this._initializeTracks();
  }

  _initializeTracks() {
    for (let i = 0; i < this.maxTracks; i++) {
      const track = {
        id: i, name: `Track ${i + 1}`,
        gain: this.ctx.createGain(), panner: this.ctx.createStereoPanner(),
        eq: { low: this.ctx.createBiquadFilter(), mid: this.ctx.createBiquadFilter(), high: this.ctx.createBiquadFilter() },
        clips: [], activeSources: []
      };
      track.eq.low.type = 'lowshelf'; track.eq.low.frequency.value = 320;
      track.eq.mid.type = 'peaking'; track.eq.mid.frequency.value = 1000;
      track.eq.high.type = 'highshelf'; track.eq.high.frequency.value = 3200;
      track.eq.low.connect(track.eq.mid); track.eq.mid.connect(track.eq.high);
      track.eq.high.connect(track.panner); track.panner.connect(track.gain);
      track.gain.connect(this.masterGain);
      this.tracks.push(track);
    }
  }

  async loadAudioFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    return await this.ctx.decodeAudioData(arrayBuffer);
  }

  addClip(trackId, buffer, startTime) {
    const clip = { buffer, startTime, offset: 0, duration: buffer.duration };
    this.tracks[trackId].clips.push(clip);
    if (this.isPlaying) this._scheduleClip(this.tracks[trackId], clip);
    return clip;
  }

  play() {
    if (this.isPlaying) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    this.isPlaying = true;
    this.startTime = this.ctx.currentTime - this.pauseTime;
    this.tracks.forEach(t => t.clips.forEach(c => this._scheduleClip(t, c)));
  }

  _scheduleClip(track, clip) {
    const now = this.ctx.currentTime;
    const start = this.startTime + clip.startTime;
    let offset = 0;
    let startAt = start;
    if (start < now) {
      offset = now - start;
      if (offset >= clip.duration) return;
      startAt = now;
    }
    const source = this.ctx.createBufferSource();
    source.buffer = clip.buffer;
    source.connect(track.eq.low);
    source.start(startAt, offset, clip.duration - offset);
    track.activeSources.push(source);
    source.onended = () => track.activeSources = track.activeSources.filter(s => s !== source);
  }

  pause() {
    this.isPlaying = false;
    this.pauseTime = this.ctx.currentTime - this.startTime;
    this.tracks.forEach(t => {
      t.activeSources.forEach(s => { try { s.stop(); } catch(e) {} });
      t.activeSources = [];
    });
  }

  stop() { this.pause(); this.pauseTime = 0; }

  setTrackVolume(id, v) { this.tracks[id].gain.gain.setTargetAtTime(v, this.ctx.currentTime, 0.02); }
  setTrackEQ(id, band, v) { this.tracks[id].eq[band].gain.setTargetAtTime(v, this.ctx.currentTime, 0.02); }

  async exportToWAV() {
    let max = 0; this.tracks.forEach(t => t.clips.forEach(c => max = Math.max(max, c.startTime + c.duration)));
    const ctx = new OfflineAudioContext(2, Math.ceil(max * 44100), 44100);
    const master = ctx.createGain(); master.connect(ctx.destination);
    this.tracks.forEach(t => {
      const g = ctx.createGain(); g.gain.value = t.gain.gain.value;
      const p = ctx.createStereoPanner(); p.pan.value = t.panner.pan.value;
      const l = ctx.createBiquadFilter(); l.type = 'lowshelf'; l.gain.value = t.eq.low.gain.value;
      l.connect(p); p.connect(g); g.connect(master);
      t.clips.forEach(c => {
        const s = ctx.createBufferSource(); s.buffer = c.buffer; s.connect(l); s.start(c.startTime);
      });
    });
    return this._bufferToWav(await ctx.startRendering());
  }

  _bufferToWav(buffer) {
    const length = buffer.length * buffer.numberOfChannels * 2 + 44;
    const view = new DataView(new ArrayBuffer(length));
    const writeString = (o, s) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
    writeString(0, 'RIFF'); view.setUint32(4, length - 8, true); writeString(8, 'WAVE');
    writeString(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
    view.setUint16(22, buffer.numberOfChannels, true); view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * 4, true); view.setUint16(32, 4, true); view.setUint16(34, 16, true);
    writeString(36, 'data'); view.setUint32(40, length - 44, true);
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let c = 0; c < buffer.numberOfChannels; c++) {
        let s = buffer.getChannelData(c)[i];
        s = Math.max(-1, Math.min(1, s));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true); offset += 2;
      }
    }
    return new Blob([view.buffer], { type: 'audio/wav' });
  }

  getTimelinePosition() { return this.isPlaying ? this.ctx.currentTime - this.startTime : this.pauseTime; }
}
export const engine = new RemixEngine();
