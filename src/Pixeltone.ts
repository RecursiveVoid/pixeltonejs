import { DEFAULT_DURATION, DEFAULT_RGB_FREQUENCY_RANGES, DEFAULT_SAMPLE_RATE } from "./config/defaults";
import { PixeltoneOptions } from "./core/options/PixeltoneOptions";
import { ImageLoader } from "./core/loader/ImageLoader";
import { ImageUtils } from "./core/utils/ImageUtils";
import { PixelToFrequencyMapper } from "./core/mappers/PixelToFrequencyMapper";
import { RGBToAudioSampleGenerator } from "./core/generators/RGBToAudioSampleGenerator";
import { WaveFileFactory } from "./core/factories/WavFileFactory";
import { FileUtils } from "./core/utils/FileUtils";


/**
 * Pixeltone class provides functionality to generate audio files from image data.
 */
class Pixeltone {

  private _imageLoader: ImageLoader;
  private _pixelToFrequencyMapper: PixelToFrequencyMapper;
  private _rgbToAudioSampleGenerator: RGBToAudioSampleGenerator;
  private _wavFileFactory: WaveFileFactory;

  constructor() {
    this._imageLoader = new ImageLoader();
    this._pixelToFrequencyMapper = new PixelToFrequencyMapper();
    this._rgbToAudioSampleGenerator = new RGBToAudioSampleGenerator();
    this._wavFileFactory = new WaveFileFactory();
  }

   /**
   * Converts an image into an audio file by mapping pixel data (RGB) to audio frequencies.
   * 
   * @param {PixeltoneOptions} options - Configuration options for generating audio.
   * @param {string} options.inputImagePath - Path to the input image file.
   * @param {string} options.outputAudioPath - Path where the output audio file will be saved.
   * @param {number} [options.sampleRate=DEFAULT_SAMPLE_RATE] - The audio sample rate in Hz.
   * @param {number} [options.duration=DEFAULT_DURATION] - Duration of the each pixel sample in seconds.
   * @param {number[][]} [options.rgbFrequencyRange=DEFAULT_RGB_FREQUENCY_RANGES] - Frequency range for RGB channels.
   * 
   * @returns {Promise<void>} Resolves when the audio file has been successfully created.
   * 
   * @example
   * const pixeltone = new Pixeltone();
   * await pixeltone.createAudioFromImage({
   *   inputImagePath: './input.png',
   *   outputAudioPath: './output.wav',
   *   sampleRate: 44100,
   *   duration: 10,
   *   rgbFrequencyRange: { 
   *     r: { min: 30, max: 500, offset: 60 }, 
   *     g: { min: 500, max: 2000, offset: 250 }, 
   *     b: { min: 2000, max: 10000, offset: 1000 }, 
   *   }
   * });
   */
  public async createAudioFromImage(options: PixeltoneOptions): Promise<void> {
    const {
      inputImagePath,
      outputAudioPath,
      sampleRate = DEFAULT_SAMPLE_RATE,
      duration = DEFAULT_DURATION,
      rgbFrequencyRange =  DEFAULT_RGB_FREQUENCY_RANGES,
    } = options;
    const image = await this._imageLoader.load(inputImagePath);
    const metadata = ImageUtils.getMetadata(inputImagePath);
    const imageData = ImageUtils.extractImageData(image);
    const mappedFreqAmp = this._pixelToFrequencyMapper.serialRGBMapper({
      data: imageData,
      width: image.width,
      height: image.height,
      rgbFrequencyRange,
    });
    const audioSamples = this._rgbToAudioSampleGenerator.generateAsSinWave({
      mappedFreqAmp,
      sampleRate,
      duration,
    })
    const buffer = this._wavFileFactory.createBuffer(audioSamples, sampleRate);
    FileUtils.createFile(outputAudioPath, buffer);
  }

  public destroy(): void {
    this._imageLoader.destroy();
    this._pixelToFrequencyMapper.destroy();
    this._rgbToAudioSampleGenerator.destroy();
    this._wavFileFactory.destroy();
  }
}

export { Pixeltone };