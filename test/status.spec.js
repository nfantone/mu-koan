'use strict';
const join = require('path').join;
const pck = require(join('..', 'package'));
require('app-module-path').addPath(join(__dirname, '..', 'app'));
const config = require('config');
const app = require('server');
const supertest = require('supertest');

describe('/status', function() {
  let request;
  let namespace;

  before(() => {
    namespace = config.get('koa:namespace');
    request = supertest(app.listen());
  });

  it('should return HTTP 200 along with status information', (done) => {
    request.get(`${namespace}/status`)
      .expect(200)
      .expect((res) => {
        let body = res.body;
        body.should.have.properties({
          success: true,
          name: pck.name,
          version: pck.version,
          env: process.env.NODE_ENV
        });
        body.should.have.property('timestamp').and.be.type('string');
        body.should.have.property('process').and.be.type('object');
      }).end(done);
  });
});
