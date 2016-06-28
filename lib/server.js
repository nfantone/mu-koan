'use strict';
/**
 * Bootstraps and configures a Koa application to
 * be used as a JSON REST API.
 *
 * @module server
 */
const http = require('http');
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
const cors = require('koa-cors');
const jwt = require('koa-jwt');
const favicon = require('koa-favicon');
const error = require('koa-json-error');
const winston = require('winston');
const config = require('./config');
const declareRoutes = require('./router');
const shutdown = require('./shutdown');

/**
 * Sets up a Koa app instance.
 * @param  {Object} app A Koa app instance as created by `new Koa()`
 * @return {Object}     A node `http` server instance
 */
module.exports = function bootstrap(app, options) {
  options = options || {};
  let log = winston.loggers.get(options.logger);
  log.info('Starting and configuring Koa server');

  // Setup global error handler and logger
  app.use(error(config.get('error')));
  app.on('error', (error) => {
    log.error('Unexpected exception ', error);
  });

  // Configure and setup middlewares
  app.use(bodyParser());
  app.use(morgan(config.get('morgan:format'), config.get('morgan:options')));
  app.use(responseTime());
  app.use(adapt(helmet()));
  app.use(compress({
    flush: zlib.Z_SYNC_FLUSH
  }));
  app.use(conditional());
  app.use(etag());
  app.use(adapt(cacheControl(config.get('cacheControl'))));
  app.use(adapt(cors()));
  app.use(favicon(config.get('favicon')));

  app.use(jwt(config.get('jwt')).unless({
    path: [/\/status$/]
  }));
  app.use(json());

  // Setup routes
  let router = declareRoutes({
    root: config.get('koa:routes'),
    prefix: config.get('koa:namespace'),
    logger: options.logger
  });
  app.use(router.routes(), router.allowedMethods());

  // Decorate server with graceful exit handler
  // for SIGINT and SIGTERM signals.
  return shutdown(http.createServer(app.callback()), {
    logger: options.logger
  });
};
