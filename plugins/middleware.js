var app = require('cantina')
  , path = require('path');

// Depends on server plugin.
require('./server');

// Require and expose middler.
app.middler = require('middler');

// Add middleware api to app.
app.middleware = app.middler(app.server);

// Load web middleware and app middleware.
app.load('middleware', path.resolve(__dirname, '../'));
app.load('middleware');
