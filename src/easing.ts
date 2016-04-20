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

const EPSILON = 1.0e-7;

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
  var curve = new Bezier(coefficients);
  return curve.solve.bind(curve);
}

// Mostly inspired by
// https://code.google.com/p/chromium/codesearch#chromium/src/ui/gfx/geometry/cubic_bezier.cc
class Bezier {
  ax_: number;
  bx_: number;
  cx_: number;
  ay_: number;
  by_: number;
  cy_: number;
  constructor([p1x, p1y, p2x, p2y]: [number, number, number, number]) {
    this.cx_ = 3.0 * p1x;
    this.bx_ = 3.0 * (p2x - p1x) - this.cx_;
    this.ax_ = 1.0 - this.cx_ - this.bx_;

    this.cy_ = 3.0 * p1y;
    this.by_ = 3.0 * (p2y - p1y) - this.cy_;
    this.ay_ = 1.0 - this.cy_ - this.by_;
  };

  x(t: number): number {
    return ((this.ax_ * t + this.bx_) * t + this.cx_) * t;
  }

  y(t: number): number {
    return ((this.ay_ * t + this.by_) * t + this.cy_) * t;
  }

  xprime(t: number): number {
    return (3.0 * this.ax_ * t + 2.0 * this.bx_) * t + this.cx_;
  }

  yprime(t: number): number {
    return (3.0 * this.ay_ * t + 2.0 * this.by_) * t + this.cy_;
  }

  solveTgivenX(percentage: number): number {
    // add assert(0 <= percentage && percentage <= 1);
    var t = percentage;
    var x, d;
    // First try a few iterations of Newton's method -- normally very fast.
    for (var i = 0; i < 8; i++) {
      x = this.x(t) - percentage;
      if (Math.abs(x) < EPSILON)
        return t;
      d = this.xprime(t);
      if (Math.abs(d) < EPSILON)
        break;
      t = t - x / d;
    }

    // Fallback to bisection.
    var t0 = 0.0;
    var t1 = 1.0;
    var t = percentage;

    while (t0 < t1) {
      x = this.x(t);
      if (Math.abs(x - percentage) < EPSILON) return t;
      if (percentage > x) t0 = t; else t1 = t;
      t = (t1 - t0) * .5 + t0;
    }
    return t;
  }

  solve(percentage: number): number {
    return this.y(this.solveTgivenX(percentage));
  }
}

/**
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
*/

export function computePercentageFromEasing(percentage: number, easing: [number, number, number, number]) {
  return new Bezier(easing).solve(percentage);
}
