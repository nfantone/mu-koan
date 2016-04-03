'use strict';
/**
 * Small module that instantiates and configures
 * a logger to be used throughout the application.
 *
 * @module  logger
 */
const winston = require('winston');
const config = require('config');
const moment = require('moment');

var options = config.get('logger');
options.timestamp = function() {
  return moment().format(config.get('logger:timestamp'));
};

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console(options)
  ]
});

module.exports = logger;
