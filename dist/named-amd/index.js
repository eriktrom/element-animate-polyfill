enifed("index", ["exports", "animation", "browser_styles", "browser_clock"], function (exports, _animation, _browser_styles, _browser_clock) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var ElementAnimatePolyfill = (function () {
        function ElementAnimatePolyfill() {
            _classCallCheck(this, ElementAnimatePolyfill);
        }

        ElementAnimatePolyfill.prototype.animate = function animate(element, keyframes, options) {
            var clock = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
            var styles = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

            return new _animation.Animation(keyframes, options, clock, styles).create(element);
        };

        return ElementAnimatePolyfill;
    })();

    exports.ElementAnimatePolyfill = ElementAnimatePolyfill;

    var polyfill = new ElementAnimatePolyfill();
    var globalClock = new _browser_clock.BrowserClock();
    var globalStyles = new _browser_styles.BrowserStyles();
    var elementAnimateFn = window['$$elementAnimateFn'] = function (element, keyframes, options) {
        var player = polyfill.animate(element, keyframes, options, globalClock, globalStyles);
        player.play();
        return player;
    };
    if (!Element.prototype['animate']) {
        Element.prototype['animate'] = function (keyframes, options) {
            elementAnimateFn(this, keyframes, options);
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBS0Esc0JBQUE7aUJBQUEsc0JBQUE7a0NBQUEsc0JBQUE7OztBQUFBLDhCQUFBLFdBQ0UsT0FBTyxHQUFBLGlCQUFDLE9BQW9CLEVBQ3BCLFNBQW9DLEVBQ3BDLE9BQWUsRUFFYTtnQkFENUIsS0FBSyx5REFBaUIsSUFBSTtnQkFDMUIsTUFBTSx5REFBa0IsSUFBSTs7QUFDbEMsbUJBQU8sZUFYSCxTQUFTLENBV1EsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pFOztlQVBILHNCQUFBOzs7OztBQVVBLFFBQUksUUFBUSxHQUFHLElBQUksc0JBQXNCLEVBQUUsQ0FBQztBQUM1QyxRQUFJLFdBQVcsR0FBRyxtQkFiVixZQUFZLEVBYWdCLENBQUM7QUFDckMsUUFBSSxZQUFZLEdBQUcsb0JBZlgsYUFBYSxFQWVpQixDQUFDO0FBQ3ZDLFFBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsVUFBUyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBQTtBQUN4RixZQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUN0RixjQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZCxlQUFPLE1BQU0sQ0FBQztLQUNmLENBQUE7QUFFRCxRQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtBQUNqQyxlQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFVBQVUsU0FBUyxFQUFFLE9BQU8sRUFBQTtBQUN6RCw0QkFBZ0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzVDLENBQUM7S0FDSCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QW5pbWF0aW9ufSBmcm9tIFwiLi9hbmltYXRpb25cIjtcbmltcG9ydCB7UGxheWVyfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7QnJvd3NlclN0eWxlc30gZnJvbSBcIi4vYnJvd3Nlcl9zdHlsZXNcIjtcbmltcG9ydCB7QnJvd3NlckNsb2NrfSBmcm9tICcuL2Jyb3dzZXJfY2xvY2snO1xuXG5leHBvcnQgY2xhc3MgRWxlbWVudEFuaW1hdGVQb2x5ZmlsbCB7XG4gIGFuaW1hdGUoZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgICAga2V5ZnJhbWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdLFxuICAgICAgICAgIG9wdGlvbnM6IG51bWJlcixcbiAgICAgICAgICBjbG9jazogQnJvd3NlckNsb2NrID0gbnVsbCxcbiAgICAgICAgICBzdHlsZXM6IEJyb3dzZXJTdHlsZXMgPSBudWxsKTogUGxheWVyIHtcbiAgICByZXR1cm4gbmV3IEFuaW1hdGlvbihrZXlmcmFtZXMsIG9wdGlvbnMsIGNsb2NrLCBzdHlsZXMpLmNyZWF0ZShlbGVtZW50KTtcbiAgfVxufVxuXG52YXIgcG9seWZpbGwgPSBuZXcgRWxlbWVudEFuaW1hdGVQb2x5ZmlsbCgpO1xudmFyIGdsb2JhbENsb2NrID0gbmV3IEJyb3dzZXJDbG9jaygpO1xudmFyIGdsb2JhbFN0eWxlcyA9IG5ldyBCcm93c2VyU3R5bGVzKCk7XG52YXIgZWxlbWVudEFuaW1hdGVGbiA9IHdpbmRvd1snJCRlbGVtZW50QW5pbWF0ZUZuJ10gPSBmdW5jdGlvbihlbGVtZW50LCBrZXlmcmFtZXMsIG9wdGlvbnMpIHtcbiAgdmFyIHBsYXllciA9IHBvbHlmaWxsLmFuaW1hdGUoZWxlbWVudCwga2V5ZnJhbWVzLCBvcHRpb25zLCBnbG9iYWxDbG9jaywgZ2xvYmFsU3R5bGVzKTtcbiAgcGxheWVyLnBsYXkoKTtcbiAgcmV0dXJuIHBsYXllcjtcbn1cblxuaWYgKCFFbGVtZW50LnByb3RvdHlwZVsnYW5pbWF0ZSddKSB7XG4gIEVsZW1lbnQucHJvdG90eXBlWydhbmltYXRlJ10gPSBmdW5jdGlvbiAoa2V5ZnJhbWVzLCBvcHRpb25zKSB7XG4gICAgZWxlbWVudEFuaW1hdGVGbih0aGlzLCBrZXlmcmFtZXMsIG9wdGlvbnMpO1xuICB9O1xufVxuIl19