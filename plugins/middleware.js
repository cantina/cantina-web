var path = require('path');

module.exports = function (app) {
  // Depends on server plugin.
  app.require('./server');

  // Require and expose middler.
  app.middler = require('middler');

  // Add middleware api to app.
  app.middleware = app.middler(app.server);

  // Load middleware from a folder and add it.
  app.loader('middleware', function (options) {
    var handlers = app.load('modules', options);
    Object.keys(handlers).forEach(function (name) {
      var middleware = handlers[name];
      if (middleware) {
        app.middleware.add(middleware.weight || 0, middleware.handler || middleware);
      }
    });
    return handlers;
  });
};