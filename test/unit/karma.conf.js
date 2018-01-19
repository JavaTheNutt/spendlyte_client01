// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack
var webpackConfig = require('../../build/webpack.test.conf');
var browsers = ['PhantomJS'];
if (process.env.TRAVIS) {
  console.log('on travis, adding additional browsers');
  browsers.concat(['Chrome', 'Firefox']);
}
console.log('setting log level in karma config');
const logLevel = process.env.LOG_LEVEL || 'silent';
const showLogs = logLevel !== 'silent';
console.log('current log level is ', logLevel);
// Logger.setLevel(logLevel);
module.exports = function (config) {
  const karmaLogLevel = logLevel === 'silent' ? config.LOG_DISABLE : config.LOG_INFO;

  console.log('karma log level', karmaLogLevel);
  console.log('show logs', showLogs);
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: browsers,
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    reporters: ['progress', 'spec', 'coverage'],
    files: ['../../node_modules/babel-polyfill/dist/polyfill.js', './index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    logLevel: showLogs ? config.LOG_DEBUG : config.LOG_DISABLE,
    browserConsoleLogOptions: {
      level: 'debug',
      format: '%b %T: %m',
      terminal: showLogs
    },
    client: {
      captureConsole: showLogs
    }
  });
};
