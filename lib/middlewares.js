'use strict';
/**
 * Lazy loading of "koa-*" middlewares in `package.json`.
 *
 * @lib/middlewares
 */
module.exports = require('koa-load-middlewares')({
  pattern: ['koa-*', 'kcors', '!koa-adapter-*'],
  rename: {
    'kcors': 'cors',
    'koa-json-error': 'error',
    'koa-conditional-get': 'conditional'
  }
});
