import {Animation} from "./animation";
import {Player} from "./player";

export class ElementAnimatePolyfill {
  animate(element: HTMLElement, keyframes: {[key: string]: string}[], options: number): Player {
    return new Animation(keyframes, options).create(element);
  }
}

//if (!Element.prototype['animate']) {
if (true) {
  var polyfill = new ElementAnimatePolyfill();

  Element.prototype['animate'] = function(keyframes, options) {
    var element = this;
    var player = polyfill.animate(element, keyframes, options);
    player.play();
    return player;
  }
}
