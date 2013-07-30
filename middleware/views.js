var app = require('cantina');

// Depends on views plugin.
require('../plugins/views');

// Export middleware.
if (app.viewsHandler) {
  module.exports = app.viewsHandler;
  module.exports.weight = -900;
}
else {
  module.exports = null;
}
