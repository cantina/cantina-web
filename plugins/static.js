var app = require('cantina')
  , path = require('path')
  , conf;

// Depends on middleware plugin.
require('./middleware');

// Require and expose buffet.
app.buffet = require('buffet');

// Add default config.
app.conf.add({
  web: {
    static: {
      root: './public',
      notFound: true,
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

// Create middleware.
app.staticHandler = app.buffet(path.resolve(app.root, conf.root), conf.buffet);
