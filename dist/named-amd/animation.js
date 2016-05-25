enifed("animation", ["exports", "player", "util", "browser_clock.ts", "browser_styles"], function (exports, _player, _util, _browser_clockTs, _browser_styles) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Animation = (function () {
        function Animation(keyframes, options) {
            var clock = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
            var styles = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

            _classCallCheck(this, Animation);

            this.keyframes = keyframes;
            if (_util.isNumber(options)) {
                options = { duration: options };
            }
            this.options = new _player.PlayerOptions(options);
            this._clock = clock || new _browser_clockTs.BrowserClock();
            this._styles = styles || new _browser_styles.BrowserStyles();
        }

        Animation.prototype.create = function create(element) {
            return new _player.Player(element, this.keyframes, this.options, this._clock, this._styles);
        };

        Animation.prototype.start = function start(element) {
            var player = this.create(element);
            player.play();
            return player;
        };

        return Animation;
    })();

    exports.Animation = Animation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztRQUtBLFNBQUE7QUFLRSxpQkFMRixTQUFBLENBS3FCLFNBQW9DLEVBQzNDLE9BQVksRUFFZ0I7Z0JBRDVCLEtBQUsseURBQWlCLElBQUk7Z0JBQzFCLE1BQU0seURBQWtCLElBQUk7O2tDQVIxQyxTQUFBOztBQUtxQixnQkFBQSxDQUFBLFNBQVMsR0FBVCxTQUFTLENBQTJCO0FBSXJELGdCQUFJLE1BYlcsUUFBUSxDQWFWLE9BQU8sQ0FBQyxFQUFFO0FBQ3JCLHVCQUFPLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDakM7QUFFRCxnQkFBSSxDQUFDLE9BQU8sR0FBRyxZQWxCSCxhQUFhLENBa0JRLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLGdCQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssSUFBSSxxQkFqQm5CLFlBQVksRUFpQnlCLENBQUM7QUFDMUMsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLG9CQWpCckIsYUFBYSxFQWlCMkIsQ0FBQztTQUM5Qzs7QUFoQkgsaUJBQUEsV0FrQkUsTUFBTSxHQUFBLGdCQUFDLE9BQW9CLEVBQUE7QUFDekIsbUJBQU8sWUF4QkgsTUFBTSxDQXdCUSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JGOztBQXBCSCxpQkFBQSxXQXNCRSxLQUFLLEdBQUEsZUFBQyxPQUFPLEVBQUE7QUFDWCxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsQyxrQkFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2QsbUJBQU8sTUFBTSxDQUFDO1NBQ2Y7O2VBMUJILFNBQUEiLCJmaWxlIjoiYW5pbWF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQbGF5ZXIsIFBsYXllck9wdGlvbnN9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzTnVtYmVyfSBmcm9tIFwiLi91dGlsXCI7XG5pbXBvcnQge0Jyb3dzZXJDbG9ja30gZnJvbSAnLi9icm93c2VyX2Nsb2NrLnRzJztcbmltcG9ydCB7QnJvd3NlclN0eWxlc30gZnJvbSAnLi9icm93c2VyX3N0eWxlcyc7XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRpb24ge1xuICBvcHRpb25zOiBQbGF5ZXJPcHRpb25zO1xuICBwcml2YXRlIF9jbG9jazogQnJvd3NlckNsb2NrO1xuICBwcml2YXRlIF9zdHlsZXM6IEJyb3dzZXJTdHlsZXM7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGtleWZyYW1lczoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSxcbiAgICAgICAgICAgICAgb3B0aW9uczogYW55LFxuICAgICAgICAgICAgICBjbG9jazogQnJvd3NlckNsb2NrID0gbnVsbCxcbiAgICAgICAgICAgICAgc3R5bGVzOiBCcm93c2VyU3R5bGVzID0gbnVsbCkge1xuICAgIGlmIChpc051bWJlcihvcHRpb25zKSkge1xuICAgICAgb3B0aW9ucyA9IHsgZHVyYXRpb246IG9wdGlvbnMgfTtcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBuZXcgUGxheWVyT3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9jbG9jayA9IGNsb2NrIHx8IG5ldyBCcm93c2VyQ2xvY2soKTtcbiAgICB0aGlzLl9zdHlsZXMgPSBzdHlsZXMgfHwgbmV3IEJyb3dzZXJTdHlsZXMoKTtcbiAgfVxuXG4gIGNyZWF0ZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IFBsYXllciB7XG4gICAgcmV0dXJuIG5ldyBQbGF5ZXIoZWxlbWVudCwgdGhpcy5rZXlmcmFtZXMsIHRoaXMub3B0aW9ucywgdGhpcy5fY2xvY2ssIHRoaXMuX3N0eWxlcyk7XG4gIH1cblxuICBzdGFydChlbGVtZW50KTogUGxheWVyIHtcbiAgICB2YXIgcGxheWVyID0gdGhpcy5jcmVhdGUoZWxlbWVudCk7XG4gICAgcGxheWVyLnBsYXkoKTtcbiAgICByZXR1cm4gcGxheWVyO1xuICB9XG59XG4iXX0=