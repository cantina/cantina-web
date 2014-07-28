module.exports = function (app) {
  var controller = app.controller();

  controller.get('/', function (req, res, next) {
    res.render('index');
  });

  controller.get('/page', function (req, res, next) {
    res.render('page');
  });

  return controller;
};