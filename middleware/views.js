var app = require('cantina');

// Depends on views plugin.
require('../plugins/views');

// Export middleware.
module.exports = app.viewsHandler;
module.exports.weight = -900;
