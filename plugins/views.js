var app = require('cantina')
  , path = require('path')
  , fs = require('fs')
  , conf
  , root;

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
if (conf) {
  root = path.resolve(app.root, conf.root);
  if (fs.existsSync(root)) {
    app.viewsHandler = app.templ(root);
  }
}
