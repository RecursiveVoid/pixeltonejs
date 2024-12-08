import { FrequencyMapperOptions } from '../options/FrequencyMapperOptions';
import { SampleFrequencyOptions } from '../options/SampleFrequencyOptions';
import { RGB } from '../types/RGB';

class MathUtils {
  public static normalizeRGB(rgb: RGB): RGB {
    const { r, g, b } = rgb;
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255,
    };
  }

  public static mapFrequency(options: FrequencyMapperOptions): number {
    const { value, frequencyRange } = options;
    const { offset, min, max } = frequencyRange;
    return offset + value * (max - min);
  }

  // TODO also pass the strategy of creating the frequency
  public static sampleFrequency(options: SampleFrequencyOptions): number {
    const { rgbAmp, rgbFrequency, time } = options;
    return (
      (rgbAmp.r * Math.sin(2 * Math.PI * rgbFrequency.r * time) +
        rgbAmp.g * Math.sin(2 * Math.PI * rgbFrequency.g * time) +
        rgbAmp.b * Math.sin(2 * Math.PI * rgbFrequency.b * time)) /
      3
    );
  }
}

export { MathUtils };
