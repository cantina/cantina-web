var expres = require('expres');

module.exports = function (app) {
  expres.middleware.weight = -950;
  return expres.middleware;
};
