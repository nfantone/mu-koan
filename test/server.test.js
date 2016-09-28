'use strict';
const Koa = require('koa');
const server = require('../lib/server');
const middlewares = Object.keys(require('../package').dependencies)
  .filter((i) => i.match(/^(koa-|kcors)((?!(adapter|load)).)*$/));

describe('when bootstrapping server', function() {
  var app = server.bootstrap(new Koa());

  it('should define all middlewares on Koa app', () => {
    app.middleware.length.should.equal(Object.keys(middlewares).length);
  });
});
