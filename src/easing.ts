import {BaseException} from './exceptions';
import {toFloat} from './util';

export class Coordinate {
  constructor(public x: number, public y: number) {}
}

export const LINEAR      : [number, number, number, number] = [0,0,1,1];
export const EASE        : [number, number, number, number] = [.25,.1,.25,1];
export const EASE_IN     : [number, number, number, number] = [0.42, 0, 1, 1];
export const EASE_OUT    : [number, number, number, number] = [0, 0, 0.58, 1];
export const EASE_IN_OUT : [number, number, number, number] = [0.42,0,.58,1];

var EASING_REGEX = /cubic-bezier\(\s*([-\.\d]+)\s*,\s*([-\.\d]+)\s*,\s*([-\.\d]+)\s*,\s*([-\.\d]+)\s*\)/i;
export function resolveEasingEquation(name: string): Function {
  var coefficients: [number, number, number, number];
  switch (name.toLowerCase()) {
    case 'linear':
      coefficients = LINEAR;
      break;
    case 'ease':
      coefficients = EASE;
      break;
    case 'ease-out':
      coefficients = EASE_OUT;
      break;
    case 'ease-in':
      coefficients = EASE_IN;
      break;
    case 'ease-in-out':
      coefficients = EASE_IN_OUT;
      break;
    default:
      var matches = name.match(EASING_REGEX); 
      if (!matches) {
        throw new BaseException('Invalid easing value provided');
      }
      coefficients = [
        toFloat(matches[1]),
        toFloat(matches[2]),
        toFloat(matches[3]),
        toFloat(matches[4])
      ];
      break;
  }
  return makeCubicBezierEquation(coefficients);
}

export function makeCubicBezierEquation(coords: [number, number, number, number]): Function {
  var c1 = new Coordinate(0,0);
  var c2 = new Coordinate(coords[0], coords[1]);
  var c3 = new Coordinate(coords[2], coords[3]);
  var c4 = new Coordinate(1,1);

  return function(p: number): Coordinate {
    var q = 1 - p;
    var b1 = q * q * q;
    var b2 = 3 * (q * q) * p;
    var b3 = 3 * q * (p * p);
    var b4 = p * p * p;

    var x = (c1.x * b1) + (c2.x * b2) + (c3.x * b3) + (c4.x * b4);
    var y = (c1.y * b1) + (c2.y * b2) + (c3.y * b3) + (c4.y * b4);

    return new Coordinate(x,y);
  };
}

export function computePercentageFromEasing(percentage: number, easing: [number, number, number, number]) {
  return makeCubicBezierEquation(easing)(percentage).y;
}
