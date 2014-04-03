var templ = require('templ')
  , path = require('path')
  , templStac = require('stac')();

exports.handlebars = templ.handlebars;

exports.addDir = function (dir, weight) {
  var newTempl = templ(dir);
  templStac.add(weight || 0, newTempl);
};

exports.middleware = function (req, res, next) {
  res.render = function (p, context, options) {
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
      if (middleware._cache[path.sep + p]) {

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
  res.vars = {};
  next && next();
};