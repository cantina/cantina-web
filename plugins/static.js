var app = require('cantina')
  , path = require('path')
  , conf
  , middleware;

// Depends on middleware plugin.
require('./middleware');

// Require and expose buffet.
app.buffet = require('buffet');

// Add default config.
app.conf.add({
  web: {
    static: {
      root: './public',
      notFound: false,
      buffet: {
        indexes: true,
        index: 'index.html',
        gzip: true,
        watch: true,
        maxAge: 300,
        keepAlive: 5000
      }
    }
  }
});

// Get static config.
conf = app.conf.get('web:static');

// Applications can set `static: false` to disable.
if (conf) {
  middleware = app.buffet(path.resolve(app.root, conf.root), conf.buffet);
  app.middleware.add(-1000, middleware);
  if (conf.notFound) {
    app.middleware.add(1000, middleware.notFound);
  }
}
