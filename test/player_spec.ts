import {Player} from '../src/player';
import {ElementAnimatePolyfill} from '../src/index';
import {MockAnimationClock} from '../src/mock/mock_animation_clock.ts';

describe('Player', () => {
  var polyfill = new ElementAnimatePolyfill();

  var animate = (element, keyframes, options) => {
    var player = polyfill.animate(element, keyframes, options);
    player.clock = new MockAnimationClock();
    return player;
  };

  var el = (tag) => {
    var element = document.createElement(tag);
    document.body.appendChild(element);
    return element;
  };

  it('should be true', () => {
    var element = el('div');
    var keyframes = [
      { opacity: 0 },
      { opacity: 1 }
    ];
    var options = {
      duration: 1000
    };

    var player: Player = animate(element, keyframes, options);
    var clock = <MockAnimationClock>player.clock;

    player.play();

    clock.fastForward(500);
    player.tick();

    expect(element.style.opacity).toBe('0.5');

    clock.fastForward(1000);
    player.tick();

    expect(element.style.opacity).toBe('1');
  });
});
