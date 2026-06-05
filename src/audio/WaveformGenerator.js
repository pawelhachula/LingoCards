export class WaveformGenerator {
  static generate(buffer) {
    const totalPoints = Math.floor(buffer.duration * 100);
    const data = buffer.getChannelData(0);
    const samplesPerPoint = Math.floor(buffer.length / totalPoints);
    const waveform = new Float32Array(totalPoints * 2);
    for (let i = 0; i < totalPoints; i++) {
      let min = 1, max = -1;
      const start = i * samplesPerPoint;
      for (let j = 0; j < samplesPerPoint; j += 10) {
        const val = data[start + j];
        if (val < min) min = val;
        if (val > max) max = val;
      }
      waveform[i * 2] = min; waveform[i * 2 + 1] = max;
    }
    return waveform;
  }
}
