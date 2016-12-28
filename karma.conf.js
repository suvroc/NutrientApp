'use strict';

var useref = require('useref');
var fs = require('fs');
var path = require('path');

module.exports = function(config) {
  const singleRun = config.singleRun;
  const baywatchMode = config.baywatch || false;

  var jsFiles = getAssets("index.html");
  jsFiles.push('./node_modules/angular-mocks/angular-mocks.js');
  jsFiles.push('src/**/*.ts');

  var configuration = {
    files: jsFiles,
    exclude: [],

    port: 9876,
    colors: true,
    singleRun: singleRun,
    autoWatch: !singleRun,

    basePath: '',

    logLevel: (baywatchMode ? config.LOG_DEBUG : config.LOG_WARN),

    frameworks: ['jasmine', 'karma-typescript'],

    browsers : ['PhantomJS', 'Chrome'],

    preprocessors: {
      'src/**/*.ts': ['karma-typescript']
    },

    reporters: ["spec", "karma-typescript"],

    specReporter: {
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
    },

    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json",
      disableCodeCoverageInstrumentation: true,
      reports: {
        "text-summary": ""
      }
    },

    browserDisconnectTimeout: 30000
  };

  config.set(configuration);
};


function getAssets(index) {
  const indexPath = path.resolve(__dirname + '/src/', index);
  const data = fs.readFileSync(indexPath, {encoding: 'utf8'});
  const result = useref(data);
  const files = result[1].js;

  const assets = files[Object.keys(files)[0]].assets;

  return assets.map(el => el.replace(/^\.\.\//, './'));
}
