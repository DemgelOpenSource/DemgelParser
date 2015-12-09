var DemgelParser_1 = require('../DemgelParser');
var parser = new DemgelParser_1.DemgelParser();
var parsed = parser.parse("     \n## hello world\n\n    this should be code <b>test</b>\n---\nSomething\n==\njustsomething <div>enocded?</div>\n\n> someblock quote text\n> and somemore...\n> > and again <div>another Test</div>\n");
console.log(parsed);
//# sourceMappingURL=test.js.map