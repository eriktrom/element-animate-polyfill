export class BrowserClock {
    constructor() {
        this.startingTime = 0;
    }
    raf(fn) {
        window.requestAnimationFrame(fn);
    }
    now() {
        return window.performance.now();
    }
    get currentTime() {
        return this.now();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9jbG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZXJfY2xvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFBQTtRQUNTLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO0lBYTFCLENBQUM7SUFYQyxHQUFHLENBQUMsRUFBRTtRQUNKLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsR0FBRztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7QUFDSCxDQUFDO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQnJvd3NlckNsb2NrIHtcbiAgcHVibGljIHN0YXJ0aW5nVGltZSA9IDA7XG5cbiAgcmFmKGZuKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmbik7XG4gIH1cblxuICBub3coKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgfVxuXG4gIGdldCBjdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5ub3coKTtcbiAgfVxufVxuIl19