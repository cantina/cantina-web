module.exports = function (req, res, next) {
  res.vars.title = 'Example Site';
  next();
};
module.exports.weight = -800;
