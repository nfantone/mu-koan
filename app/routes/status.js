'use strict';
/**
 * Implementation of API /status endpoint.
 * @author nfantone
 */

const path = require('path');
const pck = require(path.join(__dirname, '..', '..', 'package.json'));
const moment = require('moment');

/**
 * Set up /status endpoint.
 * @param  {Object} router A Koa router
 */
module.exports = function(router) {
  /**
   * GET /status
   *
   * Returns a simple description of the deployed
   * application. Useful for smoke tests and ping.
   */
  router.get('/status', (ctx) => {
    ctx.status = 200;
    ctx.body = {
      success: true,
      name: pck.name,
      version: pck.version,
      timestamp: moment().format('lll'),
      platform: process.platform,
      env: process.env.NODE_ENV
    };
  });
};
