// Refer to https://github.com/wallabyjs/wallaby-jspm-sample
// https://github.com/wallabyjs/public/issues/135 JSPM example

var babel = require('babel');

module.exports = function (wallaby) {

  return {
    debug: false,
    testFramework: 'mocha@2.2.4',
    files: [
      // remember, wallaby + express only serves some files from the basePath. These params takes care of telling wallaby
      // which files to serve.

      // look in src/scripts/resources/testing/phantom-polyfill.js for explanation of this.
      {pattern: 'src/scripts/resources/testing/phantom-polyfill.js', instrument: false},

      // karma usually assigns a global expect, etc. But wallaby needs to do that too, so just sort of copy
      // what `node_modules/karma-sinon-chai/index.js` does.
      {pattern: 'node_modules/karma-sinon-chai/node_modules/chai/chai.js', instrument: false},
      {pattern: 'node_modules/karma-sinon-chai/node_modules/sinon-chai/lib/sinon-chai.js', instrument: false},
      {pattern: 'node_modules/karma-sinon-chai/bower_components/sinonjs/sinon.js', instrument: false},
      {pattern: 'node_modules/karma-sinon-chai/adapter.js', instrument: false},

      {pattern: 'jspm_packages/system.js', instrument: false},
      {pattern: 'config.js', instrument: false},

      {pattern: 'src/scripts/**/*.js', load: false},
      {pattern: 'src/scripts/**/test-*.js', load: false, ignore: true}
    ],
    tests: [
      {pattern: 'src/scripts/**/test-*.js', load: false}
    ],

    // in order for wallaby to instrument a file, it needs to parse it before testing it:
    // https://github.com/jeffling/wallaby-webpack/issues/6
    compilers: {
      'src/scripts/**/*.js': wallaby.compilers.babel({
        babel: babel,
        stage: 0,
        optional: [
          "runtime"
        ]
      })
    },

    middleware: (app, express) => {
      app.use('/jspm_packages', express.static(require('path').join(__dirname, 'jspm_packages')));
    },

    bootstrap: function (wallaby) {
      wallaby.delayStart();

      var promises = [];
      for (var i = 0, len = wallaby.tests.length; i < len; i++) {
        promises.push(System['import'](wallaby.tests[i].replace(/\.js$/, '')));
      }

      Promise.all(promises).then(function () {
        wallaby.start();
      });
    }
  };
};
