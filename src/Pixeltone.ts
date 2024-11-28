import { DEFAULT_DURATION, DEFAULT_RGB_FREQUENCY_RANGES, DEFAULT_SAMPLE_RATE } from "./config/defaults";
import { PixeltoneOptions } from "./core/options/PixeltoneOptions";
import { ImageLoader } from "./core/loader/ImageLoader";
import { ImageUtils } from "./core/utils/ImageUtils";
import { PixelToFrequencyMapper } from "./core/mappers/PixelToFrequencyMapper";
import { RGBToAudioSampleGenerator } from "./core/generators/RGBToAudioSampleGenerator";
import { WaveFileFactory } from "./core/factories/WavFileFactory";
import { FileUtils } from "./core/utils/FileUtils";


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