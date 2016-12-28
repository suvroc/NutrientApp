
/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  base: 'base',
  dist: 'dist',
  tmp: '.tmp',
  serve: '.tmp/serve',
  typings: './typings/index.d.ts'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  var gutil = require('gulp-util');

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};

exports.copyConfiguration = function(destDir) {
  const gulp = require('gulp');
  const fs = require('fs');
  const gutil = require('gulp-util');
  const rename = require('gulp-rename');

  const devConfig = 'app-config-mine.json';
  const sharedConfig = 'app-config.json';

  const appConfigFile = fs.existsSync(devConfig) ? devConfig : sharedConfig;

  gutil.log(gutil.colors.blue(appConfigFile), 'used for the build');

  return gulp.src([appConfigFile])
    .pipe(rename(sharedConfig))
    .pipe(gulp.dest(destDir));
}