'use strict';

var gulp = require('gulp');
var path = require('path');
var tslint = require("gulp-tslint");
var gulpIgnore = require('gulp-ignore');

var conf = require('../../base/gulp/conf');

var tsLinterSrc = [
  path.join(conf.paths.src, '**/*.ts'),
  '!' + path.join(conf.paths.src, '**/*.d.ts')
];

gulp.task('tslint', () => {
  console.log('App-specific version of tslint');

  return gulp.src(tsLinterSrc)
    .pipe(gulpIgnore.exclude('./app/services/serviceClient.ts'))
    .pipe(tslint({ formatter: "verbose" }))
    .pipe(tslint.report())
});