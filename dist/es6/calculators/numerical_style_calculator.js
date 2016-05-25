import { toInt } from '../util';
export class NumericalStyleCalculator {
    constructor() {
    }
    setKeyframeRange(startValue, endValue) {
        this._startValue = toInt(startValue);
        this._endValue = toInt(endValue);
        this._rangeDiff = this._endValue - this._startValue;
    }
    calculate(percentage) {
        return (this._rangeDiff * percentage + this._startValue).toString();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpY2FsX3N0eWxlX2NhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxjdWxhdG9ycy9udW1lcmljYWxfc3R5bGVfY2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FDTyxFQUFDLEtBQUssRUFBQyxNQUFNLFNBQVM7QUFFN0I7SUFLRTtJQUFlLENBQUM7SUFFaEIsZ0JBQWdCLENBQUMsVUFBeUIsRUFBRSxRQUF1QjtRQUNqRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN0RCxDQUFDO0lBRUQsU0FBUyxDQUFDLFVBQWtCO1FBQzFCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0RSxDQUFDO0FBQ0gsQ0FBQztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdHlsZUNhbGN1bGF0b3J9IGZyb20gJy4uL3N0eWxlX2NhbGN1bGF0b3InO1xuaW1wb3J0IHt0b0ludH0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBOdW1lcmljYWxTdHlsZUNhbGN1bGF0b3IgaW1wbGVtZW50cyBTdHlsZUNhbGN1bGF0b3Ige1xuICBwcml2YXRlIF9zdGFydFZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX2VuZFZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX3JhbmdlRGlmZjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXRLZXlmcmFtZVJhbmdlKHN0YXJ0VmFsdWU6IG51bWJlcnxzdHJpbmcsIGVuZFZhbHVlOiBudW1iZXJ8c3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhcnRWYWx1ZSA9IHRvSW50KHN0YXJ0VmFsdWUpO1xuICAgIHRoaXMuX2VuZFZhbHVlID0gdG9JbnQoZW5kVmFsdWUpO1xuICAgIHRoaXMuX3JhbmdlRGlmZiA9IHRoaXMuX2VuZFZhbHVlIC0gdGhpcy5fc3RhcnRWYWx1ZTtcbiAgfVxuXG4gIGNhbGN1bGF0ZShwZXJjZW50YWdlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5fcmFuZ2VEaWZmICogcGVyY2VudGFnZSArIHRoaXMuX3N0YXJ0VmFsdWUpLnRvU3RyaW5nKCk7XG4gIH1cbn1cbiJdfQ==