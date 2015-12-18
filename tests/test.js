var demgel_parser_1 = require('../demgel-parser');
var modes_1 = require('../modes');
var options = new demgel_parser_1.ParserOptions(new modes_1.MarkdownStyleSpec());
options.allowedStyles = ['color', 'background'];
options.allowedClasses = ['red', 'blue'];
var parser = new demgel_parser_1.DemgelParser(options);
var parsed = parser.parse("     \n##[red2 dafsd,asdfas asdf blue] __hello__ " + '`world`' + "\n\n    this should be code <b>test</b>\n---\nSomething\n==\njustsomething <div>enocded?</div>\n\n> someblock _quote_ text\n> and somemore...\n> > and again <div>another Test</div>\n\n*{color: red}[something in red]\n*[blue][thing styled with class]\n\n * list item one \n * list _item_ two\n * list itme three\n * * test\n * * again\n * another line\n\nawerasd\nhello __there__\n");
// parsed = parser.parse('test');
console.log(parsed);
//# sourceMappingURL=test.js.map