var app = require('cantina').createApp();

app.boot(function (err) {
  if (err) throw err;

  // require('cantina-web');
  app.require('../');

  // Load the web stack.
  app.load('web');

  // Load extra views directory.
  app.load('views', {dir: 'extraViews'});

  app.start();
});
