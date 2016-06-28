'use strict';
/**
 * Bundles configuration within a singleton object.
 * Uses peer dependency `nconf` to support command line parameters,
 * environment variables and external files or stores.
 *
 * @module lib/config
 */
const _ = require('lodash');
const path = require('path');
const nconf = require('nconf');

const DEFAULT_ENVIRONMENT = 'development';

nconf
  .defaults({
    koa: {
      namespace: '/api',
      routes: path.join(__dirname, 'routes')
    },
    error: {
      postFormat: (e, obj) =>
        process.env.NODE_ENV === 'production' ? _.omit(obj, 'stack') : obj
    },
    favicon: path.join(__dirname, '..', 'favicon.ico'),
    morgan: {
      format: 'combined'
    },
    cacheControl: {
      public: true,
      maxAge: 3600
    },
    jwt: {
      unless: {}
    }
  })
  .overrides({
    environment: process.env.NODE_ENV || DEFAULT_ENVIRONMENT,
    morgan: {
      options: {
        skip: () => process.env.NODE_ENV === 'test'
      }
    }
  });

module.exports = nconf;
