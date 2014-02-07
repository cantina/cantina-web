console.log('middleware');

module.exports = function (req, res, next) {
  next();
};