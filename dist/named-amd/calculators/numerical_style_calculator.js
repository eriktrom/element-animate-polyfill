enifed('calculators/numerical_style_calculator', ['exports', 'util'], function (exports, _util) {
    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var NumericalStyleCalculator = (function () {
        function NumericalStyleCalculator() {
            _classCallCheck(this, NumericalStyleCalculator);
        }

        NumericalStyleCalculator.prototype.setKeyframeRange = function setKeyframeRange(startValue, endValue) {
            this._startValue = _util.toInt(startValue);
            this._endValue = _util.toInt(endValue);
            this._rangeDiff = this._endValue - this._startValue;
        };

        NumericalStyleCalculator.prototype.calculate = function calculate(percentage) {
            return (this._rangeDiff * percentage + this._startValue).toString();
        };

        return NumericalStyleCalculator;
    })();

    exports.NumericalStyleCalculator = NumericalStyleCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0b3JzL251bWVyaWNhbF9zdHlsZV9jYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBR0Esd0JBQUE7QUFLRSxpQkFMRix3QkFBQSxHQUtFO2tDQUxGLHdCQUFBO1NBS2tCOztBQUxsQixnQ0FBQSxXQU9FLGdCQUFnQixHQUFBLDBCQUFDLFVBQXlCLEVBQUUsUUFBdUIsRUFBQTtBQUNqRSxnQkFBSSxDQUFDLFdBQVcsR0FBRyxNQVZmLEtBQUssQ0FVZ0IsVUFBVSxDQUFDLENBQUM7QUFDckMsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsTUFYYixLQUFLLENBV2MsUUFBUSxDQUFDLENBQUM7QUFDakMsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3JEOztBQVhILGdDQUFBLFdBYUUsU0FBUyxHQUFBLG1CQUFDLFVBQWtCLEVBQUE7QUFDMUIsbUJBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFBLENBQUUsUUFBUSxFQUFFLENBQUM7U0FDckU7O2VBZkgsd0JBQUEiLCJmaWxlIjoibnVtZXJpY2FsX3N0eWxlX2NhbGN1bGF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0eWxlQ2FsY3VsYXRvcn0gZnJvbSAnLi4vc3R5bGVfY2FsY3VsYXRvcic7XG5pbXBvcnQge3RvSW50fSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGNsYXNzIE51bWVyaWNhbFN0eWxlQ2FsY3VsYXRvciBpbXBsZW1lbnRzIFN0eWxlQ2FsY3VsYXRvciB7XG4gIHByaXZhdGUgX3N0YXJ0VmFsdWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfZW5kVmFsdWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfcmFuZ2VEaWZmOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHNldEtleWZyYW1lUmFuZ2Uoc3RhcnRWYWx1ZTogbnVtYmVyfHN0cmluZywgZW5kVmFsdWU6IG51bWJlcnxzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gdG9JbnQoc3RhcnRWYWx1ZSk7XG4gICAgdGhpcy5fZW5kVmFsdWUgPSB0b0ludChlbmRWYWx1ZSk7XG4gICAgdGhpcy5fcmFuZ2VEaWZmID0gdGhpcy5fZW5kVmFsdWUgLSB0aGlzLl9zdGFydFZhbHVlO1xuICB9XG5cbiAgY2FsY3VsYXRlKHBlcmNlbnRhZ2U6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLl9yYW5nZURpZmYgKiBwZXJjZW50YWdlICsgdGhpcy5fc3RhcnRWYWx1ZSkudG9TdHJpbmcoKTtcbiAgfVxufVxuIl19