'use strict';
/**
 * Immutable configuration object
 * with sensible defaults for common middlewares.
 *
 * @module lib/config
 */
const omit = require('lodash.omit');
const path = require('path');

const CONFIG = {
  koa: {
    routes: {
      root: path.join(__dirname, 'routes'),
      prefix: '/api'
    }
  },
  error: {
    postFormat: (e, obj) =>
      process.env.NODE_ENV === 'production' ?
        omit(obj, 'stack', 'isOperational') : obj
  },
  favicon: path.join(__dirname, '..', 'favicon.ico'),
  morgan: {
    format: 'combined',
    options: {
      skip: () => process.env.NODE_ENV === 'test'
    }
  },
  cacheControl: {
    public: true,
    maxAge: 3600
  },
  jwt: {
    options: {
      secret: 'shhhh-secret'
    },
    unless: {}
  }
};

module.exports = Object.freeze(CONFIG);
