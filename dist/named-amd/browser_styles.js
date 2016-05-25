enifed("browser_styles", ["exports"], function (exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var BrowserStyles = (function () {
        function BrowserStyles() {
            _classCallCheck(this, BrowserStyles);
        }

        BrowserStyles.prototype.getComputedStyle = function getComputedStyle(element, property) {
            return window.getComputedStyle(element)[property];
        };

        BrowserStyles.prototype.readStyle = function readStyle(element, property) {
            return element.style[property] || null;
        };

        return BrowserStyles;
    })();

    exports.BrowserStyles = BrowserStyles;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXJfc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBQUEsYUFBQTtpQkFBQSxhQUFBO2tDQUFBLGFBQUE7OztBQUFBLHFCQUFBLFdBQ0UsZ0JBQWdCLEdBQUEsMEJBQUMsT0FBb0IsRUFBRSxRQUFnQixFQUFBO0FBQ3JELG1CQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuRDs7QUFISCxxQkFBQSxXQUlFLFNBQVMsR0FBQSxtQkFBQyxPQUFvQixFQUFFLFFBQWdCLEVBQUE7QUFDOUMsbUJBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUM7U0FDeEM7O2VBTkgsYUFBQSIsImZpbGUiOiJicm93c2VyX3N0eWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBCcm93c2VyU3R5bGVzIHtcbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBIVE1MRWxlbWVudCwgcHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpW3Byb3BlcnR5XTtcbiAgfVxuICByZWFkU3R5bGUoZWxlbWVudDogSFRNTEVsZW1lbnQsIHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBlbGVtZW50LnN0eWxlW3Byb3BlcnR5XSB8fCBudWxsO1xuICB9XG59XG4iXX0=