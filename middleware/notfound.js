var app = require('cantina')
  , conf;

// Depends on static plugin.
require('../plugins/static');

// Load conf.
conf = app.conf.get('web:static');

// Export middleware.
if (conf.notFound && app.staticNotFoundHandler) {
  module.exports = app.staticNotFoundHandler;
  module.exports.weight = 1000;
}
else {
  module.exports = null;
}
