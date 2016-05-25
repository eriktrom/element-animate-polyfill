export function isNumber(value) {
    return typeof value == 'number';
}
export function toInt(value) {
    return (parseInt(value.toString(), 10));
}
export function toFloat(value) {
    return (parseFloat(value.toString()));
}
export function isPresent(value) {
    return value != null;
}
export function roundDecimal(value, totalDigits = 2) {
    var base = 1;
    for (var i = 0; i < totalDigits; i++)
        base *= 10;
    return Math.round(value * base) / base;
}
export function isArray(value) {
    return Array.isArray(value);
}
export function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
}
export function forEach(collection, fn) {
    if (isArray(collection)) {
        collection.forEach((value, index) => fn(value, index));
    }
    else if (isStringMap(collection)) {
        for (var key in collection) {
            let value = collection[key];
            fn(value, key);
        }
    }
    else {
        throw new Error('invalid value passed into forEach');
    }
}
export function toJson(value) {
    return JSON.stringify(value);
}
const _$0 = 48;
const _$9 = 57;
const _$PERIOD = 46;
export function findDimensionalSuffix(value) {
    for (var i = 0; i < value.length; i++) {
        var c = value.charCodeAt(i);
        if ((c >= _$0 && c <= _$9) || c == _$PERIOD)
            continue;
        return value.substring(i, value.length);
    }
    return '';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCLEtBQUs7SUFDNUIsTUFBTSxDQUFDLE9BQU8sS0FBSyxJQUFJLFFBQVEsQ0FBQztBQUNsQyxDQUFDO0FBRUQsc0JBQXNCLEtBQW9CO0lBQ3hDLE1BQU0sQ0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRUQsd0JBQXdCLEtBQW9CO0lBQzFDLE1BQU0sQ0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRCwwQkFBMEIsS0FBSztJQUM3QixNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztBQUN2QixDQUFDO0FBRUQsNkJBQTZCLEtBQWEsRUFBRSxXQUFXLEdBQVcsQ0FBQztJQUNqRSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7SUFDYixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUU7UUFBRSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDekMsQ0FBQztBQUVELHdCQUF3QixLQUFVO0lBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRCw0QkFBNEIsR0FBUTtJQUNsQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7QUFDakQsQ0FBQztBQUVELHdCQUF3QixVQUFzQyxFQUFFLEVBQVk7SUFDMUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixVQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakIsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUN2RCxDQUFDO0FBQ0gsQ0FBQztBQUVELHVCQUF1QixLQUFVO0lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFFRCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDZixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDZixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFFcEIsc0NBQXNDLEtBQUs7SUFDekMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUM7WUFBQyxRQUFRLENBQUM7UUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSW50KHZhbHVlOiBzdHJpbmd8bnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIDxudW1iZXI+KHBhcnNlSW50KHZhbHVlLnRvU3RyaW5nKCksIDEwKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0Zsb2F0KHZhbHVlOiBzdHJpbmd8bnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIDxudW1iZXI+KHBhcnNlRmxvYXQodmFsdWUudG9TdHJpbmcoKSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcmVzZW50KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91bmREZWNpbWFsKHZhbHVlOiBudW1iZXIsIHRvdGFsRGlnaXRzOiBudW1iZXIgPSAyKSB7XG4gIHZhciBiYXNlID0gMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbERpZ2l0czsgaSsrKSBiYXNlICo9IDEwO1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIGJhc2UpIC8gYmFzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkodmFsdWU6IGFueSkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ01hcChvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uOiBhbnlbXXx7W2tleTogc3RyaW5nXTogYW55fSwgZm46IEZ1bmN0aW9uKSB7XG4gIGlmIChpc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgKDxhbnlbXT5jb2xsZWN0aW9uKS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IGZuKHZhbHVlLCBpbmRleCkpO1xuICB9IGVsc2UgaWYgKGlzU3RyaW5nTWFwKGNvbGxlY3Rpb24pKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGNvbGxlY3Rpb24pIHtcbiAgICAgIGxldCB2YWx1ZSA9IGNvbGxlY3Rpb25ba2V5XTtcbiAgICAgIGZuKHZhbHVlLCBrZXkpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgdmFsdWUgcGFzc2VkIGludG8gZm9yRWFjaCcpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0pzb24odmFsdWU6IGFueSkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xufVxuXG5jb25zdCBfJDAgPSA0ODtcbmNvbnN0IF8kOSA9IDU3O1xuY29uc3QgXyRQRVJJT0QgPSA0NjtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmREaW1lbnNpb25hbFN1ZmZpeCh2YWx1ZSk6IHN0cmluZyB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYyA9IHZhbHVlLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKChjID49IF8kMCAmJiBjIDw9IF8kOSkgfHwgYyA9PSBfJFBFUklPRCkgY29udGludWU7XG4gICAgcmV0dXJuIHZhbHVlLnN1YnN0cmluZyhpLCB2YWx1ZS5sZW5ndGgpO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuIl19