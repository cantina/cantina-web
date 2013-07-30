var app = require('cantina');

// Depends on static plugin.
require('../plugins/static');

// Export middleware.
if (app.staticHandler) {
  module.exports = app.staticHandler;
  module.exports.weight = -1000;
}
else {
  module.exports = null;
}
