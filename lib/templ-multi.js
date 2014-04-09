var app = require('cantina')
  , templ = require('templ')
  , path = require('path')
  , templStac = require('stac')();

exports.handlebars = templ.handlebars;

exports.addDir = function (dir, weight) {
  var newTempl = templ(dir);
  templStac.add(weight || 0, newTempl);
};

exports.middleware = function (req, res, next) {
  res.render = function (p, context, options) {

    app.hook('views:before:render:' + p).runSeries(req, res, context, options, function (err) {
      if (err) return app.emit('error', err);

      var vars = res.vars
        , success = false
        , layoutName = 'layout'
        , layout = null;

      context || (context = res.vars);
      options || (options = {});

      // Find the default layout
      if (typeof context.layout !== 'undefined') {
        options.layout = context.layout;
        delete context.layout;
      }
      if (options.layout) {
        if (typeof options.layout === 'function') {
          layout = options.layout;
        }
        else {
          layoutName = options.layout;
        }
      }

      if (options.layout !== false && !layout) {
        templStac.forEach(function (middleware) {
          layout || (layout = middleware._cache[path.sep + layoutName]);
        });
        options.layout = layout;
      }

      templStac.forEach(function (middleware) {

        // Check if the template we're rendering is in this templ cache
        if (!success && middleware._cache[path.sep + p]) {

          // Apply the middleware
          middleware(req, res);

          // Re-attach vars. The middleware just cleared them
          res.vars = vars;

          // Render
          res.render.call(null, p, context, options);
          success = true;
        }
      });

      if (!success) {
        throw new Error('template not found: ' + p)
      }
    });
  };
  res.renderStatus = function (status, p, context) {
    if (typeof p === 'object') {
      context = p;
      p = null;
    }
    if (!p) p = 'status-' + status;
    try {
      res.render(p, context, {status: status});
    }
    catch (e) {
      res.writeHead(status);
      res.end();
    }
  };

  res.renderError = function (err) {
    app.emit('error', err.stack || err);
    res.statusCode = 500;
    res.renderStatus(500, res.vars);
  };

  res.vars = {};
  next && next();
};