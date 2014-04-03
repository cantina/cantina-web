var app = require('cantina')
  , controller = module.exports = app.controller();

controller.get('/', function (req, res, next) {
  res.render('index');
});

controller.get('/page', function (req, res, next) {
  res.render('page');
});