module.exports = function (app) {
  function varsMiddleware (req, res, next) {
    res.vars.title = 'Example Site';
    next();
  }
  varsMiddleware.weight = -800;
  return varsMiddleware;
};