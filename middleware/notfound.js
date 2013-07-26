var app = require('cantina')
  , conf;

// Depends on static plugin.
require('../plugins/static');

// Load conf.
conf = app.conf.get('web:static');

// Export middleware.
if (conf.notFound) {
  module.exports = app.staticHandler.notFound;
  module.exports.weight = 1000;
}
else {
  module.exports = null;
}
