'use strict';

const $ = require('gulp-load-plugins')();
const config = require('./build.json');
const gulp = require('gulp');

// Declare release task
$.release.register(gulp);

/**
 * Runs eslint linter on source code
 * and prints a report.
 *
 * `gulp eslint`
 */
gulp.task('eslint', () =>
  gulp.src(config.paths.src)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(config.eslint.failOnError, $.eslint.failAfterError()))
);

/**
 * Watches sources and runs linter on
 * changes.
 *
 * `gulp watch`
 */
gulp.task('watch', () => gulp.watch(config.paths.src, ['validate']));

/**
 * Runs unit tests and writes out
 * a report.
 *
 * `gulp test`
 */
gulp.task('test', () => {
  process.env.NODE_ENV = 'test';
  process.env.LOGGER_LEVEL = 'error';
  return gulp.src(config.paths.src)
    // Covering files
    .pipe($.istanbul())
    // Force `require` to return covered files
    .pipe($.istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(config.paths.test, {
        read: false
      })
      .pipe($.mocha(config.mocha))
      // Creating the reports after tests ran
      .pipe($.istanbul.writeReports())
      .pipe($.if(config.istanbul.enforceThresholds,
        $.istanbul.enforceThresholds(config.istanbul)))
      .pipe($.exit());
    });
});

/**
 * Lints source code and runs test suite.
 * Used as a pre-commit hook.
 *
 * `gulp validate`
 */
gulp.task('validate', ['eslint', 'test']);

/**
 * Uploads coverage report to codecov.io
 *
 * `gulp coverage`
 */
gulp.task('coverage', () => {
  return gulp.src(config.codecov.src)
    .pipe($.codecov());
});

/**
 * Runs 'validate'.
 *
 * `gulp`
 */
gulp.task('default', ['validate']);
