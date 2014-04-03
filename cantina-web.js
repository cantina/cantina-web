var app = require('cantina');

// Load local and app plugins.
app.load('plugins', __dirname);
app.load('plugins');

// Load local and app middleware.
app.loadMiddleware('middleware', __dirname);
app.loadMiddleware('middleware');

// Load the app controllers.
app.loadControllers('controllers');

// Load the app views.
app.loadViews('views');
