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

conf = app.conf.get('web:controllers');

if (conf) {
  app.controller = app.middler;
  app.controllers = app.load(conf.path);
  Object.keys(app.controllers).forEach(function (name) {
    var controller = app.controllers[name];
    app.middleware.add(controller.weight || 900, controller.handler);
  });
}
