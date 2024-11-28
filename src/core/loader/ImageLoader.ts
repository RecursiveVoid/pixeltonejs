import { Image, loadImage } from "canvas";

import EventEmitter from "eventemitter3";

class ImageLoader extends EventEmitter {
  constructor() {
    super();
  }

  public async load(inputImagePath: string): Promise<Image> {
    return await loadImage(inputImagePath);
  }

  public destroy(): void {
    super.removeAllListeners();
  }
}

export { ImageLoader };