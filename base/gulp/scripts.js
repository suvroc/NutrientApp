'use strict';

const gulp = require('gulp');

const ngAnnotate = require('gulp-ng-annotate');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');
const util = require('gulp-util');
const browserify = require('browserify');
const tsify = require('tsify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

const conf = require('./conf');
const tsFilesPattern = 'src/**/*.ts';

var handleScripts = (tsFilter) => {
  var entries = ['src/app/index.module.ts'];
  if(tsFilter)
    entries.push(tsFilter);

  return browserify({
      basedir: '.',
      debug: true,
      entries: entries,
      cache: {},
      packageCache: {}
    })
    .plugin(tsify, { noImplicitAny: true, typescript: require('typescript') })
    .bundle()
    .on('error', util.log)
    .pipe(source('index.module.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('.tmp/serve/app/'));
};

gulp.task('app-config', ['clean'],
  () => conf.copyConfiguration(conf.paths.serve)
);

gulp.task('scripts', [],
  () => handleScripts()
);

gulp.task('scripts:watch', ['scripts'],
  () => gulp.watch(tsFilesPattern, ['scripts'], browserSync.reload)
);