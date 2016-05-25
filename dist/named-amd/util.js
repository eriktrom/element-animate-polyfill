enifed('util', ['exports'], function (exports) {
    'use strict';

    exports.isNumber = isNumber;
    exports.toInt = toInt;
    exports.toFloat = toFloat;
    exports.isPresent = isPresent;
    exports.roundDecimal = roundDecimal;
    exports.isArray = isArray;
    exports.isStringMap = isStringMap;
    exports.forEach = forEach;
    exports.toJson = toJson;
    exports.findDimensionalSuffix = findDimensionalSuffix;

    function isNumber(value) {
        return typeof value == 'number';
    }

    function toInt(value) {
        return parseInt(value.toString(), 10);
    }

    function toFloat(value) {
        return parseFloat(value.toString());
    }

    function isPresent(value) {
        return value != null;
    }

    function roundDecimal(value) {
        var totalDigits = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

        var base = 1;
        for (var i = 0; i < totalDigits; i++) base *= 10;
        return Math.round(value * base) / base;
    }

    function isArray(value) {
        return Array.isArray(value);
    }

    function isStringMap(obj) {
        return typeof obj === 'object' && obj !== null;
    }

    function forEach(collection, fn) {
        if (isArray(collection)) {
            collection.forEach(function (value, index) {
                return fn(value, index);
            });
        } else if (isStringMap(collection)) {
            for (var key in collection) {
                var value = collection[key];
                fn(value, key);
            }
        } else {
            throw new Error('invalid value passed into forEach');
        }
    }

    function toJson(value) {
        return JSON.stringify(value);
    }

    var _$0 = 48;
    var _$9 = 57;
    var _$PERIOD = 46;

    function findDimensionalSuffix(value) {
        for (var i = 0; i < value.length; i++) {
            var c = value.charCodeAt(i);
            if (c >= _$0 && c <= _$9 || c == _$PERIOD) continue;
            return value.substring(i, value.length);
        }
        return '';
    }
});
//# sourceMappingURL=data:application/json;base64,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b250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9JbnQodmFsdWU6IHN0cmluZ3xudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gPG51bWJlcj4ocGFyc2VJbnQodmFsdWUudG9TdHJpbmcoKSwgMTApKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRmxvYXQodmFsdWU6IHN0cmluZ3xudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gPG51bWJlcj4ocGFyc2VGbG9hdCh2YWx1ZS50b1N0cmluZygpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ByZXNlbnQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZERlY2ltYWwodmFsdWU6IG51bWJlciwgdG90YWxEaWdpdHM6IG51bWJlciA9IDIpIHtcbiAgdmFyIGJhc2UgPSAxO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsRGlnaXRzOyBpKyspIGJhc2UgKj0gMTA7XG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogYmFzZSkgLyBiYXNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSh2YWx1ZTogYW55KSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nTWFwKG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoKGNvbGxlY3Rpb246IGFueVtdfHtba2V5OiBzdHJpbmddOiBhbnl9LCBmbjogRnVuY3Rpb24pIHtcbiAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAoPGFueVtdPmNvbGxlY3Rpb24pLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4gZm4odmFsdWUsIGluZGV4KSk7XG4gIH0gZWxzZSBpZiAoaXNTdHJpbmdNYXAoY29sbGVjdGlvbikpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gY29sbGVjdGlvbikge1xuICAgICAgbGV0IHZhbHVlID0gY29sbGVjdGlvbltrZXldO1xuICAgICAgZm4odmFsdWUsIGtleSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB2YWx1ZSBwYXNzZWQgaW50byBmb3JFYWNoJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSnNvbih2YWx1ZTogYW55KSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG59XG5cbmNvbnN0IF8kMCA9IDQ4O1xuY29uc3QgXyQ5ID0gNTc7XG5jb25zdCBfJFBFUklPRCA9IDQ2O1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZERpbWVuc2lvbmFsU3VmZml4KHZhbHVlKTogc3RyaW5nIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjID0gdmFsdWUuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoKGMgPj0gXyQwICYmIGMgPD0gXyQ5KSB8fCBjID09IF8kUEVSSU9EKSBjb250aW51ZTtcbiAgICByZXR1cm4gdmFsdWUuc3Vic3RyaW5nKGksIHZhbHVlLmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4iXX0=