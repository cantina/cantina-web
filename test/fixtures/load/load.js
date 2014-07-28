var app = require('cantina').createApp();

app.boot(function (err) {
  if (err) throw err;

  // require('cantina-web');
  app.require('../../../');

  // Load the web stack.
  app.load('web');

  app.start();
});
