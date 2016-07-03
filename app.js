'use strict';
/**
 * An example mu-koan app with minimal setup.
 *
 * Run it with `node app.js`
 */
const Koa = require('koa');
const middlewares = require('.');

const HOSTNAME = 'localhost';
const PORT = 3000;

// Require mu-koan and pass in the Koa instance
let app = middlewares.bootstrap(new Koa());

// Starts Koa server
app.listen(HOSTNAME, PORT, () =>
  console.log(`✔ Koa server listening on ${HOSTNAME}:${PORT} [${app.env}]`)
);

module.exports = app;
