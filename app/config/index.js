'use strict';
/**
 * Bundles configuration within a single singleton object.
 * Uses `nconf` to support command line parameters, environment variables
 * and a `properties.json` file (in that order of prevalence).
 *
 * @module config
 */
const path = require('path');
const pck = require(path.join('..', '..', 'package'));
const nconf = require('nconf');

const DEFAULT_ENVIRONMENT = 'development';

nconf
  .argv()
  .env()
  .file({
    file: path.join(__dirname, 'properties.json')
  })
  .defaults({
    logger: {
      label: pck.name
    }
  })
  .overrides({
    env: process.env.NODE_ENV || DEFAULT_ENVIRONMENT,
    morgan: {
      options: {
        skip: () => process.env.NODE_ENV === 'test'
      }
    }
  });

module.exports = nconf;
