describe('load order', function () {
  var proc;

  before(function (done) {
    proc = spawn('node', ['load.js'], {cwd: load});
    process.on('exit', function () {
      proc.kill();
    });
    done();
  });

  after(function () {
    if (proc) proc.kill();
  });

  it('loads things in the right order', function (done) {
    var items = ['plugin\n', 'middleware\n', 'controller\n'];
    proc.stdout.on('data', function (data) {
      var check = items.shift();
      assert.equal(data.toString(), check);
      if (!items.length || data.toString() !== check) {
        done();
      }
    });
  });
});