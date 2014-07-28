module.exports = function (app) {
  var conf
    , handler = null;

  // Depends on static plugin.
  app.require('../plugins/static');

  // Load conf.
  conf = app.conf.get('web:static');

  // Export middleware.
  if (conf.notFound && app.staticNotFoundHandler) {
    handler = app.staticNotFoundHandler;
    handler.weight = 1000;
  }

  return handler;
};
