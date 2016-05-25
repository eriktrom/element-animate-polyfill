enifed('player', ['exports', 'dimensional_properties', 'numerical_properties', 'color_properties', 'util', 'calculators/dimensional_style_calculator', 'calculators/numerical_style_calculator', 'calculators/transform_style_calculator', 'calculators/color_style_calculator', 'easing'], function (exports, _dimensional_properties, _numerical_properties, _color_properties, _util, _calculatorsDimensional_style_calculator, _calculatorsNumerical_style_calculator, _calculatorsTransform_style_calculator, _calculatorsColor_style_calculator, _easing) {
    'use strict';

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var AnimationPropertyEntry = function AnimationPropertyEntry(property, calculator) {
        _classCallCheck(this, AnimationPropertyEntry);

        this.property = property;
        this.calculator = calculator;
    };

    exports.AnimationPropertyEntry = AnimationPropertyEntry;

    var PlayerOptions = function PlayerOptions(_ref) {
        var duration = _ref.duration;
        var delay = _ref.delay;
        var easing = _ref.easing;
        var fill = _ref.fill;

        _classCallCheck(this, PlayerOptions);

        this.duration = _util.toInt(duration);
        this.delay = _util.isPresent(delay) ? _util.toInt(delay) : 0;
        this.easing = _util.isPresent(easing) ? easing : 'linear';
        switch (fill) {
            case 'forwards':
            case 'backwards':
            case 'both':
                this.fill = fill;
                break;
            default:
                this.fill = 'none';
                break;
        }
    };

    exports.PlayerOptions = PlayerOptions;

    function createCalculator(prop, values) {
        var calc;
        if (_dimensional_properties.DIMENSIONAL_PROPERTIES.indexOf(prop) >= 0) {
            calc = new _calculatorsDimensional_style_calculator.DimensionalStyleCalculator();
        } else if (_numerical_properties.NUMERICAL_PROPERTIES.indexOf(prop) >= 0) {
            calc = new _calculatorsNumerical_style_calculator.NumericalStyleCalculator();
        } else if (prop == 'transform') {
            calc = new _calculatorsTransform_style_calculator.TransformStyleCalculator();
        } else if (_color_properties.COLOR_PROPERTIES.indexOf(prop) >= 0) {
            calc = new _calculatorsColor_style_calculator.ColorStyleCalculator();
        } else {
            throw new Error('Only dimensional properties can be animated now');
        }
        calc.setKeyframeRange(values[0], values[1]);
        return calc;
    }

    var Player = (function () {
        function Player(_element, keyframes, _options, _clock, _styles) {
            var _this = this;

            _classCallCheck(this, Player);

            this._element = _element;
            this._options = _options;
            this._clock = _clock;
            this._styles = _styles;
            this._currentTime = 0;
            this._startingTimestamp = 0;
            this.onfinish = function () {};
            var properties = {};
            var firstKeyframe = keyframes[0];
            _util.forEach(firstKeyframe, function (value, prop) {
                properties[prop] = [value];
            });
            var secondKeyframe = keyframes[1];
            _util.forEach(secondKeyframe, function (value, prop) {
                properties[prop].push(value);
            });
            this._animators = [];
            _util.forEach(properties, function (values, prop) {
                var calculator = createCalculator(prop, values);
                _this._animators.push(new AnimationPropertyEntry(prop, calculator));
            });
            this._easingEquation = _easing.resolveEasingEquation(_options.easing);
        }

        Player.prototype.play = function play() {
            var _this2 = this;

            if (this.playing) return;
            this._initialValues = {};
            this._animators.forEach(function (entry) {
                var prop = entry.property;
                _this2._initialValues[prop] = _this2._styles.readStyle(_this2._element, prop);
            });
            this.playing = true;
            this._startingTimestamp = this._clock.now();
            this.tick();
        };

        Player.prototype._onfinish = function _onfinish() {
            var fill = this._options.fill;
            if (fill == 'none' || fill == 'backwards') {
                this._cleanup();
            }
            this.onfinish();
        };

        Player.prototype._oncancel = function _oncancel() {
            this._cleanup();
        };

        Player.prototype._ease = function _ease(percentage) {
            return this._easingEquation(percentage);
        };

        Player.prototype._computeProperties = function _computeProperties(currentTime) {
            var results = [];
            var totalTime = this.totalTime;
            var percentage = Math.min(currentTime / totalTime, 1);
            var percentageWithEasing = this._ease(percentage);
            this._animators.forEach(function (entry) {
                var calculator = entry.calculator;
                results.push([entry.property, calculator.calculate(percentageWithEasing)]);
            });
            return results;
        };

        Player.prototype.tick = function tick() {
            var _this3 = this;

            var currentTime = this._clock.currentTime - this._startingTimestamp;
            this._computeProperties(currentTime).forEach(function (entry) {
                return _this3._apply(entry[0], entry[1]);
            });
            if (this._currentTime >= this.totalTime) {
                this._onfinish();
            } else {
                this._clock.raf(function () {
                    return _this3.tick();
                });
            }
            this._currentTime = currentTime;
        };

        Player.prototype._cleanup = function _cleanup() {
            var _this4 = this;

            this._animators.forEach(function (entry) {
                var property = entry.property;
                _this4._apply(property, _this4._initialValues[property]);
            });
            this._initialValues = null;
        };

        Player.prototype._apply = function _apply(prop, value) {
            this._element.style[prop] = value;
        };

        _createClass(Player, [{
            key: 'totalTime',
            get: function () {
                return this._options.duration;
            }
        }, {
            key: 'currentTime',
            get: function () {
                return this._currentTime;
            }
        }]);

        return Player;
    })();

    exports.Player = Player;
});
//# sourceMappingURL=data:application/json;base64,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SyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQUssY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDdEQsQ0FBQyxDQUFDO0FBQ0gsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzVCOztBQXpHSCxjQUFBLFdBMkdFLE1BQU0sR0FBQSxnQkFBQyxJQUFZLEVBQUUsS0FBYSxFQUFBO0FBQ2hDLGdCQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDbkM7O3FCQTdHSCxNQUFBOztpQkFvQ2UsWUFBQTtBQUNYLHVCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2FBQy9COzs7aUJBRWMsWUFBQTtBQUNiLHVCQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDMUI7OztlQTFDSCxNQUFBIiwiZmlsZSI6InBsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QnJvd3NlckNsb2NrfSBmcm9tICcuL2Jyb3dzZXJfY2xvY2sudHMnO1xuaW1wb3J0IHtCcm93c2VyU3R5bGVzfSBmcm9tICcuL2Jyb3dzZXJfc3R5bGVzJztcbmltcG9ydCB7RElNRU5TSU9OQUxfUFJPUEVSVElFU30gZnJvbSAnLi9kaW1lbnNpb25hbF9wcm9wZXJ0aWVzJztcbmltcG9ydCB7TlVNRVJJQ0FMX1BST1BFUlRJRVN9IGZyb20gJy4vbnVtZXJpY2FsX3Byb3BlcnRpZXMnO1xuaW1wb3J0IHtDT0xPUl9QUk9QRVJUSUVTfSBmcm9tICcuL2NvbG9yX3Byb3BlcnRpZXMnO1xuaW1wb3J0IHtmb3JFYWNoLCByb3VuZERlY2ltYWwsIHRvSW50LCB0b0Zsb2F0LCBpc051bWJlciwgaXNQcmVzZW50fSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtEaW1lbnNpb25hbFN0eWxlQ2FsY3VsYXRvcn0gZnJvbSAnLi9jYWxjdWxhdG9ycy9kaW1lbnNpb25hbF9zdHlsZV9jYWxjdWxhdG9yJztcbmltcG9ydCB7TnVtZXJpY2FsU3R5bGVDYWxjdWxhdG9yfSBmcm9tICcuL2NhbGN1bGF0b3JzL251bWVyaWNhbF9zdHlsZV9jYWxjdWxhdG9yJztcbmltcG9ydCB7VHJhbnNmb3JtU3R5bGVDYWxjdWxhdG9yfSBmcm9tICcuL2NhbGN1bGF0b3JzL3RyYW5zZm9ybV9zdHlsZV9jYWxjdWxhdG9yJztcbmltcG9ydCB7Q29sb3JTdHlsZUNhbGN1bGF0b3J9IGZyb20gJy4vY2FsY3VsYXRvcnMvY29sb3Jfc3R5bGVfY2FsY3VsYXRvcic7XG5pbXBvcnQge1N0eWxlQ2FsY3VsYXRvcn0gZnJvbSAnLi9zdHlsZV9jYWxjdWxhdG9yJztcbmltcG9ydCB7cmVzb2x2ZUVhc2luZ0VxdWF0aW9ufSBmcm9tICcuL2Vhc2luZyc7XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRpb25Qcm9wZXJ0eUVudHJ5IHtcbiAgY29uc3RydWN0b3IocHVibGljIHByb3BlcnR5OiBzdHJpbmcsIHB1YmxpYyBjYWxjdWxhdG9yOiBTdHlsZUNhbGN1bGF0b3IpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXJPcHRpb25zIHtcbiAgcHVibGljIGR1cmF0aW9uOiBudW1iZXI7XG4gIHB1YmxpYyBkZWxheTogbnVtYmVyO1xuICBwdWJsaWMgZWFzaW5nOiBzdHJpbmc7XG4gIHB1YmxpYyBmaWxsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IgKHtkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgZmlsbH06IHtcbiAgICBkdXJhdGlvbjogbnVtYmVyfHN0cmluZyxcbiAgICBkZWxheT86IG51bWJlcnxzdHJpbmcsXG4gICAgZWFzaW5nPzogc3RyaW5nLFxuICAgIGZpbGw/OiBzdHJpbmdcbiAgfSkge1xuICAgIHRoaXMuZHVyYXRpb24gPSB0b0ludChkdXJhdGlvbik7XG4gICAgdGhpcy5kZWxheSA9IGlzUHJlc2VudChkZWxheSkgPyB0b0ludChkZWxheSkgOiAwO1xuICAgIHRoaXMuZWFzaW5nID0gaXNQcmVzZW50KGVhc2luZykgPyBlYXNpbmcgOiAnbGluZWFyJztcblxuICAgIHN3aXRjaCAoZmlsbCkge1xuICAgICAgY2FzZSAnZm9yd2FyZHMnOlxuICAgICAgY2FzZSAnYmFja3dhcmRzJzpcbiAgICAgIGNhc2UgJ2JvdGgnOlxuICAgICAgICB0aGlzLmZpbGwgPSBmaWxsO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuZmlsbCA9ICdub25lJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhbGN1bGF0b3IocHJvcDogc3RyaW5nLCB2YWx1ZXM6IGFueVtdKTogU3R5bGVDYWxjdWxhdG9yIHtcbiAgdmFyIGNhbGM6IFN0eWxlQ2FsY3VsYXRvcjtcbiAgaWYgKERJTUVOU0lPTkFMX1BST1BFUlRJRVMuaW5kZXhPZihwcm9wKSA+PSAwKSB7XG4gICAgY2FsYyA9IG5ldyBEaW1lbnNpb25hbFN0eWxlQ2FsY3VsYXRvcigpO1xuICB9IGVsc2UgaWYgKE5VTUVSSUNBTF9QUk9QRVJUSUVTLmluZGV4T2YocHJvcCkgPj0gMCkge1xuICAgIGNhbGMgPSBuZXcgTnVtZXJpY2FsU3R5bGVDYWxjdWxhdG9yKCk7XG4gIH0gZWxzZSBpZiAocHJvcCA9PSAndHJhbnNmb3JtJykge1xuICAgIGNhbGMgPSBuZXcgVHJhbnNmb3JtU3R5bGVDYWxjdWxhdG9yKCk7XG4gIH0gZWxzZSBpZiAoQ09MT1JfUFJPUEVSVElFUy5pbmRleE9mKHByb3ApID49IDApIHtcbiAgICBjYWxjID0gbmV3IENvbG9yU3R5bGVDYWxjdWxhdG9yKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IGRpbWVuc2lvbmFsIHByb3BlcnRpZXMgY2FuIGJlIGFuaW1hdGVkIG5vdycpO1xuICB9XG4gIGNhbGMuc2V0S2V5ZnJhbWVSYW5nZSg8c3RyaW5nfG51bWJlcj52YWx1ZXNbMF0sIDxzdHJpbmd8bnVtYmVyPnZhbHVlc1sxXSk7XG4gIHJldHVybiBjYWxjO1xufVxuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgcHJpdmF0ZSBfY3VycmVudFRpbWU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3N0YXJ0aW5nVGltZXN0YW1wOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9hbmltYXRvcnM6IEFuaW1hdGlvblByb3BlcnR5RW50cnlbXTtcbiAgcHJpdmF0ZSBfaW5pdGlhbFZhbHVlczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIHByaXZhdGUgX2Vhc2luZ0VxdWF0aW9uOiBGdW5jdGlvbjtcblxuICBvbmZpbmlzaDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgcGxheWluZzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAga2V5ZnJhbWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdLFxuICAgICAgICAgICAgICBwcml2YXRlIF9vcHRpb25zOiBQbGF5ZXJPcHRpb25zLFxuICAgICAgICAgICAgICBwcml2YXRlIF9jbG9jazogQnJvd3NlckNsb2NrLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zdHlsZXM6IEJyb3dzZXJTdHlsZXMpIHtcblxuICAgIHZhciBwcm9wZXJ0aWVzID0ge307XG4gICAgdmFyIGZpcnN0S2V5ZnJhbWUgPSBrZXlmcmFtZXNbMF07XG4gICAgZm9yRWFjaChmaXJzdEtleWZyYW1lLCAodmFsdWUsIHByb3ApID0+IHtcbiAgICAgIHByb3BlcnRpZXNbcHJvcF0gPSBbdmFsdWVdO1xuICAgIH0pO1xuXG4gICAgdmFyIHNlY29uZEtleWZyYW1lID0ga2V5ZnJhbWVzWzFdO1xuICAgIGZvckVhY2goc2Vjb25kS2V5ZnJhbWUsICh2YWx1ZSwgcHJvcCkgPT4ge1xuICAgICAgcHJvcGVydGllc1twcm9wXS5wdXNoKHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2FuaW1hdG9ycyA9IFtdO1xuICAgIGZvckVhY2gocHJvcGVydGllcywgKHZhbHVlcywgcHJvcCkgPT4ge1xuICAgICAgdmFyIGNhbGN1bGF0b3IgPSBjcmVhdGVDYWxjdWxhdG9yKHByb3AsIHZhbHVlcyk7XG4gICAgICB0aGlzLl9hbmltYXRvcnMucHVzaChuZXcgQW5pbWF0aW9uUHJvcGVydHlFbnRyeShwcm9wLCBjYWxjdWxhdG9yKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9lYXNpbmdFcXVhdGlvbiA9IHJlc29sdmVFYXNpbmdFcXVhdGlvbihfb3B0aW9ucy5lYXNpbmcpO1xuICB9XG5cbiAgZ2V0IHRvdGFsVGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5kdXJhdGlvbjtcbiAgfVxuXG4gIGdldCBjdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFRpbWU7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIGlmICh0aGlzLnBsYXlpbmcpIHJldHVybjtcbiAgICB0aGlzLl9pbml0aWFsVmFsdWVzID0ge307XG4gICAgdGhpcy5fYW5pbWF0b3JzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgdmFyIHByb3AgPSBlbnRyeS5wcm9wZXJ0eTtcbiAgICAgIHRoaXMuX2luaXRpYWxWYWx1ZXNbcHJvcF0gPSB0aGlzLl9zdHlsZXMucmVhZFN0eWxlKHRoaXMuX2VsZW1lbnQsIHByb3ApO1xuICAgIH0pO1xuICAgIHRoaXMucGxheWluZyA9IHRydWU7XG4gICAgdGhpcy5fc3RhcnRpbmdUaW1lc3RhbXAgPSB0aGlzLl9jbG9jay5ub3coKTtcbiAgICB0aGlzLnRpY2soKTtcbiAgfVxuXG4gIF9vbmZpbmlzaCgpIHtcbiAgICB2YXIgZmlsbCA9IHRoaXMuX29wdGlvbnMuZmlsbDtcbiAgICBpZiAoZmlsbCA9PSAnbm9uZScgfHwgZmlsbCA9PSAnYmFja3dhcmRzJykge1xuICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgIH1cbiAgICB0aGlzLm9uZmluaXNoKCk7XG4gIH1cblxuICBfb25jYW5jZWwoKSB7XG4gICAgdGhpcy5fY2xlYW51cCgpO1xuICB9XG5cbiAgX2Vhc2UocGVyY2VudGFnZSkge1xuICAgIHJldHVybiB0aGlzLl9lYXNpbmdFcXVhdGlvbihwZXJjZW50YWdlKTtcbiAgfVxuXG4gIF9jb21wdXRlUHJvcGVydGllcyhjdXJyZW50VGltZTogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIHRvdGFsVGltZSA9IHRoaXMudG90YWxUaW1lO1xuICAgIHZhciBwZXJjZW50YWdlID0gTWF0aC5taW4oY3VycmVudFRpbWUgLyB0b3RhbFRpbWUsIDEpO1xuICAgIHZhciBwZXJjZW50YWdlV2l0aEVhc2luZyA9IHRoaXMuX2Vhc2UocGVyY2VudGFnZSk7XG5cbiAgICB0aGlzLl9hbmltYXRvcnMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICB2YXIgY2FsY3VsYXRvciA9IGVudHJ5LmNhbGN1bGF0b3I7XG4gICAgICByZXN1bHRzLnB1c2goW2VudHJ5LnByb3BlcnR5LCBjYWxjdWxhdG9yLmNhbGN1bGF0ZShwZXJjZW50YWdlV2l0aEVhc2luZyldKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgdGljaygpIHtcbiAgICB2YXIgY3VycmVudFRpbWUgPSB0aGlzLl9jbG9jay5jdXJyZW50VGltZSAtIHRoaXMuX3N0YXJ0aW5nVGltZXN0YW1wO1xuICAgIHRoaXMuX2NvbXB1dGVQcm9wZXJ0aWVzKGN1cnJlbnRUaW1lKS5mb3JFYWNoKGVudHJ5ID0+IHRoaXMuX2FwcGx5KGVudHJ5WzBdLCBlbnRyeVsxXSkpO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUaW1lID49IHRoaXMudG90YWxUaW1lKSB7XG4gICAgICB0aGlzLl9vbmZpbmlzaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jbG9jay5yYWYoKCkgPT4gdGhpcy50aWNrKCkpO1xuICAgIH1cblxuICAgIHRoaXMuX2N1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XG4gIH1cblxuICBfY2xlYW51cCgpIHtcbiAgICB0aGlzLl9hbmltYXRvcnMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICB2YXIgcHJvcGVydHkgPSBlbnRyeS5wcm9wZXJ0eTtcbiAgICAgIHRoaXMuX2FwcGx5KHByb3BlcnR5LCB0aGlzLl9pbml0aWFsVmFsdWVzW3Byb3BlcnR5XSk7XG4gICAgfSk7XG4gICAgdGhpcy5faW5pdGlhbFZhbHVlcyA9IG51bGw7XG4gIH1cblxuICBfYXBwbHkocHJvcDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICB9XG59XG4iXX0=