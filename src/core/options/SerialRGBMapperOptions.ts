import { RGBFrequencyRange } from '../types/RGBFrequencyRange';

interface SerialRGBMapperOptions {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  rgbFrequencyRange: RGBFrequencyRange;
}

export { SerialRGBMapperOptions };
