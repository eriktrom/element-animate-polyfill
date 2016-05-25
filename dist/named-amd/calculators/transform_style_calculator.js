enifed('calculators/transform_style_calculator', ['exports', 'util', 'transform_properties'], function (exports, _util, _transform_properties) {
    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var TransformStyleCalculator = (function () {
        function TransformStyleCalculator() {
            _classCallCheck(this, TransformStyleCalculator);
        }

        TransformStyleCalculator.prototype.setKeyframeRange = function setKeyframeRange(startValue, endValue) {
            var fromTransform = new _TransformDetails(startValue.toString());
            var toTransform = new _TransformDetails(endValue.toString());
            this._keyframes = generateKeyframesBetweenTransforms(fromTransform, toTransform);
            this._template = compileTemplateFromTransformProperties(toTransform.properties);
        };

        TransformStyleCalculator.prototype.calculate = function calculate(percentage) {
            for (var i = 0; i < this._keyframes.length; i++) {
                var entry = this._keyframes[i];
                var values = entry.calculateAtPercentage(percentage);
                var startIndex = this._template.getStartIndexForProperty(entry.property);
                for (var j = 0; j < values.length; j++) {
                    this._template.set(startIndex + j + j, values[j]);
                }
            }
            return this._template.eval();
        };

        return TransformStyleCalculator;
    })();

    exports.TransformStyleCalculator = TransformStyleCalculator;

    var _StyleTemplate = (function () {
        function _StyleTemplate(tokens, _tokenLookup) {
            _classCallCheck(this, _StyleTemplate);

            this.tokens = tokens;
            this._tokenLookup = _tokenLookup;
        }

        _StyleTemplate.prototype.set = function set(index, value) {
            this.tokens[index] = value;
        };

        _StyleTemplate.prototype.getStartIndexForProperty = function getStartIndexForProperty(property) {
            return this._tokenLookup[property];
        };

        _StyleTemplate.prototype.eval = function _eval() {
            return this.tokens.join("");
        };

        return _StyleTemplate;
    })();

    var _TransformInputValue = function _TransformInputValue(value, unit) {
        _classCallCheck(this, _TransformInputValue);

        this.value = value;
        this.unit = unit;
    };

    function splitTransformValue(value) {
        return value.split(/\s*,\s*/).map(function (rawValue) {
            return new _TransformInputValue(_util.toInt(rawValue), _util.findDimensionalSuffix(rawValue));
        });
    }

    var _TransformKeyframeValue = (function () {
        function _TransformKeyframeValue(property, from, to) {
            _classCallCheck(this, _TransformKeyframeValue);

            this.property = property;
            this.s1 = 0;
            this.s2 = 0;
            this.s3 = 0;
            this.s4 = 0;
            this.d1 = 0;
            this.d2 = 0;
            this.d3 = 0;
            this.d4 = 0;
            var defaultEntry = _transform_properties.TRANSFORM_PROPERTIES[property];
            var defaultValues = defaultEntry['defaults'];
            var defaultUnits = defaultEntry['units'];
            this.length = defaultValues.length;
            var fromValues = splitTransformValue(from);
            var toValues = splitTransformValue(to);
            var f1 = fromValues[0];
            var t1 = toValues[0];
            this.s1 = f1.value;
            this.d1 = t1.value - f1.value;
            this.units = [defaultUnits[0]];
            var l = fromValues.length;
            if (this.length > 1) {
                var unit = defaultUnits[1];
                if (l > 1) {
                    var f2 = fromValues[1];
                    var t2 = toValues[1];
                    unit = f2.unit;
                    this.s2 = f2.value;
                    this.d2 = t2.value - f2.value;
                } else {
                    this.s2 = defaultValues[1];
                }
                this.units.push(unit);
            }
            if (this.length > 2) {
                var unit = defaultUnits[2];
                if (l > 2) {
                    var f3 = fromValues[2];
                    var t3 = toValues[2];
                    unit = f3.unit;
                    this.s3 = f3.value;
                    this.d3 = t3.value - f3.value;
                } else {
                    this.s3 = defaultValues[2];
                }
                this.units.push(unit);
            }
            if (this.length > 3) {
                var unit = defaultUnits[3];
                if (l > 3) {
                    var f4 = fromValues[3];
                    var t4 = toValues[3];
                    unit = f4.unit;
                    this.s4 = f4.value;
                    this.d4 = t4.value - f4.value;
                } else {
                    this.s4 = defaultValues[3];
                }
                this.units.push(unit);
            }
        }

        // we use look ahead here so that the split
        // operation doesn't include the `\w+(` content
        // as apart of the split delimeter.

        _TransformKeyframeValue.prototype.calculateAtPercentage = function calculateAtPercentage(percentage) {
            var units = this.units;
            var v1 = this.s1 + percentage * this.d1 + units[0];
            var v2 = this.s2 + percentage * this.d2 + units[1];
            var v3 = this.s3 + percentage * this.d3 + units[2];
            var v4 = this.s4 + percentage * this.d4 + units[3];
            var result = [v1, v2, v3, v4];
            result.length = this.length;
            return result;
        };

        return _TransformKeyframeValue;
    })();

    var TRANSFORM_SPLIT_REGEX = new RegExp('\\s+' + '(?=\\w+\\()' // that are followed by a keyword containing a opening paren(
    );

    var _TransformDetails = function _TransformDetails(style) {
        var _this = this;

        _classCallCheck(this, _TransformDetails);

        this.style = style;
        this.values = {};
        this.properties = [];
        style.split(TRANSFORM_SPLIT_REGEX).forEach(function (token) {
            var parenOpen = token.indexOf('(');
            var parenClose = token.lastIndexOf(')');
            var lhs = token.substring(0, parenOpen);
            var rhs = token.substring(parenOpen + 1, parenClose);
            _this.values[lhs] = rhs;
            _this.properties.push(lhs);
        });
    };

    function compileTemplateFromTransformProperties(properties) {
        var tokens = [];
        var tokenLookup = {};
        properties.forEach(function (prop) {
            var entry = _transform_properties.TRANSFORM_PROPERTIES[prop]['defaults'];
            tokens.push(prop);
            tokens.push("(");
            tokenLookup[prop] = tokens.length;
            for (var i = 0; i < entry.length; i++) {
                if (i > 0) {
                    tokens.push(",");
                }
                tokens.push(true);
            }
            tokens.push(")");
            tokens.push(" ");
        });
        return new _StyleTemplate(tokens, tokenLookup);
    }
    function concatValuesAndUnits(values, units) {
        var combined = [];
        for (var i = 0; i < values.length; i++) {
            combined.push(values[i] + units[i]);
        }
        return combined.join(',');
    }
    function generateKeyframesBetweenTransforms(a, b) {
        var usedProperties = {};
        var from = {};
        var to = {};
        a.properties.forEach(function (prop) {
            usedProperties[prop] = 1;
            from[prop] = a.values[prop];
        });
        b.properties.forEach(function (prop) {
            var val = usedProperties[prop];
            usedProperties[prop] = val == 1 ? 0 : -1;
            to[prop] = b.values[prop];
        });
        var keyframes = [];
        _util.forEach(usedProperties, function (status, prop) {
            var defaultValue = _transform_properties.TRANSFORM_PROPERTIES[prop];
            if (status == 1) {
                to[prop] = concatValuesAndUnits(defaultValue.defaults, defaultValue.units);
            } else if (status == -1) {
                from[prop] = concatValuesAndUnits(defaultValue.defaults, defaultValue.units);
            }
            keyframes.push(new _TransformKeyframeValue(prop, from[prop], to[prop]));
        });
        return keyframes;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0b3JzL3RyYW5zZm9ybV9zdHlsZV9jYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBSUEsd0JBQUE7aUJBQUEsd0JBQUE7a0NBQUEsd0JBQUE7OztBQUFBLGdDQUFBLFdBSUUsZ0JBQWdCLEdBQUEsMEJBQUMsVUFBeUIsRUFBRSxRQUF1QixFQUFBO0FBQ2pFLGdCQUFJLGFBQWEsR0FBRyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ2pFLGdCQUFJLFdBQVcsR0FBRyxJQUFJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQzdELGdCQUFJLENBQUMsVUFBVSxHQUFHLGtDQUFrQyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNqRixnQkFBSSxDQUFDLFNBQVMsR0FBRyxzQ0FBc0MsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDakY7O0FBVEgsZ0NBQUEsV0FXRSxTQUFTLEdBQUEsbUJBQUMsVUFBa0IsRUFBQTtBQUMxQixpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQy9DLG9CQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CLG9CQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDckQsb0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pFLHFCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0Qyx3QkFBSSxDQUFDLFNBQVMsQ0FB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RSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0IsQ0FBQyxDQUFDO0FBRUgsWUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ25CLGNBOU1hLE9BQU8sQ0E4TVosY0FBYyxFQUFFLFVBQUMsTUFBTSxFQUFFLElBQUksRUFBQTtBQUNuQyxnQkFBSSxZQUFZLEdBQUcsc0JBOU1mLG9CQUFvQixDQThNZ0IsSUFBSSxDQUFDLENBQUM7QUFDOUMsZ0JBQUksTUFBTSxJQUFJLENBQUMsRUFBRTtBQUNmLGtCQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUUsTUFBTSxJQUFJLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRTtBQUN2QixvQkFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlFO0FBQ0QscUJBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekUsQ0FBQyxDQUFDO0FBRUgsZUFBTyxTQUFTLENBQUM7S0FDbEIiLCJmaWxlIjoidHJhbnNmb3JtX3N0eWxlX2NhbGN1bGF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0eWxlQ2FsY3VsYXRvcn0gZnJvbSAnLi4vc3R5bGVfY2FsY3VsYXRvcic7XG5pbXBvcnQge3RvSW50LCBmb3JFYWNoLCBmaW5kRGltZW5zaW9uYWxTdWZmaXh9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtUUkFOU0ZPUk1fUFJPUEVSVElFUywgTk9fVU5JVCwgUFhfVU5JVCwgREVHUkVFU19VTklUfSBmcm9tICcuLi90cmFuc2Zvcm1fcHJvcGVydGllcyc7XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm1TdHlsZUNhbGN1bGF0b3IgaW1wbGVtZW50cyBTdHlsZUNhbGN1bGF0b3Ige1xuICBwcml2YXRlIF9rZXlmcmFtZXM6IF9UcmFuc2Zvcm1LZXlmcmFtZVZhbHVlW107XG4gIHByaXZhdGUgX3RlbXBsYXRlOiBfU3R5bGVUZW1wbGF0ZTtcblxuICBzZXRLZXlmcmFtZVJhbmdlKHN0YXJ0VmFsdWU6IG51bWJlcnxzdHJpbmcsIGVuZFZhbHVlOiBudW1iZXJ8c3RyaW5nKTogdm9pZCB7XG4gICAgdmFyIGZyb21UcmFuc2Zvcm0gPSBuZXcgX1RyYW5zZm9ybURldGFpbHMoc3RhcnRWYWx1ZS50b1N0cmluZygpKTtcbiAgICB2YXIgdG9UcmFuc2Zvcm0gPSBuZXcgX1RyYW5zZm9ybURldGFpbHMoZW5kVmFsdWUudG9TdHJpbmcoKSk7XG4gICAgdGhpcy5fa2V5ZnJhbWVzID0gZ2VuZXJhdGVLZXlmcmFtZXNCZXR3ZWVuVHJhbnNmb3Jtcyhmcm9tVHJhbnNmb3JtLCB0b1RyYW5zZm9ybSk7XG4gICAgdGhpcy5fdGVtcGxhdGUgPSBjb21waWxlVGVtcGxhdGVGcm9tVHJhbnNmb3JtUHJvcGVydGllcyh0b1RyYW5zZm9ybS5wcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZShwZXJjZW50YWdlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fa2V5ZnJhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZW50cnkgPSB0aGlzLl9rZXlmcmFtZXNbaV07XG4gICAgICBsZXQgdmFsdWVzID0gZW50cnkuY2FsY3VsYXRlQXRQZXJjZW50YWdlKHBlcmNlbnRhZ2UpO1xuICAgICAgdmFyIHN0YXJ0SW5kZXggPSB0aGlzLl90ZW1wbGF0ZS5nZXRTdGFydEluZGV4Rm9yUHJvcGVydHkoZW50cnkucHJvcGVydHkpO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWx1ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdGhpcy5fdGVtcGxhdGUuc2V0KHN0YXJ0SW5kZXggKyBqICsgaiwgdmFsdWVzW2pdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlLmV2YWwoKTtcbiAgfVxufVxuXG5jbGFzcyBfU3R5bGVUZW1wbGF0ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9rZW5zOiBBcnJheTxzdHJpbmd8bnVtYmVyPiwgcHJpdmF0ZSBfdG9rZW5Mb29rdXA6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9KSB7fVxuXG4gIHNldChpbmRleDogbnVtYmVyLCB2YWx1ZTogc3RyaW5nfG51bWJlcikge1xuICAgIHRoaXMudG9rZW5zW2luZGV4XSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0U3RhcnRJbmRleEZvclByb3BlcnR5KHByb3BlcnR5OiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b2tlbkxvb2t1cFtwcm9wZXJ0eV07IFxuICB9XG5cbiAgZXZhbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRva2Vucy5qb2luKFwiXCIpO1xuICB9XG59XG5cbmNsYXNzIF9UcmFuc2Zvcm1JbnB1dFZhbHVlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIsIHB1YmxpYyB1bml0OiBzdHJpbmcpIHt9XG59XG5cbmZ1bmN0aW9uIHNwbGl0VHJhbnNmb3JtVmFsdWUodmFsdWU6IHN0cmluZyk6IF9UcmFuc2Zvcm1JbnB1dFZhbHVlW10ge1xuICByZXR1cm4gdmFsdWUuc3BsaXQoL1xccyosXFxzKi8pLm1hcChyYXdWYWx1ZSA9PiB7XG4gICAgcmV0dXJuIG5ldyBfVHJhbnNmb3JtSW5wdXRWYWx1ZSh0b0ludChyYXdWYWx1ZSksIGZpbmREaW1lbnNpb25hbFN1ZmZpeChyYXdWYWx1ZSkpO1xuICB9KTtcbn1cblxuY2xhc3MgX1RyYW5zZm9ybUtleWZyYW1lVmFsdWUge1xuICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XG4gIHB1YmxpYyB1bml0czogc3RyaW5nW107XG4gIHB1YmxpYyBzMTogbnVtYmVyID0gMDtcbiAgcHVibGljIHMyOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgczM6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBzNDogbnVtYmVyID0gMDtcbiAgcHVibGljIGQxOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgZDI6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBkMzogbnVtYmVyID0gMDtcbiAgcHVibGljIGQ0OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wZXJ0eTogc3RyaW5nLCBmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpIHtcbiAgICB2YXIgZGVmYXVsdEVudHJ5ID0gVFJBTlNGT1JNX1BST1BFUlRJRVNbcHJvcGVydHldO1xuICAgIHZhciBkZWZhdWx0VmFsdWVzID0gZGVmYXVsdEVudHJ5WydkZWZhdWx0cyddO1xuICAgIHZhciBkZWZhdWx0VW5pdHMgPSBkZWZhdWx0RW50cnlbJ3VuaXRzJ107XG4gICAgdGhpcy5sZW5ndGggPSBkZWZhdWx0VmFsdWVzLmxlbmd0aDtcblxuICAgIHZhciBmcm9tVmFsdWVzID0gc3BsaXRUcmFuc2Zvcm1WYWx1ZShmcm9tKTtcbiAgICB2YXIgdG9WYWx1ZXMgPSBzcGxpdFRyYW5zZm9ybVZhbHVlKHRvKTtcblxuICAgIHZhciBmMSA9IGZyb21WYWx1ZXNbMF07XG4gICAgdmFyIHQxID0gdG9WYWx1ZXNbMF07XG4gICAgdGhpcy5zMSA9IGYxLnZhbHVlO1xuICAgIHRoaXMuZDEgPSB0MS52YWx1ZSAtIGYxLnZhbHVlO1xuICAgIHRoaXMudW5pdHMgPSBbZGVmYXVsdFVuaXRzWzBdXTtcblxuICAgIHZhciBsID0gZnJvbVZhbHVlcy5sZW5ndGg7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMSkge1xuICAgICAgbGV0IHVuaXQgPSBkZWZhdWx0VW5pdHNbMV07XG4gICAgICBpZiAobCA+IDEpIHtcbiAgICAgICAgbGV0IGYyID0gZnJvbVZhbHVlc1sxXTtcbiAgICAgICAgbGV0IHQyID0gdG9WYWx1ZXNbMV07XG4gICAgICAgIHVuaXQgPSBmMi51bml0O1xuICAgICAgICB0aGlzLnMyID0gZjIudmFsdWU7XG4gICAgICAgIHRoaXMuZDIgPSB0Mi52YWx1ZSAtIGYyLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zMiA9IGRlZmF1bHRWYWx1ZXNbMV07XG4gICAgICB9XG4gICAgICB0aGlzLnVuaXRzLnB1c2godW5pdCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMikge1xuICAgICAgbGV0IHVuaXQgPSBkZWZhdWx0VW5pdHNbMl07XG4gICAgICBpZiAobCA+IDIpIHtcbiAgICAgICAgbGV0IGYzID0gZnJvbVZhbHVlc1syXTtcbiAgICAgICAgbGV0IHQzID0gdG9WYWx1ZXNbMl07XG4gICAgICAgIHVuaXQgPSBmMy51bml0O1xuICAgICAgICB0aGlzLnMzID0gZjMudmFsdWU7XG4gICAgICAgIHRoaXMuZDMgPSB0My52YWx1ZSAtIGYzLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zMyA9IGRlZmF1bHRWYWx1ZXNbMl07XG4gICAgICB9XG4gICAgICB0aGlzLnVuaXRzLnB1c2godW5pdCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMykge1xuICAgICAgbGV0IHVuaXQgPSBkZWZhdWx0VW5pdHNbM107XG4gICAgICBpZiAobCA+IDMpIHtcbiAgICAgICAgbGV0IGY0ID0gZnJvbVZhbHVlc1szXTtcbiAgICAgICAgbGV0IHQ0ID0gdG9WYWx1ZXNbM107XG4gICAgICAgIHVuaXQgPSBmNC51bml0O1xuICAgICAgICB0aGlzLnM0ID0gZjQudmFsdWU7XG4gICAgICAgIHRoaXMuZDQgPSB0NC52YWx1ZSAtIGY0LnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zNCA9IGRlZmF1bHRWYWx1ZXNbM107XG4gICAgICB9XG4gICAgICB0aGlzLnVuaXRzLnB1c2godW5pdCk7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlQXRQZXJjZW50YWdlKHBlcmNlbnRhZ2U6IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgICB2YXIgdW5pdHMgPSB0aGlzLnVuaXRzO1xuICAgIHZhciB2MSA9IHRoaXMuczEgKyBwZXJjZW50YWdlICogdGhpcy5kMSArIHVuaXRzWzBdO1xuICAgIHZhciB2MiA9IHRoaXMuczIgKyBwZXJjZW50YWdlICogdGhpcy5kMiArIHVuaXRzWzFdO1xuICAgIHZhciB2MyA9IHRoaXMuczMgKyBwZXJjZW50YWdlICogdGhpcy5kMyArIHVuaXRzWzJdO1xuICAgIHZhciB2NCA9IHRoaXMuczQgKyBwZXJjZW50YWdlICogdGhpcy5kNCArIHVuaXRzWzNdO1xuICAgIHZhciByZXN1bHQgPSBbdjEsdjIsdjMsdjRdO1xuICAgIHJlc3VsdC5sZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbi8vIHdlIHVzZSBsb29rIGFoZWFkIGhlcmUgc28gdGhhdCB0aGUgc3BsaXRcbi8vIG9wZXJhdGlvbiBkb2Vzbid0IGluY2x1ZGUgdGhlIGBcXHcrKGAgY29udGVudFxuLy8gYXMgYXBhcnQgb2YgdGhlIHNwbGl0IGRlbGltZXRlci5cbnZhciBUUkFOU0ZPUk1fU1BMSVRfUkVHRVggPSBuZXcgUmVnRXhwKFxuICAnXFxcXHMrJyArIC8vIGxvb2sgZm9yIHNwYWNlcy4uLlxuICAnKD89XFxcXHcrXFxcXCgpJyAvLyB0aGF0IGFyZSBmb2xsb3dlZCBieSBhIGtleXdvcmQgY29udGFpbmluZyBhIG9wZW5pbmcgcGFyZW4oXG4pO1xuXG5jbGFzcyBfVHJhbnNmb3JtRGV0YWlscyB7XG4gIHB1YmxpYyB2YWx1ZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd8bnVtYmVyfSA9IHt9O1xuICBwdWJsaWMgcHJvcGVydGllczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3R5bGU6IHN0cmluZykge1xuICAgIHN0eWxlLnNwbGl0KFRSQU5TRk9STV9TUExJVF9SRUdFWCkuZm9yRWFjaCh0b2tlbiA9PiB7XG4gICAgICB2YXIgcGFyZW5PcGVuID0gdG9rZW4uaW5kZXhPZignKCcpO1xuICAgICAgdmFyIHBhcmVuQ2xvc2UgPSB0b2tlbi5sYXN0SW5kZXhPZignKScpO1xuICAgICAgdmFyIGxocyA9IHRva2VuLnN1YnN0cmluZygwLCBwYXJlbk9wZW4pO1xuICAgICAgdmFyIHJocyA9IHRva2VuLnN1YnN0cmluZyhwYXJlbk9wZW4gKyAxLCBwYXJlbkNsb3NlKTtcbiAgICAgIHRoaXMudmFsdWVzW2xoc10gPSByaHM7XG4gICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChsaHMpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVUZW1wbGF0ZUZyb21UcmFuc2Zvcm1Qcm9wZXJ0aWVzKHByb3BlcnRpZXM6IHN0cmluZ1tdKTogX1N0eWxlVGVtcGxhdGUge1xuICB2YXIgdG9rZW5zID0gW107XG4gIHZhciB0b2tlbkxvb2t1cDoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSB7fTtcbiAgcHJvcGVydGllcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgIHZhciBlbnRyeSA9IFRSQU5TRk9STV9QUk9QRVJUSUVTW3Byb3BdWydkZWZhdWx0cyddO1xuICAgIHRva2Vucy5wdXNoKHByb3ApO1xuICAgIHRva2Vucy5wdXNoKFwiKFwiKTtcbiAgICB0b2tlbkxvb2t1cFtwcm9wXSA9IHRva2Vucy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyeS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKFwiLFwiKTtcbiAgICAgIH1cbiAgICAgIHRva2Vucy5wdXNoKHRydWUpO1xuICAgIH1cbiAgICB0b2tlbnMucHVzaChcIilcIik7XG4gICAgdG9rZW5zLnB1c2goXCIgXCIpO1xuICB9KTtcbiAgcmV0dXJuIG5ldyBfU3R5bGVUZW1wbGF0ZSh0b2tlbnMsIHRva2VuTG9va3VwKTtcbn1cblxuZnVuY3Rpb24gY29uY2F0VmFsdWVzQW5kVW5pdHModmFsdWVzLCB1bml0cyk6IHN0cmluZyB7XG4gIHZhciBjb21iaW5lZCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbWJpbmVkLnB1c2godmFsdWVzW2ldICsgdW5pdHNbaV0pO1xuICB9XG4gIHJldHVybiBjb21iaW5lZC5qb2luKCcsJyk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlS2V5ZnJhbWVzQmV0d2VlblRyYW5zZm9ybXMoYTogX1RyYW5zZm9ybURldGFpbHMsIGI6IF9UcmFuc2Zvcm1EZXRhaWxzKTogX1RyYW5zZm9ybUtleWZyYW1lVmFsdWVbXSB7XG4gIHZhciB1c2VkUHJvcGVydGllcyA9IHt9O1xuXG4gIHZhciBmcm9tID0ge307XG4gIHZhciB0byA9IHt9O1xuXG4gIGEucHJvcGVydGllcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgIHVzZWRQcm9wZXJ0aWVzW3Byb3BdID0gMTtcbiAgICBmcm9tW3Byb3BdID0gYS52YWx1ZXNbcHJvcF07XG4gIH0pO1xuXG4gIGIucHJvcGVydGllcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgIHZhciB2YWwgPSB1c2VkUHJvcGVydGllc1twcm9wXTtcbiAgICB1c2VkUHJvcGVydGllc1twcm9wXSA9IHZhbCA9PSAxID8gMCA6IC0xO1xuICAgIHRvW3Byb3BdID0gYi52YWx1ZXNbcHJvcF07XG4gIH0pO1xuXG4gIHZhciBrZXlmcmFtZXMgPSBbXTtcbiAgZm9yRWFjaCh1c2VkUHJvcGVydGllcywgKHN0YXR1cywgcHJvcCkgPT4ge1xuICAgIGxldCBkZWZhdWx0VmFsdWUgPSBUUkFOU0ZPUk1fUFJPUEVSVElFU1twcm9wXTtcbiAgICBpZiAoc3RhdHVzID09IDEpIHtcbiAgICAgIHRvW3Byb3BdID0gY29uY2F0VmFsdWVzQW5kVW5pdHMoZGVmYXVsdFZhbHVlLmRlZmF1bHRzLCBkZWZhdWx0VmFsdWUudW5pdHMpO1xuICAgIH0gZWxzZSBpZiAoc3RhdHVzID09IC0xKSB7XG4gICAgICBmcm9tW3Byb3BdID0gY29uY2F0VmFsdWVzQW5kVW5pdHMoZGVmYXVsdFZhbHVlLmRlZmF1bHRzLCBkZWZhdWx0VmFsdWUudW5pdHMpO1xuICAgIH1cbiAgICBrZXlmcmFtZXMucHVzaChuZXcgX1RyYW5zZm9ybUtleWZyYW1lVmFsdWUocHJvcCwgZnJvbVtwcm9wXSwgdG9bcHJvcF0pKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGtleWZyYW1lcztcbn1cbiJdfQ==