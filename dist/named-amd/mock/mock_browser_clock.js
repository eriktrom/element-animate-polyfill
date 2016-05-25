enifed('mock/mock_browser_clock', ['exports', 'browser_clock'], function (exports, _browser_clock) {
    'use strict';

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

    var MockBrowserClock = (function (_BrowserClock) {
        _inherits(MockBrowserClock, _BrowserClock);

        function MockBrowserClock() {
            _classCallCheck(this, MockBrowserClock);

            _BrowserClock.call(this);
            this._queue = [];
            this.incrementedTime = 0;
            this.startingTime = 0;
        }

        MockBrowserClock.prototype.raf = function raf(fn) {};

        MockBrowserClock.prototype.fastForward = function fastForward(time) {
            this.incrementedTime += time;
        };

        MockBrowserClock.prototype.now = function now() {
            return this.currentTime;
        };

        _createClass(MockBrowserClock, [{
            key: 'currentTime',
            get: function () {
                return this.startingTime + this.incrementedTime;
            }
        }]);

        return MockBrowserClock;
    })(_browser_clock.BrowserClock);

    exports.MockBrowserClock = MockBrowserClock;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2svbW9ja19icm93c2VyX2Nsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1FBRUEsZ0JBQUE7a0JBQUEsZ0JBQUE7O0FBS0UsaUJBTEYsZ0JBQUEsR0FLRTtrQ0FMRixnQkFBQTs7QUFNSSxvQ0FBTyxDQUFDO0FBTFYsZ0JBQUEsQ0FBQSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBRUwsZ0JBQUEsQ0FBQSxlQUFlLEdBQVcsQ0FBQyxDQUFDO0FBSWpDLGdCQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUN2Qjs7QUFSSCx3QkFBQSxXQVVFLEdBQUcsR0FBQSxhQUFDLEVBQUUsRUFBQSxFQUFJOztBQVZaLHdCQUFBLFdBWUUsV0FBVyxHQUFBLHFCQUFDLElBQVksRUFBQTtBQUN0QixnQkFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUM7U0FDOUI7O0FBZEgsd0JBQUEsV0FnQkUsR0FBRyxHQUFBLGVBQUE7QUFDRCxtQkFBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3pCOztxQkFsQkgsZ0JBQUE7O2lCQW9CaUIsWUFBQTtBQUNiLHVCQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQzthQUNqRDs7O2VBdEJILGdCQUFBO3NCQUZRLFlBQVkiLCJmaWxlIjoibW9ja19icm93c2VyX2Nsb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCcm93c2VyQ2xvY2t9IGZyb20gJy4uL2Jyb3dzZXJfY2xvY2snO1xuXG5leHBvcnQgY2xhc3MgTW9ja0Jyb3dzZXJDbG9jayBleHRlbmRzIEJyb3dzZXJDbG9jayB7XG4gIF9xdWV1ZSA9IFtdO1xuICBwdWJsaWMgc3RhcnRpbmdUaW1lOiBudW1iZXI7XG4gIHB1YmxpYyBpbmNyZW1lbnRlZFRpbWU6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXJ0aW5nVGltZSA9IDA7XG4gIH1cblxuICByYWYoZm4pIHt9XG5cbiAgZmFzdEZvcndhcmQodGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbmNyZW1lbnRlZFRpbWUgKz0gdGltZTtcbiAgfVxuXG4gIG5vdygpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VGltZTtcbiAgfVxuXG4gIGdldCBjdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydGluZ1RpbWUgKyB0aGlzLmluY3JlbWVudGVkVGltZTtcbiAgfVxufVxuIl19