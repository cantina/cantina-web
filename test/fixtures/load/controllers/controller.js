console.log('controller');
var app = require('cantina')
  , controller = module.exports = app.controller();

controller.get('/', function (req, res, next) {
  res.send('Home');
});