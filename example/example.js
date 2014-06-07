var app = require('cantina');

app.boot(function (err) {
  if (err) throw err;

  // require('cantina-web');
  require('../');

  // Load the web stack.
  app.load('web');

  // Load extra views directory.
  app.load('views', {dir: 'extraViews'});

  app.start();
});
