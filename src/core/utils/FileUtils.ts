import fs from 'fs';

class FileUtils {
  public static createFile(
    outputAudioPath: string,
    data: string | Buffer
  ): void {
    fs.writeFileSync(outputAudioPath, data);
  }
}

export { FileUtils };
