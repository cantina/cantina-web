module.exports = function (app) {
  function formsMiddleware (req, res, next) {
    // Set errors on form elements.
    var formErrors = res.formErrors || {};
    res.formError = function(name, message) {
      res.setMessage(message, 'error');
      formErrors[name] = message;
      res.formErrors = res.vars.formErrors = formErrors;
    };
    next();
  }
  return formsMiddleware;
};