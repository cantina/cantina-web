var app = require('cantina');

require('./views');

app.Handlebars.registerHelper('applyPartial', function (templateName, vars, options) {
  if (arguments.length < 3) {
    options = vars;
    vars = null;
  }
  var template = app.Handlebars.partials[templateName];
  if (!template) {
    throw new Error('Handlebars partial ' + templateName + ' could not be found.');
  }
  return template(vars || this);
});


