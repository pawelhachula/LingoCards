export class BPMEstimator {
  static estimate(buffer) {
    const data = buffer.getChannelData(0);
    const ratio = Math.floor(buffer.sampleRate / 4410);
    const downsampled = new Float32Array(Math.floor(data.length / ratio));
    for (let i = 0; i < downsampled.length; i++) downsampled[i] = data[i * ratio];
    const energy = new Float32Array(downsampled.length);
    let sum = 0;
    for (let i = 0; i < downsampled.length; i++) {
      sum += Math.abs(downsampled[i]);
      if (i >= 256) sum -= Math.abs(downsampled[i - 256]);
      energy[i] = sum;
    }
    const peaks = [];
    const threshold = 0.5 * Math.max(...energy);
    for (let i = 1; i < energy.length - 1; i++) {
      if (energy[i] > threshold && energy[i] > energy[i-1] && energy[i] > energy[i+1]) peaks.push(i);
    }
    if (peaks.length < 2) return 120;
    const intervals = [];
    for (let i = 1; i < peaks.length; i++) intervals.push(peaks[i] - peaks[i-1]);
    intervals.sort((a, b) => a - b);
    const median = intervals[Math.floor(intervals.length / 2)];
    let bpm = 60 / (median / (buffer.sampleRate / ratio));
    while (bpm < 60) bpm *= 2; while (bpm > 180) bpm /= 2;
    return Math.round(bpm);
  }
}
