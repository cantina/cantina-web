var path = require('path')
  , fs = require('fs')
  , Templ = require('templ').Templ
  // @todo replace this global reference with per-templ instance reference
  // once https://github.com/carlos8f/templ/pull/2 lands.
  , Handlebars = require('templ').handlebars;

module.exports = function (app) {
  var specs = []
    , options = {};

  // Depends on middleware plugin.
  app.require('../plugins/middleware');

  // 'Load' a directory of views (add it to the templ specs).
  // The specs don't actually get loaded until app start.
  app.loader('views', function (options) {
    if (fs.existsSync(options.path)) {
      specs.push({globs: '**/*.hbs', cwd: options.path});
    }
  });

  // On app start, create the templ instance.
  // Do this fairly early in the bootstrap so other plugins
  // can work with the Handlebars instance.
  app.hook('start').first(function (next) {
    app.templ = new Templ(specs, options);
    app.Handlebars = Handlebars;
    app.templHandler = app.templ.middleware(options);

    // Add our modified handler to the middleware stack. We have to do this
    // here because we're waiting for the start hook.
    function viewsHandler (req, res, next) {
      app.templHandler(req, res, function () {

        // Run a hook before render so plugins can intercept
        var _render = res.render;
        res.render = function (template, context, options) {
          app.hook('views:before:render:' + template).runSeries(req, res, context, options, function (err) {
            if (err) return app.emit('error', err);
            _render(template, context, options);
          });
        };

        // Emit an error and respond to user with a 500.
        res.renderError = function (err, statusCode) {
          app.emit('error', err.stack || err);
          res.statusCode = statusCode || 500;
          res.renderStatus(res.statusCode, res.vars);
        };

        next();
      });
    }
    app.middleware.add(-900, viewsHandler);

    next();
  });
};
