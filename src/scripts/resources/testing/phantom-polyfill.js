/*
 * Basically, phantom.js 1.x doesn't provide `function.bind`. Phantom 2 does, but it's not stable and internally
 * managed by wallaby.
 * See more: http://dm.gl/2015/03/11/wallaby-react/
 * https://github.com/wallabyjs/public/issues/61
 * https://github.com/wallabyjs/public/issues/29
 * https://github.com/ariya/phantomjs/issues/10522
 * https://github.com/es-shims/function-bind/blob/master/index.js
 *
 * I needed to use the one from es-shims because the default function.bind polyfill
 * will error when using flummox action classes. Was getting the error: TypeError: Cannot call a class as a function
 */
var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice         = Array.prototype.slice;
var toStr         = Object.prototype.toString;
var funcType      = '[object Function]';

if (!Function.prototype.bind) {
  Function.prototype.bind = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var binder = function () {
      if (this instanceof bound) {
        var result = target.apply(
          this,
          args.concat(slice.call(arguments))
        );
        if (Object(result) === result) {
          return result;
        }
        return this;
      } else {
        return target.apply(
          that,
          args.concat(slice.call(arguments))
        );
      }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs   = [];
    for (var i = 0; i < boundLength; i++) {
      boundArgs.push("$" + i);
    }

    var bound = Function("binder", "return function (" + boundArgs.join(",") + "){return binder.apply(this,arguments)}")(binder);

    if (target.prototype) {
      function Empty() {
      }

      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }

    return bound;
  };
}
