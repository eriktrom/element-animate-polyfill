enifed('calculators/dimensional_style_calculator', ['exports', 'util'], function (exports, _util) {
    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var DEFAULT_UNIT = 'px';

    var DimensionalStyleCalculator = (function () {
        function DimensionalStyleCalculator() {
            _classCallCheck(this, DimensionalStyleCalculator);
        }

        DimensionalStyleCalculator.prototype.setKeyframeRange = function setKeyframeRange(startValue, endValue) {
            var unitA = _util.findDimensionalSuffix(startValue) || DEFAULT_UNIT;
            var unitB = _util.findDimensionalSuffix(endValue) || DEFAULT_UNIT;
            if (unitA != unitB) {
                throw new Error('Animations containing the same unit can only be animated (the unit for ' + startValue + ' != ' + endValue);
            }
            this._unit = unitA;
            this._startValue = _util.toInt(startValue);
            this._endValue = _util.toInt(endValue);
            this._rangeDiff = this._endValue - this._startValue;
        };

        DimensionalStyleCalculator.prototype.calculate = function calculate(percentage) {
            return this._rangeDiff * percentage + this._startValue + this._unit;
        };

        return DimensionalStyleCalculator;
    })();

    exports.DimensionalStyleCalculator = DimensionalStyleCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0b3JzL2RpbWVuc2lvbmFsX3N0eWxlX2NhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxRQUFJLFlBQVksR0FBRyxJQUFJLENBQUM7O1FBRXhCLDBCQUFBO0FBTUUsaUJBTkYsMEJBQUEsR0FNRTtrQ0FORiwwQkFBQTtTQU1rQjs7QUFObEIsa0NBQUEsV0FRRSxnQkFBZ0IsR0FBQSwwQkFBQyxVQUF5QixFQUFFLFFBQXVCLEVBQUE7QUFDakUsZ0JBQUksS0FBSyxHQUFHLE1BYkQscUJBQXFCLENBYUUsVUFBVSxDQUFDLElBQUksWUFBWSxDQUFDO0FBQzlELGdCQUFJLEtBQUssR0FBRyxNQWRELHFCQUFxQixDQWNFLFFBQVEsQ0FBQyxJQUFJLFlBQVksQ0FBQztBQUM1RCxnQkFBSSxLQUFLLElBQUksS0FBSyxFQUFFO0FBQ2xCLHNCQUFNLElBQUksS0FBSyw2RUFBMkUsVUFBVSxZQUFPLFFBQVEsQ0FBRyxDQUFDO2FBQ3hIO0FBRUQsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLGdCQUFJLENBQUMsV0FBVyxHQUFHLE1BcEJmLEtBQUssQ0FvQmdCLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLGdCQUFJLENBQUMsU0FBUyxHQUFHLE1BckJiLEtBQUssQ0FxQmMsUUFBUSxDQUFDLENBQUM7QUFDakMsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3JEOztBQW5CSCxrQ0FBQSxXQXFCRSxTQUFTLEdBQUEsbUJBQUMsVUFBa0IsRUFBQTtBQUMxQixtQkFBTyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDckU7O2VBdkJILDBCQUFBIiwiZmlsZSI6ImRpbWVuc2lvbmFsX3N0eWxlX2NhbGN1bGF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0eWxlQ2FsY3VsYXRvcn0gZnJvbSAnLi4vc3R5bGVfY2FsY3VsYXRvcic7XG5pbXBvcnQge3RvSW50LCBmaW5kRGltZW5zaW9uYWxTdWZmaXh9IGZyb20gJy4uL3V0aWwnO1xuXG52YXIgREVGQVVMVF9VTklUID0gJ3B4JztcblxuZXhwb3J0IGNsYXNzIERpbWVuc2lvbmFsU3R5bGVDYWxjdWxhdG9yIGltcGxlbWVudHMgU3R5bGVDYWxjdWxhdG9yIHtcbiAgcHJpdmF0ZSBfdW5pdDogc3RyaW5nO1xuICBwcml2YXRlIF9zdGFydFZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX2VuZFZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX3JhbmdlRGlmZjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXRLZXlmcmFtZVJhbmdlKHN0YXJ0VmFsdWU6IG51bWJlcnxzdHJpbmcsIGVuZFZhbHVlOiBudW1iZXJ8c3RyaW5nKTogdm9pZCB7XG4gICAgdmFyIHVuaXRBID0gZmluZERpbWVuc2lvbmFsU3VmZml4KHN0YXJ0VmFsdWUpIHx8IERFRkFVTFRfVU5JVDtcbiAgICB2YXIgdW5pdEIgPSBmaW5kRGltZW5zaW9uYWxTdWZmaXgoZW5kVmFsdWUpIHx8IERFRkFVTFRfVU5JVDtcbiAgICBpZiAodW5pdEEgIT0gdW5pdEIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQW5pbWF0aW9ucyBjb250YWluaW5nIHRoZSBzYW1lIHVuaXQgY2FuIG9ubHkgYmUgYW5pbWF0ZWQgKHRoZSB1bml0IGZvciAke3N0YXJ0VmFsdWV9ICE9ICR7ZW5kVmFsdWV9YCk7XG4gICAgfVxuXG4gICAgdGhpcy5fdW5pdCA9IHVuaXRBO1xuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSB0b0ludChzdGFydFZhbHVlKTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IHRvSW50KGVuZFZhbHVlKTtcbiAgICB0aGlzLl9yYW5nZURpZmYgPSB0aGlzLl9lbmRWYWx1ZSAtIHRoaXMuX3N0YXJ0VmFsdWU7XG4gIH1cblxuICBjYWxjdWxhdGUocGVyY2VudGFnZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VEaWZmICogcGVyY2VudGFnZSArIHRoaXMuX3N0YXJ0VmFsdWUgKyB0aGlzLl91bml0O1xuICB9XG59XG4iXX0=