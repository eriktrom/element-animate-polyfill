import {AnimationClock} from './clock';
import {roundDecimal, toInt, toFloat, isNumber, isPresent} from './util';

var $0 = 48;
var $9 = 57;
var $PERIOD = 46;
var PX = 'px';
var START = 0;
var END = 1;

enum CssValueType {
  Pixel,
  Numeric,
  Color
}

function isNumericProperty(property: string): boolean {
  switch (property) {
    case 'opacity':
    case 'z-index':
      return true;
    default:
      return false;
  }
}

function isDimensionalProperty(property: string): boolean {
  switch (property) {
    case 'width':
    case 'height':
    case 'min-width':
    case 'min-height':
    case 'max-width':
    case 'max-height':
    case 'left':
    case 'top':
    case 'bottom':
    case 'right':
    case 'font-size':
    case 'outline-width':
    case 'outline-offset':
    case 'padding-top':
    case 'padding-left':
    case 'padding-bottom':
    case 'padding-right':
    case 'margin-top':
    case 'margin-left':
    case 'margin-bottom':
    case 'margin-right':
    case 'border-radius':
    case 'border-width':
    case 'border-top-width':
    case 'border-left-width':
    case 'border-right-width':
    case 'border-bottom-width':
    case 'text-indent':
      return true;

    default:
      return false;
  }
}

function findDimensionalSuffix(value) {
  for (var i = 0; i < value.length; i++) {
    var c = value.charCodeAt(i);
    if ((c >= $0 && c <= $9) || c == $PERIOD) continue;
    return value.substring(i, value.length);
  }
}

function computePxValue(testElement: HTMLElement, prop: string, value: string, measurement: string): number {
  var isEM = measurement == 'em';
  if (isEM) {
    testElement.style[prop] = value;
  }

  var pxValue = toFloat(window.getComputedStyle(testElement)[prop]);
  if (isEM) {
    testElement.style[prop] = null;
  } else{
    pxValue = pxValue * toFloat(value);
  }

  return pxValue;
}

class NormalizedKeyframeStyle {
  constructor(public property: string, public value: number|string, public type: CssValueType) {}
}

function normalizeStyles(element:HTMLElement, styles: {[key: string]: string}): NormalizedKeyframeStyle[] {
  var newStyles = [];
  for (var prop in styles) {
    var type;
    var value: any = styles[prop];
    if (isDimensionalProperty(prop)) {
      if (isNumber(value)) {
        measurement = PX;
        value += measurement;
      } else {
        var measurement = findDimensionalSuffix(value);
        if (!isPresent(measurement)) {
          throw new Error('Please set a suffix for ' + prop + ':' + value);
        }

        if (measurement == PX) {
          value = toFloat(value);
        } else {
          value = computePxValue(element, prop, value, measurement);
        }
      }
      type = CssValueType.Pixel;
    } else if(isNumericProperty(prop)) {
      type = CssValueType.Numeric;
    } else {
      throw new Error('only dimensional styles are supported for now...');
    }
    newStyles.push(new NormalizedKeyframeStyle(prop, value, type));
  }
  return newStyles;
}

export class PlayerOptions {
  public duration: number;
  public delay: number;
  public easing: string;

  constructor ({duration, delay, easing}: {
    duration: number|string,
    delay?: number|string,
    easing?: string
  }) {
    this.duration = toInt(duration);
    this.delay = isPresent(delay) ? toInt(delay) : 0;
    this.easing = isPresent(easing) ? easing : 'linear';
  }
}

export class Player {
  private _currentTime: number = 0;
  private _startingTimestamp: number = 0;
  private _properties: any[] = [];
  private _keyframes: {[key: string]: string|number}[];

  onfinish: Function = () => {};
  playing: boolean;

  public clock = new AnimationClock();

  constructor(private _element: HTMLElement,
              keyframes: {[key: string]: string}[],
              private _options: PlayerOptions) {

    var formattedKeyframes = keyframes.map(keyframe => normalizeStyles(_element, keyframe));

    var firstKeyframe = formattedKeyframes[0];
    firstKeyframe.forEach((entry) => {
      this._properties.push([entry.property, entry.type]);
    });

    this._keyframes = formattedKeyframes.map(entry => {
      var styles: {[key: string]: string|number} = {};
      entry.forEach(data => {
        styles[data.property] = data.value;
      });
      return styles;
    });
  }

  get totalTime() {
    return this._options.duration;
  }

  get currentTime() {
    return this._currentTime;
  }

  play() {
    if (this.playing) return;
    this.playing = true;
    this._startingTimestamp = this.clock.now();
    this.tick();
  }

  _onfinish() {
    this.onfinish();
  }

  _calculate(startVal, diff): number {
    return this._currentTime / this.totalTime * diff + startVal;
  }

  _computeProperties(currentTime: number): string[] {
    var start = this._keyframes[0];
    var end = this._keyframes[1];
    var results = [];
    var totalTime = this.totalTime;

    this._properties.forEach(entry => {
      var prop = entry[0];
      var startVal = start[prop];
      var endVal = end[prop];
      var type = <CssValueType>entry[1];
      var value;
      var unit;

      if (currentTime >= totalTime) {
        value = endVal;
      } else {
        var diff = <number>endVal - <number>startVal;
        value = this._calculate(startVal, diff);
        switch (type) {
          case CssValueType.Numeric:
            value = roundDecimal(value, 2);
            break;
          case CssValueType.Pixel:
            value = Math.floor(value) + PX;
            break;
          default:
            throw new Error('Only numeric style values are supported now');
        }
      }

      results.push([prop, value]);
    });

    return results;
  }

  tick() {
    this._currentTime = this.clock.currentTime - this._startingTimestamp;
    this._computeProperties(this._currentTime).forEach(entry => this._apply(entry[0], entry[1]));

    if (this._currentTime == this.totalTime) {
      this._onfinish();
    } else {
      this.clock.raf(() => this.tick());
    }
  }

  _apply(prop: string, value: string) {
    this._element.style[prop] = value;
  }
}
