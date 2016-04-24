'use strict';
/**
 * Simple module that allows closing or
 * freeing resources before server shutdown.
 *
 * @module shutdown
 */
const _ = require('lodash');
const log = require('logger');
const httpShutdown = require('http-shutdown');

const SHUTDOWN_SIGNALS = ['SIGINT', 'SIGTERM'];
const DEFAULT_OPTIONS = {
  timeout: 5000
};

module.exports = function(server, options) {
  options = _.defaults({}, options, DEFAULT_OPTIONS);

  function shutdown(signal) {
    log.warn('Closing down server (%s received)', signal);

    // Regular shutdown
    server.shutdown((err) => {
      if (err) {
        log.error('Server failed to shutdown: %s', err);
      } else {
        log.info('✘ Server shut down successfully');
      }
      process.exit(1);
    });

    // Force shutdown after timeout
    setTimeout(() => {
      log.warn('Could not close connections gracefully after %sms: forcing shutdown', options.timeout);
      process.exit(1);
    }, options.timeout).unref();
  }

  // Listen for TERM (e.g. kill) and INT (e.g. Ctrl+C) signals
  // and shutdown gracefully.
  SHUTDOWN_SIGNALS.forEach((sig) => {
    process.once(sig, () => shutdown(sig));
  });

  return httpShutdown(server);
};
