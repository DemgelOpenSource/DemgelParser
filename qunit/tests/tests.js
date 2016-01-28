/* global demgelparser */
/* global test */
/* global QUnit */
var log = [];
var testName;
QUnit.done = function (test_results) {
  var tests = log.map(function(details){
    return {
      name: details.name,
      result: details.result,
      expected: details.expected,
      actual: details.actual,
      source: details.source
    }
  });
  test_results.tests = tests;

  // delaying results a bit cause in real-world
  // scenario you won't get them immediately
  setTimeout(function () { window.global_test_results = test_results; }, 2000);
};
QUnit.testStart(function(testDetails){
  QUnit.log = function(details){
    if (!details.result) {
      details.name = testDetails.name;
      log.push(details);
    }
  }
});

test( "should result in <p>test</p>", function( assert ) {
  var parser = new demgelparser.DemgelParser();
  var parsed = parser.parse("test");
  assert.ok( parsed === "<p>test</p>", parsed );
});

test( "code block test", function( assert ) {
   var parser = new demgelparser.DemgelParser();
   var parsed = parser.parse(`
    some code
    more code
`);
    assert.ok( parsed === `<pre><code>some code\nmore code\n</code></pre>\n`); 
});