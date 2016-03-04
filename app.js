'use strict';

/**
 * Koa v2 API boilerplate to achieve enlightenment.
 */
const path = require('path');
require('app-module-path').addPath(path.join(__dirname, 'app'));
const log = require('logger');
const server = require('server');
const config = require('config');

// Starts Koa server
server.listen(config.get('koa:port'), config.get('koa:hostname'), () => {
  log.info('✔ Koa server listening on %s:%s [%s]', config.get('koa:hostname'),
    config.get('koa:port'), config.get('env'));
});

module.exports = server;
