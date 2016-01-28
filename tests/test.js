var demgel_parser_1 = require("../demgel-parser");
var modes_1 = require("../modes");
var options = new demgel_parser_1.ParserOptions(new modes_1.MarkdownStyleSpec());
options.allowedStyles = ["color", "background"];
options.allowedClasses = ["red", "blue"];
var parser = new demgel_parser_1.DemgelParser(options);
// let parsed = parser.parse(`     
// ##[red2 dafsd,asdfas asdf blue] __hello__ world
//     this should be code <b>test</b>
//     asdfasfasfd
// ---
// Something
// ==
// justsomething <div>enocded?</div>
// > someblock _quote_ text
// > and somemore...
// > > and again <div>another Test</div>
// *{color: red}[something in red]
// *[blue][thing styled with class]
//  * list item one 
//  * list _item_ two
//  * list itme three
//  * * test
//  * * again
//  * another line
// awerasd
// hello __there__
// `);
var parsed = parser.parse("\n    some code\n    more code\n");
// parsed = parser.parse('test');
console.log(parsed);
//# sourceMappingURL=test.js.map