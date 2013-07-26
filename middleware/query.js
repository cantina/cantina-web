var qs = require('qs');

module.exports = function (req, res, next) {
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
};

module.exports.weight = -949;