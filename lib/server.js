'use strict';
/**
 * Bootstraps and configures a Koa application to
 * be used as a JSON REST API.
 *
 * @module lib/server
 */
const defaults = require('lodash.defaultsdeep');
const zlib = require('zlib');
const middlewares = require('./middlewares');
const adapt = require('koa-adapter-bluebird');
const logger = require('mu-koan-logger');

const DEFAULT_CONFIGURATION = require('./config');

// Module API
module.exports = {
  bootstrap
};

/**
 * Sets up a Koa app instance.
 * @param  {Object} app A Koa app instance as created by `new Koa()`
 * @return {Object}     A node `http` server instance
 */
function bootstrap(app, options) {
  var config = defaults({}, options, DEFAULT_CONFIGURATION);
  var log = logger.get(options);
  log.info('Starting and configuring Koa server');

  // Setup global error handler and logger
  app.use(middlewares.error(config.error));
  app.on('error', (error) => log.error('Unexpected exception ', error));

  // Configure and setup middlewares
  app.use(middlewares.bodyparser(config.bodyParser));
  app.use(middlewares.morgan(config.morgan.format, config.morgan.options));
  app.use(middlewares.responseTime());
  app.use(middlewares.helmet(config.helmet));
  app.use(middlewares.compress({
    flush: zlib.Z_SYNC_FLUSH
  }));
  app.use(middlewares.conditional());
  app.use(middlewares.etag());
  app.use(adapt(middlewares.cacheControl(config.cacheControl)));
  app.use(middlewares.cors(config.cors));
  app.use(middlewares.favicon(config.favicon));

  app.use(middlewares.jwt(config.jwt.options).unless(config.jwt.unless));
  app.use(middlewares.json());

  return app;
}
