import {Animation} from "./animation";
import {Player} from "./player";
import {BrowserStyles} from "./browser_styles";
import {BrowserClock} from './browser_clock';

export class ElementAnimatePolyfill {
  animate(element: HTMLElement,
          keyframes: {[key: string]: string}[],
          options: number,
          clock: BrowserClock = null,
          styles: BrowserStyles = null): Player {
    return new Animation(keyframes, options, clock, styles).create(element);
  }
}

//if (!Element.prototype['animate']) {
if (true) {
  var polyfill = new ElementAnimatePolyfill();
  var globalClock = new BrowserClock();
  var globalStyles = new BrowserStyles();

  Element.prototype['animate'] = function(keyframes, options) {
    var element = this;
    var player = polyfill.animate(element, keyframes, options, globalClock, globalStyles);
    player.play();
    return player;
  }
}
