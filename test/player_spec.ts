import {Player} from '../src/player';
import {ElementAnimatePolyfill} from '../src/index';
import {MockBrowserClock} from '../src/mock/mock_browser_clock.ts';
import {BrowserStyles} from '../src/browser_styles.ts';

describe('Player', () => {
  var polyfill = new ElementAnimatePolyfill();

  var clock, styles;
  var animate = (element, keyframes, options) => {
    clock = new MockBrowserClock();
    styles = new BrowserStyles();
    var player = polyfill.animate(element, keyframes, options, clock, styles);
    return player;
  };

  var el = (tag) => {
    var element = document.createElement(tag);
    document.body.appendChild(element);
    return element;
  };

  it('should animate a given CSS property', () => {
    var element = el('div');
    var keyframes = [
      { opacity: 0 },
      { opacity: 1 }
    ];
    var options = {
      duration: 1000
    };

    var player: Player = animate(element, keyframes, options);

    player.play();

    clock.fastForward(500);
    player.tick();

    expect(element.style.opacity).toBe('0.5');

    clock.fastForward(1000);
    player.tick();

    expect(element.style.opacity).toBe('1');
  });

  it('should cleanup styles after the animation is complete if no fillMode is provided', () => {
    var element = el('div');
    var keyframes = [
      { width: 100 },
      { width: '200px' }
    ];
    var options = {
      duration: 500
    };

    var player: Player = animate(element, keyframes, options);

    player.play();

    clock.fastForward(0);
    player.tick();

    expect(element.style.width).toBe('100px');

    clock.fastForward(250);
    player.tick();

    expect(element.style.width).toBe('150px');

    clock.fastForward(250);
    player.tick();

    expect(element.style.width).toBe('200px');
    player.tick();

    expect(element.style.width).toBe('');
  });

  it('should retain styles after the animation is complete if a fillMode of "forwards" is provided', () => {
    var element = el('div');
    var keyframes = [
      { width: '333px' },
      { width: '999px' }
    ];
    var options = {
      duration: 500,
      fillMode: 'forwards'
    };

    var player: Player = animate(element, keyframes, options);

    player.play();

    clock.fastForward(0);
    player.tick();

    expect(element.style.width).toBe('333px');

    clock.fastForward(600);
    player.tick();

    expect(element.style.width).toBe('999px');
    player.tick();

    expect(element.style.width).toBe('999px');
  });
});
