enifed("browser_clock", ["exports"], function (exports) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var BrowserClock = (function () {
        function BrowserClock() {
            _classCallCheck(this, BrowserClock);

            this.startingTime = 0;
        }

        BrowserClock.prototype.raf = function raf(fn) {
            window.requestAnimationFrame(fn);
        };

        BrowserClock.prototype.now = function now() {
            return window.performance.now();
        };

        _createClass(BrowserClock, [{
            key: "currentTime",
            get: function () {
                return this.now();
            }
        }]);

        return BrowserClock;
    })();

    exports.BrowserClock = BrowserClock;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXJfY2xvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztRQUFBLFlBQUE7QUFBQSxpQkFBQSxZQUFBLEdBQUE7a0NBQUEsWUFBQTs7QUFDUyxnQkFBQSxDQUFBLFlBQVksR0FBRyxDQUFDLENBQUM7U0FhekI7O0FBZEQsb0JBQUEsV0FHRSxHQUFHLEdBQUEsYUFBQyxFQUFFLEVBQUE7QUFDSixrQkFBTSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2xDOztBQUxILG9CQUFBLFdBT0UsR0FBRyxHQUFBLGVBQUE7QUFDRCxtQkFBTyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2pDOztxQkFUSCxZQUFBOztpQkFXaUIsWUFBQTtBQUNiLHVCQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNuQjs7O2VBYkgsWUFBQSIsImZpbGUiOiJicm93c2VyX2Nsb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJyb3dzZXJDbG9jayB7XG4gIHB1YmxpYyBzdGFydGluZ1RpbWUgPSAwO1xuXG4gIHJhZihmbikge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZm4pO1xuICB9XG5cbiAgbm93KCkge1xuICAgIHJldHVybiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gIH1cblxuICBnZXQgY3VycmVudFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubm93KCk7XG4gIH1cbn1cbiJdfQ==