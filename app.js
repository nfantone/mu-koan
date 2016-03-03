'use strict';

/**
 * Koa API that recieves HTTP events via POST triggered
 * from landing pages, extracts critical information from them
 * and stores them.
 *
 * Provides the following endpoints:
 *
 * POST /track/phonecall
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
