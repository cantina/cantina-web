var expres = require('expres');

module.exports = function (app) {
  expres.middleware.weight = -900;
  return expres.middleware;
};
