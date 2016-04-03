'use strict';

const argv = require('minimist')(process.argv.slice(2), {
  boolean: ['debug', 'debug-brk']
});
const $ = require('gulp-load-plugins')();
const _ = require('lodash');
const sequence = require('run-sequence');
const config = require('./build.json');
const gulp = require('gulp');
const path = require('path');

/**
 * Starts a nodemon server, watches
 * sources and restarts on changes.
 *
 * `gulp nodemon`
 */
gulp.task('nodemon', function() {
  process.env.NODE_ENV = 'development';
  var debug = argv.debug || argv.debugBrk;
  var options = _.defaults(config.nodemon, {
    watch: config.paths.src,
    ignore: config.paths.dist,
    nodeArgs: [],
    tasks: ['eslint']
  });

  // Add command line arguments
  options.args = process.argv.slice(2);

  // Normalize nodemon options paths
  options.watch = _.map(options.watch, path.normalize);
  options.ignore = _.map(options.ignore, path.normalize);

  // Enable debug flag on nodemon
  if (debug) {
    options.nodeArgs.push('--' + (argv.debug ? 'debug' : 'debug-brk') + '=' + config.debug.debugPort);
  }

  return $.nodemon(options)
    .on('restart', function() {
      $.util.log('nodemon restarted');
    })
    .once('exit', function() {
      $.util.log('nodemon exited cleanly');
    });
});

/**
 * Runs eslint linter on source code
 * and prints a report.
 *
 * `gulp eslint`
 */
gulp.task('eslint', function() {
  return gulp.src(config.paths.src)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(config.eslint.failOnError, $.eslint.failOnError()));
});

/**
 * Starts a node-inspector instance.
 * In order to run alongside nodemon
 * `gulp --debug` should be used instead of this task.
 *
 * `gulp debug`
 */
gulp.task('debug', function(cb) {
  var options = _.defaults(config.debug, {
    debugPort: 5858
  });
  gulp.src([])
    .pipe($.nodeInspector(options));
  return cb();
});

/**
 * Watches sources and runs linter on
 * changes.
 *
 * `gulp watch`
 */
gulp.task('watch', function() {
  gulp.watch(config.paths.src, ['validate']);
});

/**
 * Runs unit tests and writes out
 * a report.
 *
 * `gulp test`
 */
gulp.task('test', function() {
  process.env.NODE_ENV = 'test';
  process.env['logger:level'] = 'error';
  return gulp.src(config.paths.src)
    // Covering files
    .pipe($.istanbul())
    // Force `require` to return covered files
    .pipe($.istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(config.paths.test, { read: false })
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
 * Runs 'eslint' and 'nodemon'.
 * If --debug or --debug-brk are enabled, also runs 'debug'.
 * Default task.
 *
 * `gulp [--debug|--debug-brk]`
 */
gulp.task('default', function(cb) {
  var debug = argv.debug || argv.debugBrk;
  sequence(_.compact([
    'eslint',
    debug ? 'debug' : undefined
  ]), 'nodemon', cb);
});
