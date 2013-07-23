var app = require('cantina')
  , path = require('path');

// Depends on static plugin.
require('../plugins/static');

// Get static config.
conf = app.conf.get('web:static');

// Applications can set `static: false` to disable.
if (conf) {
  middleware = app.buffet(path.resolve(app.root, conf.root), conf.buffet);
  app.middleware.add(-1000, middleware);
  if (conf.notFound) {
    app.middleware.add(1000, middleware.notFound);
  }
}
