'use strict';
/**
 * Bootstraps and configures a Koa application to
 * be used as a JSON REST API.
 *
 * @module lib/server
 */
const defaults = require('lodash.defaultsdeep');
const zlib = require('zlib');
const adapt = require('koa-adapter-bluebird');
const bodyParser = require('koa-bodyparser');
const cacheControl = require('koa-cache-control');
const compress = require('koa-compress');
const morgan = require('koa-morgan');
const helmet = require('koa-helmet');
const responseTime = require('koa-response-time');
const etag = require('koa-etag');
const conditional = require('koa-conditional-get');
const json = require('koa-json');
const cors = require('kcors');
const jwt = require('koa-jwt');
const favicon = require('koa-favicon');
const error = require('koa-json-error');
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
  app.use(error(config.error));
  app.on('error', (error) => {
    log.error('Unexpected exception ', error);
  });

  // Configure and setup middlewares
  app.use(bodyParser(config.bodyParser));
  app.use(morgan(config.morgan.format, config.morgan.options));
  app.use(responseTime());
  app.use(helmet(config.helmet));
  app.use(compress({
    flush: zlib.Z_SYNC_FLUSH
  }));
  app.use(conditional());
  app.use(etag());
  app.use(adapt(cacheControl(config.cacheControl)));
  app.use(cors(config.cors));
  app.use(favicon(config.favicon));

  app.use(jwt(config.jwt.options).unless(config.jwt.unless));
  app.use(json());

  return app;
}
