var app = require('cantina')
  , path = require('path')
  , conf
  , middleware;

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
