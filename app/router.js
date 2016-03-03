'use strict';
'use strict';
/**
 * Routes initializer. Dynamic loading of
 * all entry points in `.js` files inside app/routes.
 *
 * @module router
 */
const Router = require('koa-router');
const _ = require('lodash');
const log = require('logger');
const glob = require('glob');
const path = require('path');

const ROUTES_PATH = path.join(__dirname, 'routes');

module.exports = function(options) {
  options = options || {};
  var router = new Router(options);
  _.each(glob.sync(path.join(ROUTES_PATH, '**/*.js')), (file) => {
    var route = path.parse(file);
    route = path.join(route.dir, route.name);

    log.info('Configuring routes for [%s%s]', options.prefix || '', route.substr(ROUTES_PATH.length));
    require(route)(router);
  });
  return router;
};
