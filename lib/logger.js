'use strict';
/**
 * @module lib/logger
 */
const _ = require('lodash');
const winston = require('winston');

module.exports = {
  /**
   * Returns a `winston.Logger` given an
   * `options.logger` property and a set
   * of prioritized rules.
   *
   * If `options.logger` is a string, returns `winston.loggers.get(options.logger)`;
   * if `options.logger` is a `winston.Logger` instance, returns that same instance;
   * if it is neither, return winston's default logger.
   */
  get(options) {
    if (_.isString(options.logger)) {
      return winston.loggers.get(options.logger);
    }

    if (options.logger instanceof winston.Logger) {
      return options.logger;
    }

    return winston;
  }
};
