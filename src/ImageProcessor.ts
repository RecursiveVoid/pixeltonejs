import { createCanvas, Image, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';
import wavefile from 'wavefile';
const { WaveFile } = wavefile;

export interface Options {
  inputImagePath: string;
  outputAudioPath: string;
  sampleRate?: number; // Number of samples per second
  duration?: number; // Duration for audio per pixel
  rgbFrequencyRanges?: RGBFrequencyRanges;
}

interface ImageMetadata {
  name: string;
  sizeKB: number;
}

interface ImageDataOptions {
  width: number;
  height: number;
  image: Image;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface FrequencyOptions {
  min: number;
  max: number;
  offset: number;
}

export interface RGBFrequencyRanges {
  r: FrequencyOptions,
  g: FrequencyOptions,
  b: FrequencyOptions,
}

export async function processSound(options: Options): Promise<void> {
  const {
    inputImagePath,
    outputAudioPath,
    sampleRate = 44100, // Default sample rate
    duration = 0.01, // Default duration per pixel
    rgbFrequencyRanges = {
      r: { min: 30.0, max: 500.0, offset: 60.0 },
      g: { min: 500.0, max: 2000.0, offset: 250.0 },
      b: { min: 2000.0, max: 10000.0, offset: 1000.0 },
    },
  } = options;

  const image = await loadImage(inputImagePath);
  const { width, height } = image;
  const metadata = _getMetadataFromImage(inputImagePath); // leaving for future reference 


  const data = _getPixelDataFromImage({ width, height, image });

  const { frequencies, amplitudes } = _extractAudioSamplesFromImage(
    data,
    width,
    height,
    rgbFrequencyRanges
  );

  const audioSamples = _generateAudioSamples(frequencies, amplitudes, sampleRate, duration);
  const wavBuffer = createWavFile(audioSamples, sampleRate);

  fs.writeFileSync(outputAudioPath, wavBuffer);
}

function _getMetadataFromImage(inputImagePath: string): ImageMetadata {
  const fileStat = fs.statSync(inputImagePath);
  const fileSize = fileStat.size;
  return {
    name: path.basename(inputImagePath),
    sizeKB: Math.round(fileSize / 1024),
  };
}

function _getPixelDataFromImage(options: ImageDataOptions): Uint8ClampedArray {
  const { width, height, image } = options;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, width, height);
  return imageData.data;
}

function _normalizeRGB(rgb: RGB): RGB {
  const { r, g, b } = rgb;
  return {
    r: r / 255,
    g: g / 255,
    b: b / 255,
  };
}

function _mapFrequency(value: number, min: number, max: number, offset: number): number {
  return offset + value * (max - min);
}

function _extractAudioSamplesFromImage(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  rgbFrequencyRanges: RGBFrequencyRanges,
): { frequencies: number[]; amplitudes: number[] } {
  const frequencies: number[] = [];
  const amplitudes: number[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4; // RGBA format
      const rgb = _normalizeRGB({
        r: data[idx],
        g: data[idx + 1],
        b: data[idx + 2],
      });

      const freqR = _mapFrequency(
        rgb.r,
        rgbFrequencyRanges.r.min,
        rgbFrequencyRanges.r.max,
        rgbFrequencyRanges.r.offset
      );
      const freqG = _mapFrequency(
        rgb.g,
        rgbFrequencyRanges.g.min,
        rgbFrequencyRanges.g.max,
        rgbFrequencyRanges.g.offset
      );
      const freqB = _mapFrequency(
        rgb.b,
        rgbFrequencyRanges.b.min,
        rgbFrequencyRanges.b.max,
        rgbFrequencyRanges.b.offset
      );

      frequencies.push(freqR, freqG, freqB);
      amplitudes.push(rgb.r, rgb.g, rgb.b);
    }
  }

  return { frequencies, amplitudes };
}

function _generateAudioSamples(
  frequencies: number[],
  amplitudes: number[],
  sampleRate: number,
  duration: number
): Float32Array {
  const totalSamples = Math.floor(frequencies.length / 3) * Math.floor(sampleRate * duration);
  const audioSamples = new Float32Array(totalSamples);

  let sampleIndex = 0;
  for (let i = 0; i < frequencies.length; i += 3) {
    const [freqR, freqG, freqB] = [frequencies[i], frequencies[i + 1], frequencies[i + 2]];
    const [ampR, ampG, ampB] = [amplitudes[i], amplitudes[i + 1], amplitudes[i + 2]];

    for (let t = 0; t < sampleRate * duration; t++) {
      const time = t / sampleRate;
      const sample =
        (ampR * Math.sin(2 * Math.PI * freqR * time) +
          ampG * Math.sin(2 * Math.PI * freqG * time) +
          ampB * Math.sin(2 * Math.PI * freqB * time)) /
        3;
      audioSamples[sampleIndex++] = sample;
    }
  }

  return audioSamples;
}

function createWavFile(audioSamples: Float32Array, sampleRate: number): Buffer {
  const wav = new WaveFile();
  wav.fromScratch(1, sampleRate, '32f', audioSamples);
  return Buffer.from(wav.toBuffer());
}
