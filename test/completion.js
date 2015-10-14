

var completion = require('../lib/completion');
var test = require('tape');

test('basic completion on a foo command', function t(assert) {
  // prepare env variables and argv before requiring the completion module
  process.argv = process.argv.slice(0, 2).concat('completion');
  process.env.COMP_CWORD = 1;
  process.env.COMP_POINT = 10;
  process.env.COMP_LINE = 'foo foobarbaaaz';
  completion.complete('foo', function (err, results) {
    assert.deepEqual(results, { 
      line: 'foo foobarbaaaz',
      words: 1,
      point: 10,
      partial: 'foo foobar',
      last: 'foobarbaaaz',
      prev: 'foo',
      lastPartial: 'foobar'
    });
    assert.end();
  });
});
