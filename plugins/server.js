var http = require('http');

module.exports = function (app) {
  var conf;

  // Default conf.
  app.conf.add({
    web: {
      server: {
        port: 3000
      }
    }
  });
  conf = app.conf.get('web:server');

  // Create server.
  if (!app.server && !!conf) {
    app.server = http.createServer();

    // When the app starts, start listening.
    app.hook('start').last(1000, function (next) {
      if (!app.server.address() && (typeof conf.port !== 'undefined') && (typeof conf.listen === 'undefined' || conf.listen)) {
        app.server.listen(conf.port, function () {
          var address = app.server.address();
          app.log('Listening on ' + address.address + ':' + address.port);
          app.emit('listening');
          next();
        });
      }
      else {
        next();
      }
    });

    // When the app is being destroyed, close the server.
    app.hook('destroy').last(1000, function (next) {
      app.server.close(next);
    });
  }
};

module.exports.weight = -500;