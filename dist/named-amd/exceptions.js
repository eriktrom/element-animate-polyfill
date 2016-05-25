enifed("exceptions", ["exports"], function (exports) {
    "use strict";

    function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

    var BaseException = (function (_Error) {
        _inherits(BaseException, _Error);

        function BaseException() {
            var message = arguments.length <= 0 || arguments[0] === undefined ? "--" : arguments[0];

            _classCallCheck(this, BaseException);

            _Error.call(this, message);
            this.message = message;
            this.stack = new Error(message).stack;
        }

        BaseException.prototype.toString = function toString() {
            return this.message;
        };

        return BaseException;
    })(Error);

    exports.BaseException = BaseException;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4Y2VwdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBQUEsYUFBQTtrQkFBQSxhQUFBOztBQUVFLGlCQUZGLGFBQUEsR0FFMkM7Z0JBQXRCLE9BQU8seURBQVcsSUFBSTs7a0NBRjNDLGFBQUE7O0FBR0ksOEJBQU0sT0FBTyxDQUFDLENBQUM7QUFERSxnQkFBQSxDQUFBLE9BQU8sR0FBUCxPQUFPLENBQWU7QUFFdkMsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsQUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBRSxLQUFLLENBQUM7U0FDOUM7O0FBTEgscUJBQUEsV0FPRSxRQUFRLEdBQUEsb0JBQUE7QUFBYSxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQUU7O2VBUDdDLGFBQUE7T0FBbUMsS0FBSyIsImZpbGUiOiJleGNlcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJhc2VFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XG4gIHB1YmxpYyBzdGFjazogYW55O1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVzc2FnZTogc3RyaW5nID0gXCItLVwiKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5zdGFjayA9ICg8YW55Pm5ldyBFcnJvcihtZXNzYWdlKSkuc3RhY2s7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5tZXNzYWdlOyB9XG59XG4iXX0=