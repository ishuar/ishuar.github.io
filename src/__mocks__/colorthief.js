// Mock implementation of ColorThief
export default class ColorThief {
  getColor() {
    // Return a default RGB array
    return [128, 128, 128];
  }

  getPalette() {
    // Return a default color palette
    return [
      [128, 128, 128],
      [100, 100, 100],
      [200, 200, 200]
    ];
  }
}
