import {StyleCalculator} from '../style_calculator';
import {toInt, findDimensionalSuffix} from '../util';

var DEFAULT_UNIT = 'px';

export class DimensionalStyleCalculator implements StyleCalculator {
  private _unit: string;
  private _startValue: number;
  private _endValue: number;
  private _rangeDiff: number;

  constructor() {}

  setKeyframeRange(startValue: number|string, endValue: number|string): void {
    var unitA = findDimensionalSuffix(startValue) || DEFAULT_UNIT;
    var unitB = findDimensionalSuffix(endValue) || DEFAULT_UNIT;
    if (unitA != unitB) {
      throw new Error(`Animations containing the same unit can only be animated (the unit for ${startValue} != ${endValue}`);
    }

    this._unit = unitA;
    this._startValue = toInt(startValue);
    this._endValue = toInt(endValue);
    this._rangeDiff = this._endValue - this._startValue;
  }

  calculate(percentage: number): string {
    return this._rangeDiff * percentage + this._startValue + this._unit;
  }
}
