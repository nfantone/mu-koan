'use strict';
/**
 * Bootstraps and configures a Koa application to
 * be used as a JSON REST API.
 *
 * @module server
 */
const join = require('path').join;
const Koa = require('koa');
const http = require('http');
const shutdown = require('shutdown');
const adapt = require('koa-adapter-bluebird');
const bodyParser = require('koa-bodyparser');
const cacheControl = require('koa-cache-control');
const zlib = require('zlib');
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
const log = require('logger');
const config = require('config');

log.info('Starting and configuring Koa server');

// Create Koa app
let app = new Koa();

// Setup global error handler and logger
app.use(adapt(error(config.get('error'))));
app.on('error', (error) => {
  log.error('Unexpected exception ', error);
});

// Configure and setup middlewares
app.use(bodyParser());
app.use(morgan(config.get('morgan:format'), config.get('morgan:options')));
app.use(adapt(responseTime()));
app.use(adapt(helmet()));
app.use(compress({
  flush: zlib.Z_SYNC_FLUSH
}));
app.use(adapt(conditional()));
app.use(etag());
app.use(adapt(cacheControl(config.get('cacheControl'))));
app.use(adapt(cors()));
app.use(adapt(favicon(join(__dirname, '..', 'favicon.ico'))));
app.use(adapt(jwt(config.get('jwt')).unless({
  path: [/\/status$/]
})));
app.use(adapt(json()));

// Setup routes
let router = require('router')({ prefix: config.get('koa:namespace') });
app.use(router.routes(), router.allowedMethods());

// Decorate server with graceful exit handler
// for SIGINT and SIGTERM signals.
var server = shutdown(http.createServer(app.callback()));

module.exports = server;
