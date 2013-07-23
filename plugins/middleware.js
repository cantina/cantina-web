var app = require('cantina');

// Depends on server plugin.
require('./server');

// Require and expose middler.
app.middler = require('middler');

// Add middleware api to app.
app.middleware = app.middler(app.server);
