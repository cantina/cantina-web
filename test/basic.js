describe('basic test', function () {
  var proc;

  before(function (done) {
    proc = spawn('node', ['example.js'], {cwd: example});
    process.on('exit', function () {
      proc.kill();
    });
    proc.stdout.on('data', function (data) {
      assert.equal(data.toString(), 'Listening on 0.0.0.0:3000\n');
      done();
    });
  });

  after(function () {
    if (proc) proc.kill();
  });

  it('GET /css/style.css', function (done) {
    request('http://localhost:3000/css/style.css', function (err, res, body) {
      assert.ifError(err);
      assert.equal(res.statusCode, 200);
      assert(res.headers['content-type'].match(/text\/css/));
      done();
    });
  });
});