var app = require('cantina')
  , path = require('path')
  , conf;

// Depends on middleware plugin.
require('../plugins/middleware');

// Expose middler as 'controller'.
app.controller = app.middler;

// Load a directory of controllers.
app.loadControllers = function (dir, cwd) {
  var controllers = app.load(dir, cwd);
  Object.keys(controllers).forEach(function (name) {
    var controller = controllers[name];
    app.middleware.add(controller.weight || 900, controller.handler);
  });
};
