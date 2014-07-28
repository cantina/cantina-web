module.exports = function (app) {
  var controller = app.controller();

  controller.add(1000, function (req, res, next) {
    res.renderStatus(404);
  });

  return controller;
};