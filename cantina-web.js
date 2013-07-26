var app = require('cantina');

// Load local and app plugins.
app.load('plugins', __dirname);
app.load('plugins');

// Load local and app middleware.
app.loadMiddleware('middleware', __dirname);
app.loadMiddleware('middleware');
