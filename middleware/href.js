module.exports = function (app) {
  hrefMiddleware = require('href');
  hrefMiddleware.weight = -950;
  return hrefMiddleware;
};
