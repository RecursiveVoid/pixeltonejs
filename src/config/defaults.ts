const DEFAULT_RGB_FREQUENCY_RANGES = {
  r: { min: 30.0, max: 500.0, offset: 60.0 },
  g: { min: 500.0, max: 2000.0, offset: 250.0 },
  b: { min: 2000.0, max: 10000.0, offset: 1000.0 },
};

const DEFAULT_SAMPLE_RATE = 44100;
const DEFAULT_DURATION = 0.01;

export {
  DEFAULT_RGB_FREQUENCY_RANGES, 
  DEFAULT_SAMPLE_RATE, 
  DEFAULT_DURATION 
};