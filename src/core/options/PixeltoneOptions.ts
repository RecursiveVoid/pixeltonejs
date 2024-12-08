import { RGBFrequencyRange } from '../types/RGBFrequencyRange';

interface PixeltoneOptions {
  inputImagePath: string;
  outputAudioPath: string;
  sampleRate?: number;
  duration?: number;
  rgbFrequencyRange?: RGBFrequencyRange;
}

export { PixeltoneOptions };
