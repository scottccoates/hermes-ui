/*
 * Basically, phantom.js 1.x doesn't provide `function.bind`. Phantom 2 does, but it's not stable and internally
 * managed by wallaby.
 * See more: http://dm.gl/2015/03/11/wallaby-react/
 * https://github.com/wallabyjs/public/issues/61
 * https://github.com/wallabyjs/public/issues/29
 * https://github.com/ariya/phantomjs/issues/10522
 */
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
    fToBind = this,
    fNOP = function () {
    },
    fBound = function () {
      return fToBind.apply(this instanceof fNOP && oThis
          ? this
          : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments)));
    };

    // test this.prototype in case of native functions binding:
    if (this.prototype)
      fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
