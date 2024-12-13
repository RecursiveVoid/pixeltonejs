# PixeltoneJS — The Auditory Creation Tool
![](https://i.imgur.com/VGH7kT4.png)



[![Discord](https://img.shields.io/discord/1311687163410255882?label=Discord&logo=discord)](https://discord.gg/t9DtvhHnRy) ![npm](https://img.shields.io/npm/v/pixeltone.js) ![Financial Contributors](https://img.shields.io/badge/financial%20contributors-0-yellow)

**PixeltoneJS** is a JavaScript library that converts images into sound based on their RGB data. By interpreting the colors of the image, the library generates corresponding frequencies to create an audio representation of the image.

**Please note that this library is actively evolving. Continuous improvements are imminent. Please check the logs down below**;

## Features
- Convert any image to audio
- Control the frequency ranges for red, green, and blue channels
- Output audio in WAV format
- Highly customizable options for fine-tuning the audio output

## Installation

To install **PixeltoneJS** as an npm package, run:
```bash
npm install pixeltone.js
```

## Usage

After installing, you can import and use **PixeltoneJS** in your project:


### Example ESModule usage
```typescript
import { Pixeltone } from 'pixeltone.js';
const pixeltone = new Pixeltone();
pixeltone.createAudioFromImage({ inputImagePath: 'input.png', outputAudioPath: 'output.wav' });
```

### Example CommonJS usage
```typescript
const { Pixeltone } = require('pixeltone.js');
const pixeltone = new Pixeltone();
pixeltone.createAudioFromImage({ inputImagePath: 'input.png', outputAudioPath: 'output.wav' });
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
## Versioning Structure
[Major].[Minor].[Patch]-[Version Suffix]
Version Suffix can be following: 
* Release candidate (RC) example: 1.1.0-RC0, 1.1.0-RC1 and so on.
* Main/Dev versioning example: 1.1.0-main.[hash] / 1.1.0-dev.[hash]

## Tagging
* Latest: Supported up to date releases.
* Prerelease: Release candidates.
* Main: Main branch.
* Dev: Dev branch.

## Change Logs
Only major/minor, bug fixes and breaking changes are listed. 

### 1.0.0: 
* Major codebase improvement. 
* Transitioned to an object-oriented approach for better scalability and extensibility.
* For future planned: Allows users to maintain state and extend functionality through the Pixeltone class.

####  Migration Guide from pre v0.1.1 to v1.0:
* Replace processSound function imports with Pixeltone class imports.
* Instantiate a new Pixeltone object using new Pixeltone().
* Replace processSound calls with pixeltone.createAudioFromImage().

##### Previous API 
```javascript
import { processSound } from 'pixeltone.js';
processSound({ inputImagePath: 'input.png', outputAudioPath: 'output.wav' });
```

##### New API 
```javascript
import { Pixeltone } from 'pixeltone.js';
const pixeltone = new Pixeltone();
pixeltone.createAudioFromImage({ inputImagePath: 'input.png', outputAudioPath: 'output.wav' });

```

## Example Result
Example result of the image down below.

 ![](https://i.imgur.com/dnNk5y4.jpeg)  
 [**Link to Soundcloud**](https://soundcloud.com/turk-m-ergin)
 



## License

Copyright (c) 2024 Mehmet Ergin Turk

Licensed under the MIT license. See the [LICENSE](LICENSE) file for details.

(Twitter/x:  [**@papa_alpha_papa**](https://x.com/papa_alpha_papa)),

(Mastodon:  [**@papa_alpha_papa**](https://mastodon.social/@papa_alpha_papa))

(Bluesky:  [**@erginturk.bsky.social**](https://bsky.app/profile/erginturk.bsky.social)) 

---


🌟 Love PixeltoneJS? Contribute, leave feedback, or star our [**GitHub repo**](https://github.com/RecursiveVoid/pixeltonejs) to show your support! 🎶🎨

📣  [**Join the conversation in our Discord channel and connect with the community!**](https://discord.gg/t9DtvhHnRy) 🎶🎨
 
