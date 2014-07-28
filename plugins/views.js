var path = require('path')
  , fs = require('fs')
  , templMulti = require('../lib/templ-multi');

module.exports = function (app) {
  // Expose Handlebars
  app.Handlebars = templMulti.handlebars;

  // Expose middleware.
  app.viewsHandler = templMulti.middleware;

  // Load a directory of views.
  app.loader('views', function (options) {
    if (fs.existsSync(options.path)) {
      templMulti.addDir(options.path, options.weight || 0);
    }
  });
};
