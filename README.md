# mu-kōän 公案
[![Build Status](https://travis-ci.org/nfantone/mu-koan.svg?branch=develop)](https://travis-ci.org/nfantone/mu-koan) [![codecov.io](https://codecov.io/github/nfantone/mu-koan/coverage.svg?branch=develop)](https://codecov.io/github/nfantone/mu-koan?branch=develop) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/nfantone/mu-koan/blob/master/LICENSE)

> An opinionated Koa v2 JSON API boilerplate to achieve enlightenment.

mu-kōän serves as kickstarter set for Koa 2.0.0+ applications aimed at creating _stateless_ REST JSON APIs. It includes a set of predefined Koa modules allowing for quicker bootstrapping with sensible defaults.

Relies on [winston](https://www.npmjs.com/winston) for logging and [nconf](https://www.npmjs.com/nconf) for its configuration. Both are declared as `"peerDependencies"`, together with `koa` itself.

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

```sh
npm i --save mu-koan 
```

> mu-kōän requires [node](https://nodejs.org) 4.3.1+

## Usage
Create a new Koa app, configure it the way you want and pass it as an argument to the `mu-koan` exported function, wich will add its own middlewares and initialize routes.

```javascript
'use strict'
const log = require('winston');
const config = require('nconf');
const Koa = require('koa');

let app = new Koa();
// Configure middlewares on `app`
// ...

// Returns an instance of node's `http` server
// (https://nodejs.org/api/http.html#http_http) 
const server = require('mu-koan')(app);

// Start Koa server
server.listen(config.get('koa:port'), config.get('koa:hostname'), () => {
  var addr = server.address();
  log.info('✔ Koa server listening on %s:%s [%s]', addr.address,
    addr.port, config.get('environment'));
});
```

> You can take a look at a minimal running `mu-koan` sample app at [app.js](./app.js)

## Configuration
By design, mu-kōän requires `nconf` to be used by the host Koa application. It'll pick up the global `nconf` instance, fill in default or missing properties and read values from there.

> Make sure to setup `nconf` with your custom values **before** using `mu-koan`.

The following properties are used to configure the different middlewares packed by `mu-koan`:

```javascript
{
  "koa": {
    "hostname": "localhost",
    "port": 3000,
    // All paths and routes will be under this namespace
    "namespace": "/api",
    // Root of all your **/*.js controllers
    "routes": "./routes"
  },
  "jwt": {
    // See https://www.npmjs.com/koa-jwt for more
    "passthrough": true,
    "secret": "(w_E8Qd--@cBvgr8"
  },
  "morgan": {
    // See https://www.npmjs.com/koa-morgan for more
    "format": "combined"
  },
  "cacheControl": {
    // See https://www.npmjs.com/koa-cache-control for more
    "public": true,
    "maxAge": 3600
  },
  // Path to favicon file needed by https://www.npmjs.com/koa-favicon
  "favicon": "./favicon.ico"
}
```

## Controllers
A _controller_ is node module that exports a `function` that receives a `koa-router` instance and declares something on it. All controllers must be defined under a single root directory (but can be nested as needed).

For example,

```javascript
'use strict';
/**
 * Implementation of API /hello endpoint.
 * @module routes/hello
 */
const moment = require('moment');

/**
 * Set up /hello endpoint.
 * @param  {Object} router A Koa router
 */
module.exports = function(router) {
  /**
   * GET /hello
   *
   * Returns a simple hello world
   * text and a timestamp.
   */
  router.get('/hello', (ctx) => {
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'Hello from mu-koan!',
      timestamp: moment().format('l')
    };
  });
};

```

## Logging
mu-kōän prints out log messages using a named `winston` logger. The actual name can be provided as a second optional `options` argument to the main exported function.

```javascript
'use strict'
const winston = require('winston');

// Configure a winston logger
winston.loggers.add('some-logger', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'mu-koan'
  }
});

const Koa = require('koa');

let app = new Koa();
const server = require('mu-koan')(app, { logger: 'some-logger' });
```

Actual logger configuration is not handled by mu-kōän. If no logger name is provided, the _default_ `winston` logger will be used.

> Learn more about handling multiple loggers at [the official Winston docs](https://www.npmjs.com/package/winston#working-with-multiple-loggers-in-winston)

## Features
The boilerplate adds support for the following to a barebones Koa app:

- Body parsing ([koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser))
- Pretty JSON responses ([koa-json](https://www.npmjs.com/package/koa-json))
- Global error handling ([koa-json-error](https://www.npmjs.com/package/koa-json-error))
- Cache control ([koa-cache-control](https://www.npmjs.com/package/koa-cache-control))
- Compression ([koa-compress](https://www.npmjs.com/package/koa-compress))
- CORS ([koa-cors](https://www.npmjs.com/package/koa-cors))
- ETag and conditional `GET` ([koa-etag](https://www.npmjs.com/package/koa-etag))
- JWT authentication ([koa-jwt](https://www.npmjs.com/package/koa-jwt))
- Security headers ([koa-helmet](https://www.npmjs.com/package/koa-helmet))
- Graceful shutdown ([http-shutdown](https://www.npmjs.com/package/http-shutdown))


---

## License
MIT
