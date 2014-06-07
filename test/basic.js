describe('basic test', function () {
  var proc;

  before(function (done) {
    proc = spawn('node', ['example.js'], {cwd: example});
    process.on('exit', function () {
      proc.kill();
    });
    proc.stdout.on('data', function (data) {
      assert.equal(data.toString(), 'Listening on 0.0.0.0:3000\n');
      // @todo Not sure why delay needed.
      setTimeout(done, 10);
    });
  });

  after(function () {
    if (proc) proc.kill();
  });

  it('GET /', function (done) {
    request('http://localhost:3000', function (err, res, body) {
      assert.ifError(err);
      assert.equal(res.statusCode, 200);
      assert(res.headers['content-type'].match(/text\/html/));
      assert(res.body.indexOf('<h1>Example Site</h1>') > 0);
      assert(res.body.indexOf('<h2>Home</h2>') > 0);
      done();
    });
  });

  it('GET /page from second template dir', function (done) {
    request('http://localhost:3000/page', function (err, res, body) {
      assert.ifError(err);
      assert.equal(res.statusCode, 200);
      assert(res.headers['content-type'].match(/text\/html/));
      assert(res.body.indexOf('<h1>Example Site</h1>') > 0);
      assert(res.body.indexOf('<h2>Page</h2>') > 0);
      done();
    });
  });

  it('GET /css/style.css', function (done) {
    request('http://localhost:3000/css/style.css', function (err, res, body) {
      assert.ifError(err);
      assert.equal(res.statusCode, 200);
      assert(res.headers['content-type'].match(/text\/css/));
      assert(res.body.indexOf('body {') >= 0);
      done();
    });
  });

  it('GET a 404', function (done) {
    request('http://localhost:3000/notarealurl', function (err, res, body) {
      assert.ifError(err);
      assert.equal(res.statusCode, 404);
      assert(res.headers['content-type'].match(/text\/html/));
      assert(res.body.indexOf('<h2>Oops! Page Not Found</h2>') >= 0);
      done();
    });
  });
});