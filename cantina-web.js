var app = require('cantina');

// Load the plugins.
app.load('plugins');

/**
 * Register a 'web' helper loader.
 */
app.loader('web', function (options) {
  app.load('plugins', {parent: options.parent});
  app.load('views', {parent: options.parent});
  app.load('static', {parent: options.parent});
  app.load('middleware', {parent: options.parent});
  app.load('controllers', {parent: options.parent});
});

// Load stuff provided by cantina-web.
app.load('web');
