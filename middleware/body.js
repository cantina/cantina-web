var formidable = require('formidable');

module.exports = function (req, res, next) {
  if (typeof req.unpause === 'undefined') return next(new Error('body requires pause'));
  var form = new formidable.IncomingForm();
  try {
    form.parse(req, function (err, fields, files) {
      req.body = fields;
      req.files = files;
      next(err);
    });
  }
  catch (e) {
    // formidable throws if there is no content-type. weird.
    if (e.message === 'bad content-type header, no content-type') {
      e = null;
    }
    next(e);
  }
  req.unpause();
};

module.exports.weight = -900;