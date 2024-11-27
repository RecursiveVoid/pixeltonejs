![](https://i.imgur.com/VGH7kT4.png)
# PixelToneJS

**PixelToneJS** is a JavaScript library that converts images into sound based on their RGB data. By interpreting the colors of the image, the library generates corresponding frequencies to create an audio representation of the image.

PLEASE NOT THAT THIS LIBRARY IS STILL IN ALPHA VERSION.

## Features
- Convert any image to audio
- Control the frequency ranges for red, green, and blue channels
- Output audio in WAV format
- Highly customizable options for fine-tuning the audio output

## Installation

To install **PixelToneJS** as an npm package, run:
```bash
npm install pixeltone.js
```

## Usage

After installing, you can import and use **PixelToneJS** in your project:


### Example ESModule usage
```typescript
import { processSound } from 'pixeltone.js';
processSound({ inputImagePath: 'input.png', outputAudioPath: 'output.wav' });
```

### Example CommonJS usage
```typescript
const { processSound } = require('pixeltone.js');
processSound({ inputImagePath: 'input.png', outputAudioPath: 'output.wav' });
```

### Options
- `inputImagePath`: Path to the input image (e.g., `./images/my-image.png`).
- `outputAudioPath`: Path to save the output audio file (e.g., `./output/audio.wav`).
- `sampleRate`: Optional, the sample rate for audio. Defaults to `44100`.
- `duration`: Optional, the duration of each pixel's audio. Defaults to `0.01` seconds.
- `rgbFrequencyRanges`: Optional, frequency ranges for the red, green, and blue color channels. See below for default values:

```javascript
{ r: { min: 30, max: 500, offset: 60 }, g: { min: 500, max: 2000, offset: 250 }, b: { min: 2000, max: 10000, offset: 1000 } }
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

If you like [**PixelToneJS**](https://github.com/RecursiveVoid/pixeltonejs), feel free to contribute or leave feedback. You can also star the repository to show your support! 🎶🎨
