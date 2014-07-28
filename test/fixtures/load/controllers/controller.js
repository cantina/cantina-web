module.exports = function (app) {
  console.log('controller');

  var controller = app.controller();

  controller.get('/', function (req, res, next) {
    res.send('Home');
  });

  return controller;
};