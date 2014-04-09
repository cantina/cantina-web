var app = require('cantina');

module.exports = function (req, res, next) {


  // Set messages on the response.
  res.setMessage = function(message, type) {
    type = type || 'warning';
    req.session.messages || (req.session.messages = {});
    req.session.messages[type] || (req.session.messages[type] = []);
    req.session.messages[type].push(message);
  };
  // Messages are stored in session for redirect persistence.
  if (req.session && req.session.messages) {
    res.vars.messages = req.session.messages;
    delete req.session.messages;
  }

  next();
};