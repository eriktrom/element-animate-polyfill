import {StyleCalculator} from '../style_calculator';
import {toInt} from '../util';

export class NumericalStyleCalculator implements StyleCalculator {
  private _startValue: number;
  private _endValue: number;
  private _rangeDiff: number;

  constructor() {}

  setKeyframeRange(startValue: number|string, endValue: number|string): void {
    this._startValue = toInt(startValue);
    this._endValue = toInt(endValue);
    this._rangeDiff = this._endValue - this._startValue;
  }

  calculate(percentage: number): string {
    return (this._rangeDiff * percentage + this._startValue).toString();
  }
}
