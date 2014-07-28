var path = require('path');

module.exports = function (app) {
  // Require and expose middler.
  app.middler = require('middler');

  // Add middleware api to app.
  app.middleware = app.middler();

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

  // Attach to server on start.
  app.hook('start').add(function (next) {
    if (app.server) {
      app.middleware.attach(app.server);
    }
    next();
  });
};