/// <reference types="jest" />

import { getRandomValue } from "../utils/getRandomValue";

describe('getRandomValue', () => {
  test('should generate a value within the specified range', () => {
    const min = 10;
    const max = 100;
    for (let i = 0; i < 100; i++) {
      const value = getRandomValue(min, max);
      expect(value).toBeGreaterThanOrEqual(min); 
      expect(value).toBeLessThanOrEqual(max);   
    }
  });
});
