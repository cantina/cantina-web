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

  app.controllers.forEach(function (controller) {
    app.middleware.last(controller.handler);
  });
}
