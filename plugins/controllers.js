var app = require('cantina')
  , path = require('path')
  , conf;

// Depends on middleware plugin.
require('../plugins/middleware');

app.conf.add({
  web: {
    controllers: {
      path: 'controllers'
    }
  }
});

app.controller = app.middler;

app.loadControllers = function (dir, cwd) {
  var controllers = app.load(dir, cwd);
  Object.keys(controllers).forEach(function (name) {
    var controller = controllers[name];
    app.middleware.add(controller.weight || 900, controller.handler);
  });
};
