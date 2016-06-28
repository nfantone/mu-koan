'use strict';
/**
 * Routes initializer. Dynamic loading of
 * all entry points in `.js` files inside a root directory.
 *
 * @module router
 */
const Router = require('koa-router');
const logger = require('./logger');
const _ = require('lodash');
const glob = require('glob');
const path = require('path');

module.exports = function declareRoutes(options) {
  var log = logger.get(options);
  var router = new Router(options);
  _.each(glob.sync(path.join(options.root, '**/*.js')), (file) => {
    var route = path.parse(file);
    route = path.join(route.dir, route.name);

    log.info('Configuring routes for [%s%s]', options.prefix, route.substr(options.root.length));
    require(route)(router);
  });
  return router;
};
