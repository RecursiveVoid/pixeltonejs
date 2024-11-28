import { FrequencyMapperOptions } from "../options/FrequencyMapperOptions";
import { RGB } from "../types/RGB";

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
}

export { MathUtils };