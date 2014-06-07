var app = require('cantina');

app.boot(function (err) {
  if (err) throw err;

  // require('cantina-web');
  require('../../../');

  // Load the web stack.
  app.load('web');

  app.start();
});
