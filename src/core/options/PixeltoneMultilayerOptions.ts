import { RGBFrequencyRange } from '../types/RGBFrequencyRange';

interface PixeltoneMultiLayerOptions {
  layers: {
    inputImagePath: string;
    rgbFrequencyRange?: RGBFrequencyRange;
  }[];
  outputAudioPath: string;
  sampleRate?: number;
  duration?: number;
  defaultRGBFrequencyRange: RGBFrequencyRange;
}

export { PixeltoneMultiLayerOptions };
