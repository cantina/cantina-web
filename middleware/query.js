var qs = require('qs');

module.exports = function (app) {
  function queryMiddleware (req, res, next) {
    if (!req.query) {
      if (!req.href) return next(new Error('query requires href'));
      try {
        req.query = qs.parse(req.href.query);
      }
      catch (e) {
        return next(e);
      }
    }
    next();
  }
  queryMiddleware.weight = -949;
  return queryMiddleware;
};