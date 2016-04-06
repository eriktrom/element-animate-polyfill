import {Player} from '../src/player';
import {ElementAnimatePolyfill} from '../src/index';
import {MockBrowserClock} from '../src/mock/mock_browser_clock.ts';
import {BrowserStyles} from '../src/browser_styles.ts';
import {DIMENSIONAL_PROPERTIES} from '../src/dimensional_properties';
import {iit, xit, they, tthey, ddescribe} from './helpers';
import {TRANSFORM_PROPERTIES, NO_UNIT, PX_UNIT, DEGREES_UNIT} from '../src/transform_properties';

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

    it('should cleanup styles after the animation is complete if fillMode "none" is passed', () => {
      var element = el('div');
      var keyframes = [
        { width: 100 },
        { width: '200px' }
      ];
      var options = {
        duration: 500,
        fillMode: 'none'
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
          fillMode: 'forwards'
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
          fillMode: 'forwards'
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
          fillMode: 'forwards'
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
});
