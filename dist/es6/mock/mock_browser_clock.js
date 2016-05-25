import { BrowserClock } from '../browser_clock';
export class MockBrowserClock extends BrowserClock {
    constructor() {
        super();
        this._queue = [];
        this.incrementedTime = 0;
        this.startingTime = 0;
    }
    raf(fn) { }
    fastForward(time) {
        this.incrementedTime += time;
    }
    now() {
        return this.currentTime;
    }
    get currentTime() {
        return this.startingTime + this.incrementedTime;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19icm93c2VyX2Nsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9jay9tb2NrX2Jyb3dzZXJfY2xvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0I7QUFFN0Msc0NBQXNDLFlBQVk7SUFLaEQ7UUFDRSxPQUFPLENBQUM7UUFMVixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBRUwsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFJakMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELEdBQUcsQ0FBQyxFQUFFLElBQUcsQ0FBQztJQUVWLFdBQVcsQ0FBQyxJQUFZO1FBQ3RCLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFRCxHQUFHO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDbEQsQ0FBQztBQUNILENBQUM7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QnJvd3NlckNsb2NrfSBmcm9tICcuLi9icm93c2VyX2Nsb2NrJztcblxuZXhwb3J0IGNsYXNzIE1vY2tCcm93c2VyQ2xvY2sgZXh0ZW5kcyBCcm93c2VyQ2xvY2sge1xuICBfcXVldWUgPSBbXTtcbiAgcHVibGljIHN0YXJ0aW5nVGltZTogbnVtYmVyO1xuICBwdWJsaWMgaW5jcmVtZW50ZWRUaW1lOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGFydGluZ1RpbWUgPSAwO1xuICB9XG5cbiAgcmFmKGZuKSB7fVxuXG4gIGZhc3RGb3J3YXJkKHRpbWU6IG51bWJlcikge1xuICAgIHRoaXMuaW5jcmVtZW50ZWRUaW1lICs9IHRpbWU7XG4gIH1cblxuICBub3coKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFRpbWU7XG4gIH1cblxuICBnZXQgY3VycmVudFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnRpbmdUaW1lICsgdGhpcy5pbmNyZW1lbnRlZFRpbWU7XG4gIH1cbn1cbiJdfQ==