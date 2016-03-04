'use strict';
/**
 * Koa middleware to log every exception as an `ERROR` using
 * any given logger, or defaults to `console` if none is given.
 *
 * @module error-logger
 */
const co = require('bluebird').coroutine;
const _ = require('lodash');

/**
 * Default options for this middleware.
 */
const DEFAULTS = {
  logger: console,
  message: 'Request failed'
};

module.exports = function logError(options) {
  options = _.defaults({}, options, DEFAULTS);
  return (ctx, next) => co(function * () {
    try {
      yield next();
    } catch (e) {
      options.logger.error(`${options.message}`, e);
      throw e;
    }
  })();
};
