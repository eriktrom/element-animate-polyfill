import {Animation} from "./animation";
import {Player} from "./player";

export class ElementAnimatePolyfill {
  animate(element: HTMLElement, keyframes: {[key: string]: string}[], options: number): Player {
    return new Animation(keyframes, options).start(element);
  }
}

if (!Element.prototype['animate']) {
  var polyfill = new ElementAnimatePolyfill();

  Element.prototype['animate'] = (keyframes, options) => polyfill.animate(this, keyframes, options);
}
