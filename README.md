Cantina: Web
============

A stack of cantina plugins that sets up a ready-to-go web application.

*Cantina Version:* **3.x**

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
    - Auto plugin loading
    - Auto middleware loading

How to Use
==========

Just include the `cantina-web` plugin in your `cantina` application and you'll
have a simple, but full web stack at your disposal.

```js
var app = require('cantina');

app.boot(function (err) {
  // Handle err.
  if (err) throw err;

  // Load cantina-web.
  require('cantina-web');

  // Start the app.
  app.start();
});
```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT
Copyright (C) 2013 Terra Eclipse, Inc. ([http://www.terraeclipse.com](http://www.terraeclipse.com))

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
