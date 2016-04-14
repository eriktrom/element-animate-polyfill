import {iit, xit, they, tthey, ddescribe} from './helpers';
import {
  EASE,
  EASE_IN,
  EASE_OUT,
  EASE_IN_OUT,
  makeCubicBezierEquation
} from '../src/easing';

describe('Player', () => {
  iit('should compute a linear cubic bezier curve', () => {
    var curve = makeCubicBezierEquation([0, 0, 1, 1]);
    var coordinates = curve(0.5);
    expect(coordinates.x).toBe(0.5);
    expect(coordinates.y).toBe(0.5);
  });

  iit('should support an ease-in equation', () => {
    var curve = makeCubicBezierEquation(EASE);
    var coordinates = curve(0.5);
    expect(coordinates.x).toBe(0.3125);
    expect(coordinates.y).toBe(0.5375);
  });
});
