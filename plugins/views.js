var path = require('path')
  , fs = require('fs')
  , Templ = require('templ').Templ;

module.exports = function (app) {
  var specs = []
    , templOptions = {}; // Might use this later.

  // 'Load' a directory of views (add it to the templ specs).
  // The specs don't actually get loaded until app start.
  app.loader('views', function (options) {
    if (fs.existsSync(options.path)) {
      specs.push({globs: '**/*.hbs', cwd: options.path});
      reloadTempl();
    }
  });

  // Whenever new specs get added to our views 'stack', we need to
  // create a new Templ instance and allow modules to rebind Handlebars
  // logic.
  function reloadTempl () {
    // Close down the old templ instance.
    if (app.templ) app.templ.close();

    // Create new templ instance.
    app.templ = new Templ(specs, templOptions);

    // Views middleware uses this handler.
    app.templHandler = app.templ.middleware(templOptions);

    // Plugins can listen for this event to bind handlebars heleprs.
    app.emit('handlebars', app.templ.handlebars);
  }
};
