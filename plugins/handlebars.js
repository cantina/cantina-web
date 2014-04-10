var app = require('cantina')
  , moment = require('moment')
  , _ = require('underscore');

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


// is block helper.
app.Handlebars.registerHelper('is', function (context, options) {
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
app.Handlebars.registerHelper('isnt', function (context, options) {
  if (typeof options.hash !== 'undefined') {
    if (typeof options.hash.equal !== 'undefined') {
      if (context !== options.hash.equal) {
        return options.fn(this);
      }
    }
  }
  return options.inverse(this);
});

// first helper.
app.Handlebars.registerHelper('first', function (context, options) {
  if (options.data.index === 0) {
    return options.fn(this);
  }
  else {
    return options.inverse(this);
  }
});

// notfirst helper.
app.Handlebars.registerHelper('notfirst', function (context, options) {
  if (options.data.index === 0) {
    return options.inverse(this);
  }
  else {
    return options.fn(this);
  }
});

// Repeat N times.
app.Handlebars.registerHelper('repeat', function (num, options) {
  var content = '';
  for (var i = 0; i < num; i++) {
    this.index = i;
    content += options.fn(this);
  }
  return content;
});

// Handlebars length helper.
app.Handlebars.registerHelper('length', function (array) {
  return array ? array.length : 'N/A';
});

// If return singular form if array length equals 1
// else return plural
// If forms are not passed, just return "s" for plural
app.Handlebars.registerHelper('pluralize', function (array, singular, plural) {
  if ('string' !== typeof singular) singular = '';
  if ('string' !== typeof plural) plural = 's';
  if (array.length && array.length === 1) {
    return singular;
  }
  return plural;
});

// Handlebars moment helpers.
app.Handlebars.registerHelper('moment', function (timestamp, format) {
  return moment.utc(timestamp).local().format(format);
});
app.Handlebars.registerHelper('fromNow', function (timestamp, forceadjust) {
  // Optionally ensure that the timestamp is not in the future.
  // We use this when posting new comments to avoid the situation where the
  // user's system clock is lagging the server's clock, which results in
  // moment#fromNow() reports "in a few seconds", which is confusing and idiotic.
  // Instead, if the server timestamp is "in the future", we just set it to the
  // current time.
  if (forceadjust && moment.utc(timestamp).diff() > 0) {
    timestamp = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  }
  return new app.Handlebars.SafeString('<span class="fromNow" data-timestamp="' + timestamp + '">' + moment.utc(timestamp).fromNow() + '</span>');
});

app.Handlebars.registerHelper('or', function (var1, var2, options) {
  if (var1 || var2) {
    return options.fn(this);
  }
  else {
    return options.inverse(this);
  }
});

app.Handlebars.registerHelper('and', function (var1, var2, options) {
  if (var1 && var2) {
    return options.fn(this);
  }
  else {
    return options.inverse(this);
  }
});

app.Handlebars.registerHelper('nor', function (var1, var2, options) {
  if (!(var1 || var2)) {
    return options.fn(this);
  }
  else {
    return options.inverse(this);
  }
});