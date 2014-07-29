module.exports = function (app) {
  // Bind our custom helpers to handlebars instances.
  app.on('handlebars', function (Handlebars) {

    // applyPartial helper.
    Handlebars.registerHelper('applyPartial', function (templateName, vars, options) {
      if (arguments.length < 3) {
        options = vars;
        vars = null;
      }
      var template = Handlebars.partials[templateName];
      if (!template) {
        throw new Error('Handlebars partial ' + templateName + ' could not be found.');
      }
      return template(vars || this);
    });

    // is block helper.
    Handlebars.registerHelper('is', function (context, options) {
      if (typeof options.hash !== 'undefined') {
        if (typeof options.hash.equal !== 'undefined') {
          if (context === options.hash.equal) {
            return options.fn(this);
          }
        }
      }
      return options.inverse(this);
    });

    // isnt block helper.
    Handlebars.registerHelper('isnt', function (context, options) {
      if (typeof options.hash !== 'undefined') {
        if (typeof options.hash.equal !== 'undefined') {
          if (context !== options.hash.equal) {
            return options.fn(this);
          }
        }
      }
      return options.inverse(this);
    });

    Handlebars.registerHelper('or', function (var1, var2, options) {
      if (var1 || var2) {
        return options.fn(this);
      }
      else {
        return options.inverse(this);
      }
    });

    Handlebars.registerHelper('and', function (var1, var2, options) {
      if (var1 && var2) {
        return options.fn(this);
      }
      else {
        return options.inverse(this);
      }
    });

    Handlebars.registerHelper('nor', function (var1, var2, options) {
      if (!(var1 || var2)) {
        return options.fn(this);
      }
      else {
        return options.inverse(this);
      }
    });

    // Handlebars length helper.
    Handlebars.registerHelper('length', function (array) {
      return array ? array.length : 'N/A';
    });

    // If return singular form if array length equals 1
    // else return plural
    // If forms are not passed, just return "s" for plural
    Handlebars.registerHelper('pluralize', function (array, singular, plural) {
      if ('string' !== typeof singular) singular = '';
      if ('string' !== typeof plural) plural = 's';
      var n = array;
      if (typeof array.length !== 'undefined') {
        n = array.length;
      }
      if (n && n === 1) {
        return singular;
      }
      return plural;
    });
  });
};
