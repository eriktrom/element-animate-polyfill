enifed('calculators/color_style_calculator', ['exports', 'util'], function (exports, _util) {
    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    canvas.width = canvas.height = 1;
    var context = canvas.getContext('2d');

    var ColorStyleCalculator = (function () {
        function ColorStyleCalculator() {
            _classCallCheck(this, ColorStyleCalculator);
        }

        ColorStyleCalculator.prototype.setKeyframeRange = function setKeyframeRange(startValue, endValue) {
            this._startValue = parseColorString(startValue);
            this._endValue = parseColorString(endValue);
            this._rangeDiff = [];
            this._rangeDiff[0] = this._endValue[0] - this._startValue[0];
            this._rangeDiff[1] = this._endValue[1] - this._startValue[1];
            this._rangeDiff[2] = this._endValue[2] - this._startValue[2];
            this._rangeDiff[3] = this._endValue[3] - this._startValue[3];
        };

        ColorStyleCalculator.prototype.calculate = function calculate(percentage) {
            var _this = this;

            var values = [];
            var alphaVal = this._rangeDiff[3] * percentage + this._startValue[3];
            _util.forEach(this._rangeDiff, function (value, index) {
                var currentValue = value * percentage + _this._startValue[index];
                if (index < 3) {
                    if (alphaVal !== 1 && currentValue > 0) {
                        currentValue /= alphaVal;
                    }
                    currentValue = Math.round(currentValue);
                }
                values.push(currentValue);
            });
            var valueString = values.join(', ');
            return 'rgba(' + valueString + ')';
        };

        return ColorStyleCalculator;
    })();

    exports.ColorStyleCalculator = ColorStyleCalculator;

    function parseColorString(colorString) {
        // Source: https://github.com/web-animations/web-animations-js/blob/b5d91413acee82aadd01a18880cb84a5d883047d/src/color-handler.js
        colorString = colorString.trim();
        // The context ignores invalid colors
        context.fillStyle = '#000';
        context.fillStyle = colorString;
        var contextSerializedFillStyle = context.fillStyle;
        context.fillStyle = '#fff';
        context.fillStyle = colorString;
        if (contextSerializedFillStyle != context.fillStyle) return;
        context.fillRect(0, 0, 1, 1);
        var pixelColor = context.getImageData(0, 0, 1, 1).data;
        context.clearRect(0, 0, 1, 1);
        var alpha = pixelColor[3] / 255;
        return [pixelColor[0] * alpha, pixelColor[1] * alpha, pixelColor[2] * alpha, alpha];
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0b3JzL2NvbG9yX3N0eWxlX2NhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxRQUFJLE1BQU0sR0FBc0IsUUFBUSxDQUFDLGVBQWUsQ0FBQyw4QkFBOEIsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNuRyxVQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLFFBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBRXRDLG9CQUFBO0FBS0UsaUJBTEYsb0JBQUEsR0FLRTtrQ0FMRixvQkFBQTtTQUtrQjs7QUFMbEIsNEJBQUEsV0FPRSxnQkFBZ0IsR0FBQSwwQkFBQyxVQUFrQixFQUFFLFFBQWdCLEVBQUE7QUFDbkQsZ0JBQUksQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDaEQsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUMsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RCxnQkFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0QsZ0JBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdELGdCQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5RDs7QUFmSCw0QkFBQSxXQWlCRSxTQUFTLEdBQUEsbUJBQUMsVUFBa0IsRUFBQTs7O0FBQzFCLGdCQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsZ0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFckUsa0JBM0JXLE9BQU8sQ0EyQlYsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQUssRUFBRSxLQUFLLEVBQUE7QUFDcEMsb0JBQUksWUFBWSxHQUFHLEtBQUssR0FBRyxVQUFVLEdBQUcsTUFBSyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEUsb0JBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtBQUNiLHdCQUFHLFFBQVEsS0FBSyxDQUFDLElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTtBQUNyQyxvQ0FBWSxJQUFJLFFBQVEsQ0FBQztxQkFDMUI7QUFDRCxnQ0FBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3pDO0FBQ0Qsc0JBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDM0IsQ0FBQyxDQUFDO0FBR0gsZ0JBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFcEMsNkJBQWUsV0FBVyxPQUFJO1NBQy9COztlQXBDSCxvQkFBQTs7Ozs7QUF1Q0EsYUFBQSxnQkFBQSxDQUEwQixXQUFtQixFQUFBOztBQUUzQyxtQkFBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFakMsZUFBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDM0IsZUFBTyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFDaEMsWUFBSSwwQkFBMEIsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO0FBQ25ELGVBQU8sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBQzNCLGVBQU8sQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO0FBQ2hDLFlBQUksMEJBQTBCLElBQUksT0FBTyxDQUFDLFNBQVMsRUFDakQsT0FBTztBQUNULGVBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0IsWUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDdkQsZUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM5QixZQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBRWhDLGVBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNyRiIsImZpbGUiOiJjb2xvcl9zdHlsZV9jYWxjdWxhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdHlsZUNhbGN1bGF0b3J9IGZyb20gJy4uL3N0eWxlX2NhbGN1bGF0b3InO1xuaW1wb3J0IHt0b0ludCwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbCc7XG5cbnZhciBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJywgJ2NhbnZhcycpO1xuY2FudmFzLndpZHRoID0gY2FudmFzLmhlaWdodCA9IDE7XG52YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JTdHlsZUNhbGN1bGF0b3IgaW1wbGVtZW50cyBTdHlsZUNhbGN1bGF0b3Ige1xuICBwcml2YXRlIF9zdGFydFZhbHVlOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBfZW5kVmFsdWU6IG51bWJlcltdO1xuICBwcml2YXRlIF9yYW5nZURpZmY6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXRLZXlmcmFtZVJhbmdlKHN0YXJ0VmFsdWU6IHN0cmluZywgZW5kVmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSBwYXJzZUNvbG9yU3RyaW5nKHN0YXJ0VmFsdWUpO1xuICAgIHRoaXMuX2VuZFZhbHVlID0gcGFyc2VDb2xvclN0cmluZyhlbmRWYWx1ZSk7XG4gICAgdGhpcy5fcmFuZ2VEaWZmID0gW107XG4gICAgdGhpcy5fcmFuZ2VEaWZmWzBdID0gdGhpcy5fZW5kVmFsdWVbMF0gLSB0aGlzLl9zdGFydFZhbHVlWzBdO1xuICAgIHRoaXMuX3JhbmdlRGlmZlsxXSA9IHRoaXMuX2VuZFZhbHVlWzFdIC0gdGhpcy5fc3RhcnRWYWx1ZVsxXTtcbiAgICB0aGlzLl9yYW5nZURpZmZbMl0gPSB0aGlzLl9lbmRWYWx1ZVsyXSAtIHRoaXMuX3N0YXJ0VmFsdWVbMl07XG4gICAgdGhpcy5fcmFuZ2VEaWZmWzNdID0gdGhpcy5fZW5kVmFsdWVbM10gLSB0aGlzLl9zdGFydFZhbHVlWzNdO1xuICB9XG5cbiAgY2FsY3VsYXRlKHBlcmNlbnRhZ2U6IG51bWJlcik6IHN0cmluZyB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIHZhciBhbHBoYVZhbCA9IHRoaXMuX3JhbmdlRGlmZlszXSAqIHBlcmNlbnRhZ2UgKyB0aGlzLl9zdGFydFZhbHVlWzNdO1xuXG4gICAgZm9yRWFjaCh0aGlzLl9yYW5nZURpZmYsICh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgIHZhciBjdXJyZW50VmFsdWUgPSB2YWx1ZSAqIHBlcmNlbnRhZ2UgKyB0aGlzLl9zdGFydFZhbHVlW2luZGV4XTtcbiAgICAgIGlmIChpbmRleCA8IDMpIHtcbiAgICAgICAgaWYoYWxwaGFWYWwgIT09IDEgJiYgY3VycmVudFZhbHVlID4gMCkge1xuICAgICAgICAgIGN1cnJlbnRWYWx1ZSAvPSBhbHBoYVZhbDtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50VmFsdWUgPSBNYXRoLnJvdW5kKGN1cnJlbnRWYWx1ZSk7XG4gICAgICB9XG4gICAgICB2YWx1ZXMucHVzaChjdXJyZW50VmFsdWUpO1xuICAgIH0pO1xuXG5cbiAgICBsZXQgdmFsdWVTdHJpbmcgPSB2YWx1ZXMuam9pbignLCAnKTtcblxuICAgIHJldHVybiBgcmdiYSgke3ZhbHVlU3RyaW5nfSlgO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlQ29sb3JTdHJpbmcoY29sb3JTdHJpbmc6IHN0cmluZyk6IG51bWJlcltdIHtcbiAgLy8gU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vd2ViLWFuaW1hdGlvbnMvd2ViLWFuaW1hdGlvbnMtanMvYmxvYi9iNWQ5MTQxM2FjZWU4MmFhZGQwMWExODg4MGNiODRhNWQ4ODMwNDdkL3NyYy9jb2xvci1oYW5kbGVyLmpzXG4gIGNvbG9yU3RyaW5nID0gY29sb3JTdHJpbmcudHJpbSgpO1xuICAvLyBUaGUgY29udGV4dCBpZ25vcmVzIGludmFsaWQgY29sb3JzXG4gIGNvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAnO1xuICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yU3RyaW5nO1xuICB2YXIgY29udGV4dFNlcmlhbGl6ZWRGaWxsU3R5bGUgPSBjb250ZXh0LmZpbGxTdHlsZTtcbiAgY29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3JTdHJpbmc7XG4gIGlmIChjb250ZXh0U2VyaWFsaXplZEZpbGxTdHlsZSAhPSBjb250ZXh0LmZpbGxTdHlsZSlcbiAgICByZXR1cm47XG4gIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgMSwgMSk7XG4gIHZhciBwaXhlbENvbG9yID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgMSwgMSkuZGF0YTtcbiAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgMSwgMSk7XG4gIHZhciBhbHBoYSA9IHBpeGVsQ29sb3JbM10gLyAyNTU7XG5cbiAgcmV0dXJuIFtwaXhlbENvbG9yWzBdICogYWxwaGEsIHBpeGVsQ29sb3JbMV0gKiBhbHBoYSwgcGl4ZWxDb2xvclsyXSAqIGFscGhhLCBhbHBoYV07XG59XG5cbiJdfQ==