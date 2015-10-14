

var fs = require('fs'),
path = require('path'),
completion = require('../lib/completion'),
argv = process.argv.slice(0, 2)
test = require('tape');
once = require('once');

var completionSh = fs.readFileSync(path.join(__dirname, '../lib/completion.sh'), 'utf8')
  .replace(/\{pkgname\}/g, 'foo')
  .replace(/{completer}/g, 'foo')
  .replace(/{ignoreWordbreaks}/g, '-n = -n @')
  .replace(/{ignoreColon}/g, '')
  .replace(/^\#\!.*?\n/, '');

var completer = path.join(__dirname, 'fixtures', 'completer.js');

test('executing script with just completion command and no COMP_*', function t(assert) {
  var end = once(function () {
    assert.end()
  })
  // prepare env variables and argv before requiring the completion module
  process.argv = argv.concat('completion');
  // reset COMP_* to a falsy value, other tests may have set them to something already
  delete process.env.COMP_CWORD;
  delete process.env.COMP_POINT;
  delete process.env.COMP_LINE;
  completion.complete('foo', function(err, results, script) {
    assert.ok(!err, err ? err.message : '');
    assert.ok(!results);
    assert.equal(script, completionSh, 'Script output different');
    end();
  });
});

// test('executing completion install', function t(assert) {
//   // prepare env variables and argv before requiring the completion module
//   process.argv = argv.concat('completion', 'install');
//   // reset COMP_* to a falsy value, other tests may have set them to something already
//   delete process.env.COMP_CWORD;
//   delete process.env.COMP_POINT;
//   delete process.env.COMP_LINE;
//   completion.complete('foo', 'node ' + completer, function (err, results, state) {
//     assert.ok(!err, err ? err.message : '');
//     assert.ok(!results);
//     assert.equal(state, ' ✓ node ' + completer + ' installed.', 'Script output different'); 
//     assert.end(); 
//   });
// });

// test('then executing completion uninstall', function t(assert) {
//   // prepare env variables and argv before requiring the completion module
//   process.argv = argv.concat('completion', 'uninstall');
//   // reset COMP_* to a falsy value, other tests may have set them to something already
//   delete process.env.COMP_CWORD;
//   delete process.env.COMP_POINT;
//   delete process.env.COMP_LINE;
//   completion.complete('foo', 'node ' + completer, function (err, results, state) {
//     console.log(arguments);
//     assert.ok(!err, err ? err.message : '');
//     assert.ok(!results);
//     assert.equal(state, ' ✓ node ' + completer + ' uninstalled.', 'Script output different');
//     assert.end();
//   });
// });
