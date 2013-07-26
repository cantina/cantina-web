var app = require('cantina');

// Depends on static plugin.
require('../plugins/static');

// Export middleware.
module.exports = app.staticHandler;
module.exports.weight = -1000;
