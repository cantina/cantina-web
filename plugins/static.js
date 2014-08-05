var path = require('path')
  , fs = require('fs');

module.exports = function (app) {
  var conf
    , staticMiddleware
    , defaultWeight = 0;

  // Depends on middleware plugin.
  app.require('../plugins/middleware');

  // Require and expose buffet.
  app.buffet = require('buffet');

  // Add default config.
  app.conf.add({
    web: {
      static: {
        dir: 'public',
        notFound: false,
        buffet: {
          indexes: true,
          index: 'index.html',
          gzip: true,
          watch: true,
          maxAge: 300,
          keepAlive: 5000,
          notFoundPath: '404.html'
        }
      }
    }
  });

  // Get static config.
  conf = app.conf.get('web:static');

  // Create and expose middleware.
  staticMiddleware = app.middler();
  app.staticHandler = staticMiddleware.handler;

  // 'Load' a directory of static files and add it to the middleware chain.
  app.loader('static', {dir: conf.dir}, function (options) {
    var buffet;
    if (fs.existsSync(options.path)) {
      buffet = app.buffet(options.path, conf.buffet);
      staticMiddleware.add(options.weight || defaultWeight--, buffet);
      if (options.parent === app.root) {
        app.staticNotFoundHandler = buffet.notFound;
      }
    }
  });
};
