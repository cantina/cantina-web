Cantina: Web
============

A stack of cantina plugins that sets up a ready-to-go web application.

*Cantina Version:* **4.x**

Inspired by [Motley](https://github.com/carlos8f/motley).

Features
========

- Http Server
- Middleware Stack ([middler](https://github.com/carlos8f/node-midler))
- Static File Server ([buffet](https://github.com/carlos8f/node-buffet))
- Views & Templates ([templ](https://github.com/carlos8f/templ))
- Useful utilities and middleware including:
    - Form body parsing
    - Express compatibility
    - Controllers pattern
    - Weighted middleware loader

How to Use
==========

Just load the `cantina-web` plugin into your `cantina` application, invoke
the 'web' loader, and you'll have a simple, but full web stack at your disposal.

```js
var app = require('cantina').createApp();

app.boot(function (err) {
  // Handle err.
  if (err) throw err;

  // Load cantina-web.
  app.require('cantina-web');

  // Load the 'web' stack.
  app.load('web');

  // Or, if you prefer, load the parts separately...
  // app.load('plugins');
  // app.load('views');
  // app.load('static', {dir: 'public'});
  // app.load('middleware');
  // app.load('controllers');

  // Start the app.
  app.start();
});
```

By default, the `web` loader expects your appliation root to be structured like:

```
 ├─┬ controllers/
 ├─┬ etc/
 │ └── conf.yaml
 ├─┬ middleware/
 ├── plugins/
 ├─┬ public/
 ├─┬ views/
 │ ├── index.hbs
 │ ├── layout.hbs
 │ └── status-404.hbs
 ├── server.js
 └── package.json
```

See the example app for a more customized example.

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.
