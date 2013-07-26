var app = require('cantina')
  , controller = module.exports = app.controller();

controller.add(1000, function (req, res, next) {
  res.renderStatus(404);
});