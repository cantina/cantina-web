var app = require('cantina')
  , http = require('http');

// Default conf.
app.conf.add({
  web: {
    server: {
      port: 3000
    }
  }
});

// Create server.
if (!app.server) {
  app.server = http.createServer();

  // When the app starts, start listening.
  app.hook('start').last(1000, function (next) {
    var conf = app.conf.get('web:server');
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
