# mu-kōän 公案
[![Build Status](https://travis-ci.org/nfantone/mu-koan.svg?branch=develop)](https://travis-ci.org/nfantone/mu-koan) [![codecov.io](https://codecov.io/github/nfantone/mu-koan/coverage.svg?branch=develop)](https://codecov.io/github/nfantone/mu-koan?branch=develop) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/nfantone/mu-koan/blob/master/LICENSE)

> An opinionated Koa v2 JSON API boilerplate to achieve enlightenment.

mu-kōän serves as an initial scaffolding for Koa 2.0.0+ applications aimed at creating _stateless_ REST JSON APIs. It includes a set of predefined Koa modules allowing for quicker bootstrapping.

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

```sh
git clone https://github.com/nfantone/mu-koan.git
cd mu-koan
npm i && sudo npm i -g gulp
gulp

[14:25:35] Using gulpfile ~/dev/js/mu-koan/gulpfile.js
[14:25:35] Starting 'default'...
[14:25:35] Starting 'eslint'...
[14:25:36] Finished 'eslint' after 675 ms
[14:25:36] Starting 'nodemon'...
# ...
2016-03-03 14:25:36,645 - info: [mu-koan] Starting and configuring Koa server
2016-03-03 14:25:36,677 - info: [mu-koan] Configuring routes for [/api/status]
2016-03-03 14:25:36,687 - info: [mu-koan] ✔ Koa server listening on localhost:3000 [development]
```

> mu-kōän requires [node](https://nodejs.org) 4.3.1+

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

## Also included
Apart from Koa's middleware suite, mu-kōän contains:

- Dynamic routes declaration: just drop your controller under `app/routes` and configure the appropriate path on the given `router` instance.
- A default `/api/status` endpoint. Useful for ping testing.
- Multi-transport logging capabilities using [Winston](https://www.npmjs.com/package/winston#logging).
- A pre-configured [Gulp](http://gulpjs.com/) build.
  - `gulp [--debug]` to start the server
  - `gulp test` to run unit tests
- Linting based on [semistandard](https://www.npmjs.com/package/semistandard) eslint.
- [Mocha](https://mochajs.org/) as a test runner; [should](http://unitjs.com/guide/should-js.html) as the assertion library.
- [Istanbul](https://github.com/gotwarlost/istanbul) coverage reports.
- Configuration based on [nconf](https://www.npmjs.com/package/http-shutdown).
- Pre-commit hooks for testing and linting.

---

## License
MIT
