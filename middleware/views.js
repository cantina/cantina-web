module.exports = function (app) {
  var handler = null;

  // Depends on views plugin.
  app.require('../plugins/views');

  // Export middleware.
  if (app.viewsHandler) {
    handler = function (req, res, next) {
      app.viewsHandler(req, res, function () {

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
    };
    handler.weight = -900;
  }

  return handler;
};
