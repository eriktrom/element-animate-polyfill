export function isNumber(value) {
  return typeof value == 'number';
}

export function toInt(value: string|number): number {
  return <number>(parseInt(value.toString(), 10));
}

export function toFloat(value: string|number): number {
  return <number>(parseFloat(value.toString()));
}

export function isPresent(value) {
  return value != null;
}

export function roundDecimal(value: number, totalDigits: number = 2) {
  var base = 1;
  for (var i = 0; i < totalDigits; i++) base *= 10;
  return Math.round(value * base) / base;
}
