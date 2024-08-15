/// <reference types="jest" />

import { getRandomColor } from "../utils/getRandomColor";

describe('getRandomColor', () => {
  test('should generate a valid hex color', () => {
    const color = getRandomColor();
    expect(color).toMatch(/^#[0-9A-F]{6}$/i);
  });

  test('should not generate white color', () => {
    for (let i = 0; i < 100; i++) {
      const color = getRandomColor();
      expect(color).not.toBe('#FFFFFF');
    }
  });

  test('should not generate too light color', () => {
    for (let i = 0; i < 100; i++) {
      const color = getRandomColor();
      const colorValue = parseInt(color.slice(1), 16);
      expect(colorValue).toBeLessThan(0xCCCCCC);
    }
  });
});
