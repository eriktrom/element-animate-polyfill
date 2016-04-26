import {iit, xit, they, tthey, ddescribe} from './helpers';
import {
  LINEAR,
  EASE,
  EASE_IN,
  EASE_OUT,
  EASE_IN_OUT,
  computePercentageFromEasing
} from '../src/easing';

describe('Player', () => {
  it('should compute a linear cubic bezier curve', () => {
    var y0 = computePercentageFromEasing(0, LINEAR);
    expect(y0).toBe(0);

    var y1 = computePercentageFromEasing(0.5, LINEAR);
    expect(y1).toBe(0.5);

    var y2 = computePercentageFromEasing(1, LINEAR);
    expect(y2).toBe(1);
  });
});
