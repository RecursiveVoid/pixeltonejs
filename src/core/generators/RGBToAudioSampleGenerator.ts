import { GenerateAsSinWaveOptions } from '../options/GenerateAsSinWaveOptions';
import { MathUtils } from '../utils/MathUtils';

class RGBToAudioSampleGenerator {
  constructor() {
    // TODO
  }

  // TODO refactor this function
  public generateAsSinWave(options: GenerateAsSinWaveOptions): Float32Array {
    const { mappedFreqAmp, sampleRate, duration } = options;
    const { amplitudes, frequencies } = mappedFreqAmp;
    const totalSamples =
      Math.floor(frequencies.length / 3) * Math.floor(sampleRate * duration);
    const audioSamples = new Float32Array(totalSamples);
    let sampleIndex = 0;
    for (let i = 0; i < frequencies.length; i += 3) {
      const [freqR, freqG, freqB] = [
        frequencies[i],
        frequencies[i + 1],
        frequencies[i + 2],
      ];
      const [ampR, ampG, ampB] = [
        amplitudes[i],
        amplitudes[i + 1],
        amplitudes[i + 2],
      ];
      for (let t = 0; t < sampleRate * duration; t++) {
        const time = t / sampleRate;
        // TODO add this to MathUtil as createSinWave with options.
        const sample = MathUtils.sampleFrequency({
          time,
          rgbAmp: {
            r: ampR,
            g: ampG,
            b: ampB,
          },
          rgbFrequency: {
            r: freqR,
            g: freqG,
            b: freqB,
          },
        });
        audioSamples[sampleIndex++] = sample;
      }
    }
    return audioSamples;
  }

  public destroy(): void {
    // TODO
  }
}

export { RGBToAudioSampleGenerator };
