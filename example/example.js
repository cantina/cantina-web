var app = require('cantina');

app.boot(function (err) {
  if (err) throw err;

  // require('cantina-web');
  require('../');

  app.loadTemplates(app.root + '/extraViews');

  app.start();
});
