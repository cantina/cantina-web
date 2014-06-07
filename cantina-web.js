var app = require('cantina')
  , _ = require('underscore');

// Load the plugins.
app.load('plugins');

/**
 * Register a 'web' helper loader.
 */
app.loader('web', function (options) {
  app.load('plugins', _.extend({}, options, {dir: 'plugins'}));
  app.load('views', _.extend({}, options, {dir: 'views'}));
  app.load('static', _.extend({}, options, {dir: 'public'}));
  app.load('middleware', _.extend({}, options, {dir: 'middleware'}));
  app.load('controllers', _.extend({}, options, {dir: 'controllers'}));
});

// Load stuff provided by cantina-web.
app.load('web');
