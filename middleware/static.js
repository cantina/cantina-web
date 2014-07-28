module.exports = function (app) {
  var handler = null;

  // Depends on static plugin.
  app.require('../plugins/static');

  // Export middleware.
  if (app.staticHandler) {
    handler = app.staticHandler;
    handler.weight = -1000;
  }

  return handler;
};