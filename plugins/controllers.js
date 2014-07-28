module.exports = function (app) {
  // Depends on middleware plugin.
  app.require('../plugins/middleware');

  // Expose middler as 'controller'.
  app.controller = app.middler;

  // Load a directory of controllers.
  app.loader('controllers', function (options) {
    var controllers = app.load('modules', options);
    Object.keys(controllers).forEach(function (name) {
      var controller = controllers[name];
      app.middleware.add(controller.weight || 900, controller.handler);
    });
    return controllers;
  });
};
