var app = require('cantina')
  , path = require('path')
  , fs = require('fs')
  , templMulti = require('../lib/templ-multi')
  , conf
  , root;

// Expose Handlebars
app.Handlebars = templMulti.handlebars;

// Load a directory of views.
app.loadViews = function (dir, cwd, weight) {
  cwd = cwd || app.root;
  dir = path.resolve(cwd, dir);
  if (fs.existsSync(dir)) {
    templMulti.addDir(dir, weight);
  }
};

// Expose middleware.
app.viewsHandler = templMulti.middleware;
