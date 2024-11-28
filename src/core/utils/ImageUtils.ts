import { createCanvas, Image } from 'canvas';

import fs from 'fs';
import path from 'path';

import { ImageMetadata } from "../types/ImageMetadata";

class ImageUtils {
  public static getMetadata(inputImagePath: string): ImageMetadata {
    const fileStat = fs.statSync(inputImagePath);
    const fileSize = fileStat.size;
    return {
      name: path.basename(inputImagePath),
      sizeKB: Math.round(fileSize / 1024),
    };
  }

  public static extractImageData(image: Image): Uint8ClampedArray {
    if(!image) {
      return new Uint8ClampedArray(0);
    }
    const width = image.width;
    const height = image.height;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, width, height);
    return imageData.data;
  }
}

export { ImageUtils };