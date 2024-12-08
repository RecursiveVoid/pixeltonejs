import { FrequencyMapperOptions } from '../options/FrequencyMapperOptions';
import { SerialRGBMapperOptions } from '../options/SerialRGBMapperOptions';
import { MappedFreqAmp } from '../types/MappedFreqAmp';
import { MathUtils } from '../utils/MathUtils';

class PixelToFrequencyMapper {
  constructor() {}

  public serialRGBMapper(options: SerialRGBMapperOptions): MappedFreqAmp {
    const { data, width, height, rgbFrequencyRange } = options;
    const frequencies: number[] = [];
    const amplitudes: number[] = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4; // RGBA format
        const rgb = MathUtils.normalizeRGB({
          r: data[idx],
          g: data[idx + 1],
          b: data[idx + 2],
        });
        this._mapFrequencies([
          {
            value: rgb.r,
            frequencyRange: rgbFrequencyRange.r,
          },
          {
            value: rgb.g,
            frequencyRange: rgbFrequencyRange.g,
          },
          {
            value: rgb.b,
            frequencyRange: rgbFrequencyRange.b,
          },
        ]).forEach((value) => {
          frequencies.push(value);
        });
        amplitudes.push(rgb.r, rgb.g, rgb.b);
      }
    }
    return { frequencies, amplitudes };
  }

  private _mapFrequencies(options: FrequencyMapperOptions[]): number[] {
    // Assuming we have 3 (RGB) as in order
    return options.map((option) => {
      const { value, frequencyRange } = option;
      return MathUtils.mapFrequency({
        value,
        frequencyRange,
      });
    });
  }

  public destroy(): void {
    // TODO
  }
}

export { PixelToFrequencyMapper };
