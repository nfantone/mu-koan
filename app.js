'use strict';
/**
 * An example mu-koan app with minimal setup.
 *
 * Run it with `node app.js [--koa.port=3000 --koa.hostname=localhost]`
 */
const log = require('winston');
const nconf = require('nconf');
const Koa = require('koa');

// Require mu-koan and pass in the Koa instance
const server = require('.')(new Koa());

let config = nconf.argv();

// Starts Koa server
server.listen(config.get('koa:port'), config.get('koa:hostname'), () => {
  var addr = server.address();
  log.info('✔ Koa server listening on %s:%s [%s]', addr.address,
    addr.port, config.get('environment'));
});

module.exports = server;
