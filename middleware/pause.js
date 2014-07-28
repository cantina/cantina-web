var pause = require('pause');

module.exports = function (app) {
  function pauseMiddleware (req, res, next) {
    // buffer incoming data until unpause() is called
    req.pause = function () {
      if (req.paused) return;
      req.paused = true;
      var paused = pause(req);
      req.unpause = function () {
        if (!req.paused) return;
        req.paused = false;
        paused.resume();
      };
    };
    req.pause();
    next();
  }
  pauseMiddleware.weight = -5000;
  return pauseMiddleware;
};
