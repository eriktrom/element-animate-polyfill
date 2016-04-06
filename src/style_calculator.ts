export interface StyleCalculator {
  setKeyframeRange(startValue: number|string, endValue: number|string): void;
  calculate(percentage: number): string;
}
