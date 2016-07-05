# mu-kōän 公案
[![Build Status](https://travis-ci.org/nfantone/mu-koan.svg?branch=develop)](https://travis-ci.org/nfantone/mu-koan) [![codecov.io](https://codecov.io/github/nfantone/mu-koan/coverage.svg?branch=develop)](https://codecov.io/github/nfantone/mu-koan?branch=develop) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/nfantone/mu-koan/blob/master/LICENSE)

> An opinionated Koa v2 JSON API boilerplate to achieve enlightenment.

mu-kōän serves as kickstarter set for Koa 2.0.0+ applications aimed at creating _stateless_ REST JSON APIs. It includes a set of predefined Koa middlewares allowing for quicker bootstrapping with sensible defaults.

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

```sh
npm i --save mu-koan
```

> mu-kōän requires [node](https://nodejs.org) 4.3.1+

## Usage
Create a new Koa app, configure it the way you want and pass it as an argument to the `bootstrap` exported function, wich will add its own middlewares and initialize routes.

```javascript
'use strict'
// Import some configuration
// For a detail of available options, see
// section below.
const CONFIG = require('./config.json')
const middlewares = require('mu-koan');
const Koa = require('koa');

let app = new Koa();
// ...
// Configure other middlewares on `app`.
// For a list of already included middlewares
// by mu-kōän checkout package.json or the section below:
// https://github.com/nfantone/mu-koan/tree/feature/module#features

middlewares.bootstrap(app, CONFIG);

// Start Koa server
app.listen();
```

> You can take a look at a minimal running `mu-koan` sample app at [app.js](./app.js)

## Configuration
The following properties are used to configure the different middlewares packed by `mu-koan`:

```javascript
{
  "bodyParser": {
    // See https://www.npmjs.com/koa-bodyparser for more
    "jsonLimit": "2mb"
  },
  "jwt": {
    // Note that actual koa-jwt options are nested within "options"
    "options": {
      // See https://www.npmjs.com/koa-jwt for more
      "passthrough": true,
      "secret": "(w_E8Qd--@cBvgr8"
    },
    // Exclude JWT verification from certain paths
    "unless": {
      // See https://github.com/Foxandxss/koa-unless#current-options for more
      "path": ["/status"]
    }
  },
  "cors": {
    // See https://www.npmjs.com/kcors for more
    "allowedMethods": "GET"
  },
  "helmet": {
    // See https://github.com/helmetjs/helmet#top-level-helmet for more
    "frameguard": false
  }
  "morgan": {
    "options": {
      // See https://github.com/expressjs/morgan#options for more
      "immediate": true
    },
    // See https://www.npmjs.com/koa-morgan for more
    "format": "combined"
  },
  "cacheControl": {
    // See https://github.com/DaMouse404/koa-cache-control#options for more
    "public": true,
    "maxAge": 3600
  },
  // Path to favicon file needed by https://www.npmjs.com/koa-favicon
  "favicon": "./favicon.ico"
}
```

## Logging
mu-kōän prints out log messages using a `winston` logger. It can be provided as a second optional `options` argument to the`bootstrap` function.

```javascript
'use strict'
const middlewares = require('mu-koan');
const winston = require('winston');
const Koa = require('koa');

// Configure a winston logger
winston.loggers.add('some-logger', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'mu-koan'
  }
});

let app = new Koa();

// `logger` option below can also be a `winston.Logger` instance or `undefined`/`null`
const server = middlewares.bootstrap(app, { logger: 'some-logger' });
```

Actual logger configuration is not handled by mu-kōän. The option can be either a `String` or a `winston.Logger` instance. In the former case, the value will be used to fetch a logger by means of `winston.loggers.get(options.logger)`.

If none is provided, the _default_ `winston` logger will be used.

> Learn more about handling multiple loggers at [the official Winston docs](https://www.npmjs.com/package/winston#working-with-multiple-loggers-in-winston)

## Features
The boilerplate adds support for the following to a barebones Koa app:

- Body parsing ([koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser))
- Pretty JSON responses ([koa-json](https://www.npmjs.com/package/koa-json))
- Global error handling ([koa-json-error](https://www.npmjs.com/package/koa-json-error))
- Cache control ([koa-cache-control](https://www.npmjs.com/package/koa-cache-control))
- Compression ([koa-compress](https://www.npmjs.com/package/koa-compress))
- CORS ([kcors](https://www.npmjs.com/package/kcors))
- ETag and conditional `GET` ([koa-etag](https://www.npmjs.com/package/koa-etag))
- RTT headers ([koa-response-time](https://www.npmjs.com/package/koa-response-time))
- Access logging ([koa-morgan](https://www.npmjs.com/package/koa-morgan)))
- JWT authentication ([koa-jwt](https://www.npmjs.com/package/koa-jwt))
- Favicon ([koa-favicon](https://www.npmjs.com/package/koa-favicon))
- Security headers ([koa-helmet](https://www.npmjs.com/package/koa-helmet))


---

## License
MIT
