/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var animation_1 = __webpack_require__(1);
	var browser_styles_1 = __webpack_require__(15);
	var browser_clock_1 = __webpack_require__(14);
	var ElementAnimatePolyfill = (function () {
	    function ElementAnimatePolyfill() {
	    }
	    ElementAnimatePolyfill.prototype.animate = function (element, keyframes, options, clock, styles) {
	        if (clock === void 0) { clock = null; }
	        if (styles === void 0) { styles = null; }
	        return new animation_1.Animation(keyframes, options, clock, styles).create(element);
	    };
	    return ElementAnimatePolyfill;
	}());
	exports.ElementAnimatePolyfill = ElementAnimatePolyfill;
	var polyfill = new ElementAnimatePolyfill();
	var globalClock = new browser_clock_1.BrowserClock();
	var globalStyles = new browser_styles_1.BrowserStyles();
	var elementAnimateFn = window['$$elementAnimateFn'] = function (element, keyframes, options) {
	    var player = polyfill.animate(element, keyframes, options, globalClock, globalStyles);
	    player.play();
	    return player;
	};
	if (!Element.prototype['animate']) {
	    Element.prototype['animate'] = function (keyframes, options) {
	        elementAnimateFn(this, keyframes, options);
	    };
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var player_1 = __webpack_require__(2);
	var util_1 = __webpack_require__(6);
	var browser_clock_ts_1 = __webpack_require__(14);
	var browser_styles_1 = __webpack_require__(15);
	var Animation = (function () {
	    function Animation(keyframes, options, clock, styles) {
	        if (clock === void 0) { clock = null; }
	        if (styles === void 0) { styles = null; }
	        this.keyframes = keyframes;
	        if (util_1.isNumber(options)) {
	            options = { duration: options };
	        }
	        this.options = new player_1.PlayerOptions(options);
	        this._clock = clock || new browser_clock_ts_1.BrowserClock();
	        this._styles = styles || new browser_styles_1.BrowserStyles();
	    }
	    Animation.prototype.create = function (element) {
	        return new player_1.Player(element, this.keyframes, this.options, this._clock, this._styles);
	    };
	    Animation.prototype.start = function (element) {
	        var player = this.create(element);
	        player.play();
	        return player;
	    };
	    return Animation;
	}());
	exports.Animation = Animation;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var dimensional_properties_1 = __webpack_require__(3);
	var numerical_properties_1 = __webpack_require__(4);
	var color_properties_1 = __webpack_require__(5);
	var util_1 = __webpack_require__(6);
	var dimensional_style_calculator_1 = __webpack_require__(7);
	var numerical_style_calculator_1 = __webpack_require__(8);
	var transform_style_calculator_1 = __webpack_require__(9);
	var color_style_calculator_1 = __webpack_require__(11);
	var easing_1 = __webpack_require__(12);
	var AnimationPropertyEntry = (function () {
	    function AnimationPropertyEntry(property, calculator) {
	        this.property = property;
	        this.calculator = calculator;
	    }
	    return AnimationPropertyEntry;
	}());
	exports.AnimationPropertyEntry = AnimationPropertyEntry;
	var PlayerOptions = (function () {
	    function PlayerOptions(_a) {
	        var duration = _a.duration, delay = _a.delay, easing = _a.easing, fill = _a.fill;
	        this.duration = util_1.toInt(duration);
	        this.delay = util_1.isPresent(delay) ? util_1.toInt(delay) : 0;
	        this.easing = util_1.isPresent(easing) ? easing : 'linear';
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
	    }
	    return PlayerOptions;
	}());
	exports.PlayerOptions = PlayerOptions;
	function createCalculator(prop, values) {
	    var calc;
	    if (dimensional_properties_1.DIMENSIONAL_PROPERTIES.indexOf(prop) >= 0) {
	        calc = new dimensional_style_calculator_1.DimensionalStyleCalculator();
	    }
	    else if (numerical_properties_1.NUMERICAL_PROPERTIES.indexOf(prop) >= 0) {
	        calc = new numerical_style_calculator_1.NumericalStyleCalculator();
	    }
	    else if (prop == 'transform') {
	        calc = new transform_style_calculator_1.TransformStyleCalculator();
	    }
	    else if (color_properties_1.COLOR_PROPERTIES.indexOf(prop) >= 0) {
	        calc = new color_style_calculator_1.ColorStyleCalculator();
	    }
	    else {
	        throw new Error('Only dimensional properties can be animated now');
	    }
	    calc.setKeyframeRange(values[0], values[1]);
	    return calc;
	}
	var Player = (function () {
	    function Player(_element, keyframes, _options, _clock, _styles) {
	        var _this = this;
	        this._element = _element;
	        this._options = _options;
	        this._clock = _clock;
	        this._styles = _styles;
	        this._currentTime = 0;
	        this._startingTimestamp = 0;
	        this.onfinish = function () { };
	        var properties = {};
	        var firstKeyframe = keyframes[0];
	        util_1.forEach(firstKeyframe, function (value, prop) {
	            properties[prop] = [value];
	        });
	        var secondKeyframe = keyframes[1];
	        util_1.forEach(secondKeyframe, function (value, prop) {
	            properties[prop].push(value);
	        });
	        this._animators = [];
	        util_1.forEach(properties, function (values, prop) {
	            var calculator = createCalculator(prop, values);
	            _this._animators.push(new AnimationPropertyEntry(prop, calculator));
	        });
	        this._easingEquation = easing_1.resolveEasingEquation(_options.easing);
	    }
	    Object.defineProperty(Player.prototype, "totalTime", {
	        get: function () {
	            return this._options.duration;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Player.prototype, "currentTime", {
	        get: function () {
	            return this._currentTime;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Player.prototype.play = function () {
	        var _this = this;
	        if (this.playing)
	            return;
	        this._initialValues = {};
	        this._animators.forEach(function (entry) {
	            var prop = entry.property;
	            _this._initialValues[prop] = _this._styles.readStyle(_this._element, prop);
	        });
	        this.playing = true;
	        this._startingTimestamp = this._clock.now();
	        this.tick();
	    };
	    Player.prototype._onfinish = function () {
	        var fill = this._options.fill;
	        if (fill == 'none' || fill == 'backwards') {
	            this._cleanup();
	        }
	        this.onfinish();
	    };
	    Player.prototype._oncancel = function () {
	        this._cleanup();
	    };
	    Player.prototype._ease = function (percentage) {
	        return this._easingEquation(percentage);
	    };
	    Player.prototype._computeProperties = function (currentTime) {
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
	    Player.prototype.tick = function () {
	        var _this = this;
	        var currentTime = this._clock.currentTime - this._startingTimestamp;
	        this._computeProperties(currentTime).forEach(function (entry) { return _this._apply(entry[0], entry[1]); });
	        if (this._currentTime >= this.totalTime) {
	            this._onfinish();
	        }
	        else {
	            this._clock.raf(function () { return _this.tick(); });
	        }
	        this._currentTime = currentTime;
	    };
	    Player.prototype._cleanup = function () {
	        var _this = this;
	        this._animators.forEach(function (entry) {
	            var property = entry.property;
	            _this._apply(property, _this._initialValues[property]);
	        });
	        this._initialValues = null;
	    };
	    Player.prototype._apply = function (prop, value) {
	        this._element.style[prop] = value;
	    };
	    return Player;
	}());
	exports.Player = Player;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	exports.DIMENSIONAL_PROPERTIES = [
	    'width',
	    'height',
	    'min-width',
	    'min-height',
	    'max-width',
	    'max-height',
	    'left',
	    'top',
	    'bottom',
	    'right',
	    'font-size',
	    'outline-width',
	    'outline-offset',
	    'padding-top',
	    'padding-left',
	    'padding-bottom',
	    'padding-right',
	    'margin-top',
	    'margin-left',
	    'margin-bottom',
	    'margin-right',
	    'border-radius',
	    'border-width',
	    'border-top-width',
	    'border-left-width',
	    'border-right-width',
	    'border-bottom-width',
	    'text-indent'
	];


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	exports.NUMERICAL_PROPERTIES = [
	    'z-index',
	    'opacity'
	];


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	exports.COLOR_PROPERTIES = [
	    'background',
	    'backgroundColor',
	    'borderBottomColor',
	    'borderLeftColor',
	    'borderRightColor',
	    'borderTopColor',
	    'color',
	    'outlineColor'
	];


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	function isNumber(value) {
	    return typeof value == 'number';
	}
	exports.isNumber = isNumber;
	function toInt(value) {
	    return (parseInt(value.toString(), 10));
	}
	exports.toInt = toInt;
	function toFloat(value) {
	    return (parseFloat(value.toString()));
	}
	exports.toFloat = toFloat;
	function isPresent(value) {
	    return value != null;
	}
	exports.isPresent = isPresent;
	function roundDecimal(value, totalDigits) {
	    if (totalDigits === void 0) { totalDigits = 2; }
	    var base = 1;
	    for (var i = 0; i < totalDigits; i++)
	        base *= 10;
	    return Math.round(value * base) / base;
	}
	exports.roundDecimal = roundDecimal;
	function isArray(value) {
	    return Array.isArray(value);
	}
	exports.isArray = isArray;
	function isStringMap(obj) {
	    return typeof obj === 'object' && obj !== null;
	}
	exports.isStringMap = isStringMap;
	function forEach(collection, fn) {
	    if (isArray(collection)) {
	        collection.forEach(function (value, index) { return fn(value, index); });
	    }
	    else if (isStringMap(collection)) {
	        for (var key in collection) {
	            var value = collection[key];
	            fn(value, key);
	        }
	    }
	    else {
	        throw new Error('invalid value passed into forEach');
	    }
	}
	exports.forEach = forEach;
	function toJson(value) {
	    return JSON.stringify(value);
	}
	exports.toJson = toJson;
	var _$0 = 48;
	var _$9 = 57;
	var _$PERIOD = 46;
	function findDimensionalSuffix(value) {
	    for (var i = 0; i < value.length; i++) {
	        var c = value.charCodeAt(i);
	        if ((c >= _$0 && c <= _$9) || c == _$PERIOD)
	            continue;
	        return value.substring(i, value.length);
	    }
	    return '';
	}
	exports.findDimensionalSuffix = findDimensionalSuffix;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(6);
	var DEFAULT_UNIT = 'px';
	var DimensionalStyleCalculator = (function () {
	    function DimensionalStyleCalculator() {
	    }
	    DimensionalStyleCalculator.prototype.setKeyframeRange = function (startValue, endValue) {
	        var unitA = util_1.findDimensionalSuffix(startValue) || DEFAULT_UNIT;
	        var unitB = util_1.findDimensionalSuffix(endValue) || DEFAULT_UNIT;
	        if (unitA != unitB) {
	            throw new Error("Animations containing the same unit can only be animated (the unit for " + startValue + " != " + endValue);
	        }
	        this._unit = unitA;
	        this._startValue = util_1.toInt(startValue);
	        this._endValue = util_1.toInt(endValue);
	        this._rangeDiff = this._endValue - this._startValue;
	    };
	    DimensionalStyleCalculator.prototype.calculate = function (percentage) {
	        return this._rangeDiff * percentage + this._startValue + this._unit;
	    };
	    return DimensionalStyleCalculator;
	}());
	exports.DimensionalStyleCalculator = DimensionalStyleCalculator;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(6);
	var NumericalStyleCalculator = (function () {
	    function NumericalStyleCalculator() {
	    }
	    NumericalStyleCalculator.prototype.setKeyframeRange = function (startValue, endValue) {
	        this._startValue = util_1.toInt(startValue);
	        this._endValue = util_1.toInt(endValue);
	        this._rangeDiff = this._endValue - this._startValue;
	    };
	    NumericalStyleCalculator.prototype.calculate = function (percentage) {
	        return (this._rangeDiff * percentage + this._startValue).toString();
	    };
	    return NumericalStyleCalculator;
	}());
	exports.NumericalStyleCalculator = NumericalStyleCalculator;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(6);
	var transform_properties_1 = __webpack_require__(10);
	var TransformStyleCalculator = (function () {
	    function TransformStyleCalculator() {
	    }
	    TransformStyleCalculator.prototype.setKeyframeRange = function (startValue, endValue) {
	        var fromTransform = new _TransformDetails(startValue.toString());
	        var toTransform = new _TransformDetails(endValue.toString());
	        this._keyframes = generateKeyframesBetweenTransforms(fromTransform, toTransform);
	        this._template = compileTemplateFromTransformProperties(toTransform.properties);
	    };
	    TransformStyleCalculator.prototype.calculate = function (percentage) {
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
	}());
	exports.TransformStyleCalculator = TransformStyleCalculator;
	var _StyleTemplate = (function () {
	    function _StyleTemplate(tokens, _tokenLookup) {
	        this.tokens = tokens;
	        this._tokenLookup = _tokenLookup;
	    }
	    _StyleTemplate.prototype.set = function (index, value) {
	        this.tokens[index] = value;
	    };
	    _StyleTemplate.prototype.getStartIndexForProperty = function (property) {
	        return this._tokenLookup[property];
	    };
	    _StyleTemplate.prototype.eval = function () {
	        return this.tokens.join("");
	    };
	    return _StyleTemplate;
	}());
	var _TransformInputValue = (function () {
	    function _TransformInputValue(value, unit) {
	        this.value = value;
	        this.unit = unit;
	    }
	    return _TransformInputValue;
	}());
	function splitTransformValue(value) {
	    return value.split(/\s*,\s*/).map(function (rawValue) {
	        return new _TransformInputValue(util_1.toInt(rawValue), util_1.findDimensionalSuffix(rawValue));
	    });
	}
	var _TransformKeyframeValue = (function () {
	    function _TransformKeyframeValue(property, from, to) {
	        this.property = property;
	        this.s1 = 0;
	        this.s2 = 0;
	        this.s3 = 0;
	        this.s4 = 0;
	        this.d1 = 0;
	        this.d2 = 0;
	        this.d3 = 0;
	        this.d4 = 0;
	        var defaultEntry = transform_properties_1.TRANSFORM_PROPERTIES[property];
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
	            }
	            else {
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
	            }
	            else {
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
	            }
	            else {
	                this.s4 = defaultValues[3];
	            }
	            this.units.push(unit);
	        }
	    }
	    _TransformKeyframeValue.prototype.calculateAtPercentage = function (percentage) {
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
	}());
	// we use look ahead here so that the split
	// operation doesn't include the `\w+(` content
	// as apart of the split delimeter.
	var TRANSFORM_SPLIT_REGEX = new RegExp('\\s+' +
	    '(?=\\w+\\()' // that are followed by a keyword containing a opening paren(
	);
	var _TransformDetails = (function () {
	    function _TransformDetails(style) {
	        var _this = this;
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
	    }
	    return _TransformDetails;
	}());
	function compileTemplateFromTransformProperties(properties) {
	    var tokens = [];
	    var tokenLookup = {};
	    properties.forEach(function (prop) {
	        var entry = transform_properties_1.TRANSFORM_PROPERTIES[prop]['defaults'];
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
	    util_1.forEach(usedProperties, function (status, prop) {
	        var defaultValue = transform_properties_1.TRANSFORM_PROPERTIES[prop];
	        if (status == 1) {
	            to[prop] = concatValuesAndUnits(defaultValue.defaults, defaultValue.units);
	        }
	        else if (status == -1) {
	            from[prop] = concatValuesAndUnits(defaultValue.defaults, defaultValue.units);
	        }
	        keyframes.push(new _TransformKeyframeValue(prop, from[prop], to[prop]));
	    });
	    return keyframes;
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	exports.NO_UNIT = '';
	exports.DEGREES_UNIT = 'deg';
	exports.PX_UNIT = 'px';
	exports.TRANSFORM_PROPERTIES = {
	    'translate': {
	        'defaults': [0, 0],
	        'units': [exports.PX_UNIT, exports.PX_UNIT]
	    },
	    'translate3d': {
	        'defaults': [0, 0, 0],
	        'units': [exports.PX_UNIT, exports.PX_UNIT, exports.PX_UNIT]
	    },
	    'translateX': {
	        'defaults': [0],
	        'units': [exports.PX_UNIT]
	    },
	    'translateY': {
	        'defaults': [0],
	        'units': [exports.PX_UNIT]
	    },
	    'translateZ': {
	        'defaults': [0],
	        'units': [exports.PX_UNIT]
	    },
	    'scale': {
	        'defaults': [1, 1],
	        'units': [exports.NO_UNIT, exports.NO_UNIT]
	    },
	    'scale3d': {
	        'defaults': [1, 1, 0],
	        'units': [exports.NO_UNIT, exports.NO_UNIT, exports.NO_UNIT]
	    },
	    'scaleX': {
	        'defaults': [1],
	        'units': [exports.NO_UNIT]
	    },
	    'scaleY': {
	        'defaults': [1],
	        'units': [exports.NO_UNIT]
	    },
	    'scaleZ': {
	        'defaults': [0],
	        'units': [exports.NO_UNIT]
	    },
	    'rotate': {
	        'defaults': [0],
	        'units': [exports.DEGREES_UNIT]
	    },
	    'rotate3d': {
	        'defaults': [0, 0, 0, 0],
	        'units': [exports.NO_UNIT, exports.NO_UNIT, exports.NO_UNIT, exports.DEGREES_UNIT]
	    },
	    'rotateX': {
	        'defaults': [0],
	        'units': [exports.DEGREES_UNIT]
	    },
	    'rotateY': {
	        'defaults': [0],
	        'units': [exports.DEGREES_UNIT]
	    },
	    'rotateZ': {
	        'defaults': [0],
	        'units': [exports.DEGREES_UNIT]
	    },
	    'skew': {
	        'defaults': [0, 0],
	        'units': [exports.DEGREES_UNIT, exports.DEGREES_UNIT]
	    },
	    'skewX': {
	        'defaults': [0],
	        'units': [exports.DEGREES_UNIT]
	    },
	    'skewY': {
	        'defaults': [0],
	        'units': [exports.DEGREES_UNIT]
	    },
	    'perspective': {
	        'defaults': [1],
	        'units': [exports.NO_UNIT]
	    }
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(6);
	var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
	canvas.width = canvas.height = 1;
	var context = canvas.getContext('2d');
	var ColorStyleCalculator = (function () {
	    function ColorStyleCalculator() {
	    }
	    ColorStyleCalculator.prototype.setKeyframeRange = function (startValue, endValue) {
	        this._startValue = parseColorString(startValue);
	        this._endValue = parseColorString(endValue);
	        this._rangeDiff = [];
	        this._rangeDiff[0] = this._endValue[0] - this._startValue[0];
	        this._rangeDiff[1] = this._endValue[1] - this._startValue[1];
	        this._rangeDiff[2] = this._endValue[2] - this._startValue[2];
	        this._rangeDiff[3] = this._endValue[3] - this._startValue[3];
	    };
	    ColorStyleCalculator.prototype.calculate = function (percentage) {
	        var _this = this;
	        var values = [];
	        var alphaVal = this._rangeDiff[3] * percentage + this._startValue[3];
	        util_1.forEach(this._rangeDiff, function (value, index) {
	            var currentValue = value * percentage + _this._startValue[index];
	            if (index < 3) {
	                if (alphaVal !== 1 && currentValue > 0) {
	                    currentValue /= alphaVal;
	                }
	                currentValue = Math.round(currentValue);
	            }
	            values.push(currentValue);
	        });
	        var valueString = values.join(', ');
	        return "rgba(" + valueString + ")";
	    };
	    return ColorStyleCalculator;
	}());
	exports.ColorStyleCalculator = ColorStyleCalculator;
	function parseColorString(colorString) {
	    // Source: https://github.com/web-animations/web-animations-js/blob/b5d91413acee82aadd01a18880cb84a5d883047d/src/color-handler.js
	    colorString = colorString.trim();
	    // The context ignores invalid colors
	    context.fillStyle = '#000';
	    context.fillStyle = colorString;
	    var contextSerializedFillStyle = context.fillStyle;
	    context.fillStyle = '#fff';
	    context.fillStyle = colorString;
	    if (contextSerializedFillStyle != context.fillStyle)
	        return;
	    context.fillRect(0, 0, 1, 1);
	    var pixelColor = context.getImageData(0, 0, 1, 1).data;
	    context.clearRect(0, 0, 1, 1);
	    var alpha = pixelColor[3] / 255;
	    return [pixelColor[0] * alpha, pixelColor[1] * alpha, pixelColor[2] * alpha, alpha];
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var exceptions_1 = __webpack_require__(13);
	var util_1 = __webpack_require__(6);
	var Coordinate = (function () {
	    function Coordinate(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    return Coordinate;
	}());
	exports.Coordinate = Coordinate;
	exports.LINEAR = [0, 0, 1, 1];
	exports.EASE = [.25, .1, .25, 1];
	exports.EASE_IN = [0.42, 0, 1, 1];
	exports.EASE_OUT = [0, 0, 0.58, 1];
	exports.EASE_IN_OUT = [0.42, 0, .58, 1];
	var EPSILON = 1.0e-7;
	var EASING_REGEX = /cubic-bezier\(\s*([-\.\d]+)\s*,\s*([-\.\d]+)\s*,\s*([-\.\d]+)\s*,\s*([-\.\d]+)\s*\)/i;
	function resolveEasingEquation(name) {
	    var coefficients;
	    switch (name.toLowerCase()) {
	        case 'linear':
	            coefficients = exports.LINEAR;
	            break;
	        case 'ease':
	            coefficients = exports.EASE;
	            break;
	        case 'ease-out':
	            coefficients = exports.EASE_OUT;
	            break;
	        case 'ease-in':
	            coefficients = exports.EASE_IN;
	            break;
	        case 'ease-in-out':
	            coefficients = exports.EASE_IN_OUT;
	            break;
	        default:
	            var matches = name.match(EASING_REGEX);
	            if (!matches) {
	                throw new exceptions_1.BaseException('Invalid easing value provided');
	            }
	            coefficients = [
	                util_1.toFloat(matches[1]),
	                util_1.toFloat(matches[2]),
	                util_1.toFloat(matches[3]),
	                util_1.toFloat(matches[4])
	            ];
	            break;
	    }
	    var curve = new Bezier(coefficients);
	    return curve.solve.bind(curve);
	}
	exports.resolveEasingEquation = resolveEasingEquation;
	// Mostly inspired by
	// https://code.google.com/p/chromium/codesearch#chromium/src/ui/gfx/geometry/cubic_bezier.cc
	var Bezier = (function () {
	    function Bezier(_a) {
	        var p1x = _a[0], p1y = _a[1], p2x = _a[2], p2y = _a[3];
	        this.cx_ = 3.0 * p1x;
	        this.bx_ = 3.0 * (p2x - p1x) - this.cx_;
	        this.ax_ = 1.0 - this.cx_ - this.bx_;
	        this.cy_ = 3.0 * p1y;
	        this.by_ = 3.0 * (p2y - p1y) - this.cy_;
	        this.ay_ = 1.0 - this.cy_ - this.by_;
	    }
	    ;
	    Bezier.prototype.x = function (t) {
	        return ((this.ax_ * t + this.bx_) * t + this.cx_) * t;
	    };
	    Bezier.prototype.y = function (t) {
	        return ((this.ay_ * t + this.by_) * t + this.cy_) * t;
	    };
	    Bezier.prototype.xprime = function (t) {
	        return (3.0 * this.ax_ * t + 2.0 * this.bx_) * t + this.cx_;
	    };
	    Bezier.prototype.yprime = function (t) {
	        return (3.0 * this.ay_ * t + 2.0 * this.by_) * t + this.cy_;
	    };
	    Bezier.prototype.solveTgivenX = function (percentage) {
	        // add assert(0 <= percentage && percentage <= 1);
	        var t = percentage;
	        var x, d;
	        // First try a few iterations of Newton's method -- normally very fast.
	        for (var i = 0; i < 8; i++) {
	            x = this.x(t) - percentage;
	            if (Math.abs(x) < EPSILON)
	                return t;
	            d = this.xprime(t);
	            if (Math.abs(d) < EPSILON)
	                break;
	            t = t - x / d;
	        }
	        // Fallback to bisection.
	        var t0 = 0.0;
	        var t1 = 1.0;
	        var t = percentage;
	        while (t0 < t1) {
	            x = this.x(t);
	            if (Math.abs(x - percentage) < EPSILON)
	                return t;
	            if (percentage > x)
	                t0 = t;
	            else
	                t1 = t;
	            t = (t1 - t0) * .5 + t0;
	        }
	        return t;
	    };
	    Bezier.prototype.solve = function (percentage) {
	        return this.y(this.solveTgivenX(percentage));
	    };
	    return Bezier;
	}());
	function computePercentageFromEasing(percentage, easing) {
	    return new Bezier(easing).solve(percentage);
	}
	exports.computePercentageFromEasing = computePercentageFromEasing;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BaseException = (function (_super) {
	    __extends(BaseException, _super);
	    function BaseException(message) {
	        if (message === void 0) { message = "--"; }
	        _super.call(this, message);
	        this.message = message;
	        this.stack = (new Error(message)).stack;
	    }
	    BaseException.prototype.toString = function () { return this.message; };
	    return BaseException;
	}(Error));
	exports.BaseException = BaseException;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	var BrowserClock = (function () {
	    function BrowserClock() {
	        this.startingTime = 0;
	    }
	    BrowserClock.prototype.raf = function (fn) {
	        window.requestAnimationFrame(fn);
	    };
	    BrowserClock.prototype.now = function () {
	        return window.performance.now();
	    };
	    Object.defineProperty(BrowserClock.prototype, "currentTime", {
	        get: function () {
	            return this.now();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return BrowserClock;
	}());
	exports.BrowserClock = BrowserClock;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	var BrowserStyles = (function () {
	    function BrowserStyles() {
	    }
	    BrowserStyles.prototype.getComputedStyle = function (element, property) {
	        return window.getComputedStyle(element)[property];
	    };
	    BrowserStyles.prototype.readStyle = function (element, property) {
	        return element.style[property] || null;
	    };
	    return BrowserStyles;
	}());
	exports.BrowserStyles = BrowserStyles;


/***/ }
/******/ ]);
//# sourceMappingURL=element-animate-polyfill.js.map