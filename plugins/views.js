var app = require('cantina')
  , path = require('path')
  , conf;

// Expose templ.
app.templ = require('templ');

// Default conf.
app.conf.add({
  web: {
    views: {
      root: './views'
    }
  }
});

// Get conf.
conf = app.conf.get('web:views');

// Expose middleware.
app.viewsHandler = app.templ(path.resolve(app.root, conf.root));
