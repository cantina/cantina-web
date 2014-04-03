var app = require('cantina')
  , path = require('path')
  , fs = require('fs')
  , templMulti = require('./templ-multi')
  , conf
  , root;

// Expose Handlebars
app.Handlebars = templMulti.handlebars;

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
    templMulti.addDir(root);
  }
  app.viewsHandler = templMulti.middleware;
}

app.loadTemplates = function (dir, weight) {
  templMulti.addDir(dir, weight);
};