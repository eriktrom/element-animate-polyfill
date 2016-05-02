import {Player} from '../src/player';
import {ElementAnimatePolyfill} from '../src/index';
import {MockBrowserClock} from '../src/mock/mock_browser_clock.ts';
import {BrowserStyles} from '../src/browser_styles.ts';
import {DIMENSIONAL_PROPERTIES} from '../src/dimensional_properties';
import {iit, xit, they, tthey, ddescribe} from './helpers';
import {TRANSFORM_PROPERTIES, NO_UNIT, PX_UNIT, DEGREES_UNIT} from '../src/transform_properties';
import {COLOR_PROPERTIES} from '../src/color_properties';
import {isPresent} from '../src/util';

function assertColor(element, prop, value) {
  var COLOR_REGEX = /rgba?\(\s*([^\),]+)\s*,\s*([^\),]+)\s*,\s*([^\),]+)\s*(?:,\s*([^\)]+)\s*)?\)*/;
  value = value.toLowerCase();

  var actualValue = window.getComputedStyle(element)[prop];
  if (/^rgb(a)?/.test(value)) {
    var isExpectingAlpha = RegExp.$1 == 'a';
    var match = actualValue.match(COLOR_REGEX);
    if (isExpectingAlpha) {
      var targetValues = value.match(COLOR_REGEX);
      var a1 = parseFloat(targetValues[4]);
      var a2 = isPresent(match[4]) ? parseFloat(match[4]) : null;
      var alpha = a2;
      if (!isPresent(alpha)) {
        alpha = 1;
      } else if (Math.abs(1 - (a1/a2)) <= .1) {
        alpha = a1;
      }
      actualValue = 'rgba(' + match[1] + ', ' + match[2] + ', ' + match[3] + ', ' + alpha.toString() + ')';
    } else {
      actualValue = 'rgb(' + match[1] + ', ' + match[2] + ', ' + match[3] + ')';
    }
  }
  expect(actualValue).toEqual(value);
}

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

  describe('dimensional style properties', () => {
    they('should animate $prop', DIMENSIONAL_PROPERTIES, (prop) => {
      var unit = 'px';
      var element = el('div');
      var keyframes = [{}, {}];
      keyframes[0][prop] = '0' + unit;
      keyframes[1][prop] = '100' + unit;

      var options = {
        duration: 1000
      };

      var player: Player = animate(element, keyframes, options);

      player.play();

      clock.fastForward(500);
      player.tick();

      expect(element.style[prop]).toBe('50' + unit);

      clock.fastForward(1000);
      player.tick();

      expect(element.style[prop]).toBe('100' + unit);
    });
  });

  describe('numeric style properties', () => {

    it('should animate opacity', () => {
      var element = el('div');
      var keyframes = [
        {opacity: 0 },
        {opacity: 1}
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


    it('should animate z-index', () => {
      var element = el('div');
      var keyframes = [{
        'z-index': 0
      }, {
        'z-index': 100
      }];

      var options = {
        duration: 1000
      };

      var player: Player = animate(element, keyframes, options);

      player.play();

      clock.fastForward(500);
      player.tick();

      expect(element.style['z-index']).toBe('50');

      clock.fastForward(1000);
      player.tick();

      expect(element.style['z-index']).toBe('100');
    });
  });

  describe('color properties', function() {
    they('should animate hex color values', COLOR_PROPERTIES, (prop) => {
      var element = el('div');
      var keyframes = [
        { [prop]: '#FF0000' },
        { [prop]: '#00FF00' }
      ];

      var player: Player = animate(element, keyframes, 1000);

      player.play();

      clock.fastForward(500);
      player.tick();

      expect(element.style[prop]).toBe('rgb(128, 128, 0)');

      clock.fastForward(1000);
      player.tick();

      expect(element.style[prop]).toBe('rgb(0, 255, 0)');
    });

    they('should animate rgb color values for $prop', COLOR_PROPERTIES, (prop) => {
      var element = el('div');
      var keyframes = [
        { [prop]: 'rgb(255, 0, 0)' },
        { [prop]: 'rgb(0, 255, 0)' }
      ];

      var player: Player = animate(element, keyframes, 1000);

      player.play();

      clock.fastForward(500);
      player.tick();

      assertColor(element, prop, 'rgb(128, 128, 0)');

      clock.fastForward(1000);
      player.tick();

      assertColor(element, prop, 'rgb(0, 255, 0)');
    });

    they('should animate rgba color values', COLOR_PROPERTIES, (prop) => {
      var element = el('div');
      var keyframes = [
        { [prop]: 'rgba(255, 0, 0, 0)' },
        { [prop]: 'rgba(0, 255, 0, 1)' }
      ];

      var player: Player = animate(element, keyframes, 1000);

      player.play();

      clock.fastForward(500);
      player.tick();

      assertColor(element, prop, 'rgba(0, 255, 0, 0.5)');

      clock.fastForward(1000);
      player.tick();

      assertColor(element, prop, 'rgba(0, 255, 0, 1)');
    });

    they('should animate hsl color values', COLOR_PROPERTIES, (prop) => {
      var element = el('div');
      var keyframes = [
        { [prop]: 'hsl(0, 100%, 50%)' },
        { [prop]: 'hsl(120, 100%, 50%)' }
      ];

      var player: Player = animate(element, keyframes, 1000);

      player.play();

      clock.fastForward(500);
      player.tick();

      assertColor(element, prop, 'rgb(128, 128, 0)');

      clock.fastForward(1000);
      player.tick();

      assertColor(element, prop, 'rgb(0, 255, 0)');
    });

    they('should animate hsla color values', COLOR_PROPERTIES, (prop) => {
      var element = el('div');
      var keyframes = [
        { [prop]: 'hsla(0, 100%, 50%, 0)' },
        { [prop]: 'hsla(120, 100%, 50%, 1)' }
      ];

      var player: Player = animate(element, keyframes, 1000);

      player.play();

      assertColor(element, prop, 'rgba(0, 0, 0, 0)');

      clock.fastForward(500);
      player.tick();

      assertColor(element, prop, 'rgba(0, 255, 0, 0.5)');

      clock.fastForward(1000);
      player.tick();

      assertColor(element, prop, 'rgba(0, 255, 0, 1)');
    });
  });

  describe('duration', function() {

    it('should allow setting a duration value as the option argument', () => {
      var element = el('div');
      var keyframes = [
        { opacity: 0 },
        { opacity: 1 }
      ];

      var player: Player = animate(element, keyframes, 1000);

      player.play();

      clock.fastForward(500);
      player.tick();

      expect(element.style.opacity).toBe('0.5');

      clock.fastForward(1000);
      player.tick();

      expect(element.style.opacity).toBe('1');
    });

    it('should finish an animation when duration is 0', () => {
      var element = el('div');

      var player: Player = animate(element, [
        { color: 'red' },
        { color: 'blue' }
      ], {
          duration: 0,
          fill: 'forwards'
        });

      player.onfinish = jasmine.createSpy('onfinish');

      player.play();
      expect(player.onfinish).not.toHaveBeenCalled(); // the player should wait at least one tick
      player.tick();

      expect(player.playState).toBe('finished');
      expect(player.onfinish).toHaveBeenCalledTimes(1);
      assertColor(element, 'color', 'rgb(0, 0, 255)');
    });

  });

  describe('fill mode', () => {
    it('should use "none" by default and cleanup styles after the animation is complete', () => {
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

    it('should cleanup styles after the animation is complete if fill "none" is passed', () => {
      var element = el('div');
      var keyframes = [
        { width: 100 },
        { width: '200px' }
      ];
      var options = {
        duration: 500,
        fill: 'none'
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

    it('should retain styles after the animation is complete if a fill of "forwards" is provided', () => {
      var element = el('div');
      var keyframes = [
        { width: '333px' },
        { width: '999px' }
      ];
      var options = {
        duration: 500,
        fill: 'forwards'
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

    describe('transform properties', () => {
      var propertiesToTest = [
        'translate',
        'translate3d',
        'translateX',
        'translateY',
        'translateZ',
        'scale',
        'scale3d',
        'scaleX',
        'scaleY',
        'scaleZ',
        'rotate',
        'rotateX',
        'rotateY',
        'rotateZ',
        'rotate3d',
        'skew',
        'skewX',
        'skewY'
      ];

      var defaultValuesTemplate = {
        from: {},
        to: {}
      };

      defaultValuesTemplate['from'][NO_UNIT] = '1';
      defaultValuesTemplate['to'][NO_UNIT] = '10';

      defaultValuesTemplate['from'][PX_UNIT] = '50px';
      defaultValuesTemplate['to'][PX_UNIT] = '100px';

      defaultValuesTemplate['from'][DEGREES_UNIT] = '20deg';
      defaultValuesTemplate['to'][DEGREES_UNIT] = '300deg';

      they('should animate the $prop property accordingly', propertiesToTest, (prop) => {
        var defaultData = TRANSFORM_PROPERTIES[prop];
        var fromValues = defaultData.units.map(unit => {
          return defaultValuesTemplate['from'][unit];
        });

        var toValues = defaultData.units.map(unit => {
          return defaultValuesTemplate['to'][unit];
        });

        var from = prop + '(' + fromValues.join(', ') + ')';
        var to = prop + '(' + toValues.join(', ') + ')';

        var element = el('div');
        var keyframes = [
          { transform: from}, { transform: to}
        ];

        var options = {
          duration: 500,
          fill: 'forwards'
        };

        var player: Player = animate(element, keyframes, options);
        player.play();

        clock.fastForward(0);
        player.tick();

        expect(element.style.transform).toBe(from);

        clock.fastForward(500);
        player.tick();

        expect(element.style.transform).toBe(to);
      });

      it('should animate two properties', () => {
        var element = el('div');
        var keyframes = [
          { transform: 'scale(1) rotate(0deg)' },
          { transform: 'scale(2) rotate(360deg)' }
        ];

        var options = {
          duration: 500,
          fill: 'forwards'
        };

        var player: Player = animate(element, keyframes, options);
        player.play();

        clock.fastForward(0);
        player.tick();

        expect(element.style.transform).toBe('scale(1, 1) rotate(0deg)');

        clock.fastForward(500);
        player.tick();

        expect(element.style.transform).toBe('scale(2, 1) rotate(360deg)');
      });

      it('should animate two properties and invoke the default value for a property that is not provided', () => {
        var element = el('div');
        var keyframes = [
          { transform: 'scale(4)' },
          { transform: 'scale(8) rotate(360deg)' }
        ];

        var options = {
          duration: 500,
          fill: 'forwards'
        };

        var player: Player = animate(element, keyframes, options);
        player.play();

        clock.fastForward(0);
        player.tick();

        expect(element.style.transform).toBe('scale(4, 1) rotate(0deg)');

        clock.fastForward(500);
        player.tick();

        expect(element.style.transform).toBe('scale(8, 1) rotate(360deg)');
      });
    });
  });

  describe('timeline controls', () => {
    describe('pause and play', () => {

      it('should freeze the currentTime and set playState to paused', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);

        player.play();

        clock.fastForward(500);
        player.tick();

        player.pause();

        expect(player.currentTime).toBe(500);
        expect(player.playState).toBe('paused');
      });

      it('should keep the style values for the paused currentTime', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);

        player.play();

        clock.fastForward(500);
        player.tick();

        player.pause();
        assertColor(element, 'color', 'rgb(128, 0, 128)');
      });

      it('should resume the animation when play() is called', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);

        player.play();

        clock.fastForward(500);
        player.tick();

        player.pause();
        assertColor(element, 'color', 'rgb(128, 0, 128)');

        player.play();
        clock.fastForward(250);
        player.tick();
        assertColor(element, 'color', 'rgb(64, 0, 191)');
      });

    });

    describe('finish()', () => {

      it('should set the currentTime to the endTime and playState to finished (after a tick)', () => {
        var element = el('div');

        var player: Player = animate(element, [
          {color: 'red'},
          {color: 'blue'}
        ], 1000);

        player.play();

        player.finish();
        expect(player.currentTime).toBe(1000);

        player.tick();
        expect(player.playState).toBe('finished');
      });

      it('should call onfinish()', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);

        player.onfinish = jasmine.createSpy('onfinish');

        player.play();

        player.finish();
        player.tick();

        expect(player.onfinish).toHaveBeenCalledTimes(1);
      });

      it('should set the element styles for default fillMode', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);


        player.play();

        clock.fastForward(500);
        player.tick();

        expect(element.style.color).toBe('rgb(128, 0, 128)');

        player.finish();
        player.tick();

        expect(element.style.color).toBe('');
        assertColor(element, 'color', 'rgb(0, 0, 0)');
      });

      it('should set the element styles for fillMode "forwards"', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], {
          duration: 1000,
          fill: 'forwards'
        });


        player.play();

        clock.fastForward(500);
        player.tick();

        expect(element.style.color).toBe('rgb(128, 0, 128)');

        player.finish();
        player.tick();

        assertColor(element, 'color', 'rgb(0, 0, 255)');
      });

      describe('when paused', () => {

        it('should finish the animation', () => {
          var element = el('div');

          var player: Player = animate(element, [
            { color: 'red' },
            { color: 'blue' }
          ], 1000);

          player.onfinish = jasmine.createSpy('onfinish');

          player.play();

          clock.fastForward(500);
          player.tick();

          player.pause();
          assertColor(element, 'color', 'rgb(128, 0, 128)');

          player.finish();
          clock.flushQueue(); // since the player is not running, we cannot call tick

          expect(player.playState).toBe('finished');
          assertColor(element, 'color', 'rgb(0, 0, 0)');
          expect(player.onfinish).toHaveBeenCalledTimes(1);
        });

        it('should set the element styles for fillMode "forwards"', () => {
          var element = el('div');

          var player: Player = animate(element, [
            { color: 'red' },
            { color: 'blue' }
          ], {
              duration: 1000,
              fill: 'forwards'
            });


          player.play();

          clock.fastForward(500);
          player.tick();

          player.pause();
          assertColor(element, 'color', 'rgb(128, 0, 128)');

          player.finish();
          clock.flushQueue(); // since the player is not running, we cannot call tick

          assertColor(element, 'color', 'rgb(0, 0, 255)');
        });

      });

    });

    describe('cancel()', () => {
      it('should set the currentTime to null and the playState to idle', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);


        player.play();

        clock.fastForward(500);
        player.tick();

        player.cancel();
        player.tick();

        expect(player.currentTime).toBe(null);
        expect(player.playState).toBe('idle');
      });

      it('should call oncancel() after a tick', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);

        player.oncancel = jasmine.createSpy('oncancel');

        player.play();

        clock.fastForward(500);

        player.cancel();
        expect(player.oncancel).not.toHaveBeenCalled();

        player.tick();
        expect(player.oncancel).toHaveBeenCalledTimes(1);
      });

      it('should remove the element styles', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);


        player.play();

        clock.fastForward(500);
        player.tick();

        expect(element.style.color).toBe('rgb(128, 0, 128)');

        player.cancel();
        player.tick();

        expect(element.style.color).toBe('');
      });

      it('should cancel the animation when it is paused', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);

        player.oncancel = jasmine.createSpy('oncancel');

        player.play();

        clock.fastForward(500);
        player.tick();

        player.pause();
        assertColor(element, 'color', 'rgb(128, 0, 128)');

        player.cancel();
        clock.flushQueue(); // since the player is not running, we cannot call tick

        expect(player.playState).toBe('idle');
        assertColor(element, 'color', 'rgb(0, 0, 0)');
        expect(player.oncancel).toHaveBeenCalledTimes(1);
      });

    });

    describe('setting the current Time', () => {

      it('should set the animated properties when the event order is pause() -> setCurrentTime()', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);

        player.play();
        player.tick();

        clock.fastForward(500);
        player.tick();

        player.pause();
        assertColor(element, 'color', 'rgb(128, 0, 128)');

        player.currentTime = 750;
        assertColor(element, 'color', 'rgb(64, 0, 191)');
      });

      it('should set the animated properties when the event order is cancel() -> setCurrentTime()', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);

        player.play();
        player.tick();

        clock.fastForward(500);
        player.tick();

        player.cancel();
        assertColor(element, 'color', 'rgb(128, 0, 128)');
        player.tick() //trigger oncancel

        player.currentTime = 750;
        assertColor(element, 'color', 'rgb(64, 0, 191)');
      });


      it('should play and finish the animation when the animation is finished and setCurrentTime() is called', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);

        player.play();
        player.tick();

        clock.fastForward(1000);
        player.tick();
        player.tick();

        assertColor(element, 'color', 'rgb(0, 0, 0)');
        expect(player.playState).toBe('finished');

        player.currentTime = 750;
        player.tick();
        expect(player.playState).toBe('running');

        assertColor(element, 'color', 'rgb(64, 0, 191)');

        clock.fastForward(1000);
        player.tick();
        player.tick();

        assertColor(element, 'color', 'rgb(0, 0, 0)');
        expect(player.playState).toBe('finished');
      });


      it('should finish the animation when the event order is pause() -> setCurrentTime() -> play()', () => {
        var element = el('div');

        var player: Player = animate(element, [
          { color: 'red' },
          { color: 'blue' }
        ], 1000);

        player.onfinish = jasmine.createSpy('onfinish');

        player.play();
        player.tick();

        clock.fastForward(500);
        player.tick();

        player.pause();
        assertColor(element, 'color', 'rgb(128, 0, 128)');

        player.currentTime = 750;
        assertColor(element, 'color', 'rgb(64, 0, 191)');

        player.play();

        clock.fastForward(250);
        player.tick();
        player.tick(); // TODO: investigate why second tick is needed

        expect(player.playState).toBe('finished');
        assertColor(element, 'color', 'rgb(0, 0, 0)');
        expect(player.onfinish).toHaveBeenCalledTimes(1);
      });
    });

  });
});
