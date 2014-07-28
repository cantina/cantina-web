module.exports = function (app) {
  console.log('middleware');

  return function (req, res, next) {
    next();
  };
};