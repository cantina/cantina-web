var app = require('cantina')
  , path = require('path')
  , fs = require('fs')
  , conf
  , staticMiddleware;

// Depends on middleware plugin.
require('../plugins/middleware');

// Require and expose buffet.
app.buffet = require('buffet');

// Add default config.
app.conf.add({
  web: {
    static: {
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
app.loadStatic = function (dir, cwd, weight) {
  var buffet;

  cwd = cwd || app.root;
  dir = path.resolve(cwd, dir);

  if (fs.existsSync(dir)) {
    buffet = app.buffet(dir, conf.buffet);
    staticMiddleware.add(weight || 0, buffet);
    if (cwd === app.root) {
      app.staticNotFoundHandler = buffet.notFound;
    }
  }
};
