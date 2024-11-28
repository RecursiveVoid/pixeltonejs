import wavefile from 'wavefile';
const { WaveFile } = wavefile;

class WaveFileFactory {
  private _waveFile: wavefile.WaveFile;

  constructor() {
    this._waveFile = new WaveFile();
  }

  public createBuffer(audioSamples: Float32Array, sampleRate: number): Buffer {
    this._waveFile.fromScratch(1, sampleRate, '32f', audioSamples);
    return Buffer.from(this._getBuffer());
  }

  private _getBuffer(): Uint8Array {
    return this._waveFile.toBuffer();
  }

  public destroy(): void {
  }
}

export { WaveFileFactory };