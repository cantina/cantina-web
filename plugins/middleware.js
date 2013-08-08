var app = require('cantina')
  , path = require('path');

// Depends on server plugin.
require('./server');

// Require and expose middler.
app.middler = require('middler');

// Add middleware api to app.
app.middleware = app.middler(app.server);

// Load middleware from a folder and add it.
app.loadMiddleware = function (dir, cwd) {
  var handlers = app.load(dir, cwd);
  Object.keys(handlers).forEach(function (name) {
    var middleware = handlers[name];
    if (middleware) {
      app.middleware.add(middleware.weight || 0, middleware.handler || middleware);
    }
  });
};