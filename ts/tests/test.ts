import {DemgelParser, ParserOptions} from "../demgel-parser";
import {MarkdownStyleSpec} from "../modes";

let options = new ParserOptions(new MarkdownStyleSpec());
options.allowedStyles = ["color", "background"];
options.allowedClasses = ["red", "blue"];
let parser = new DemgelParser(options);
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

let parsed = parser.parse(`
    some code
    more code
`)

// parsed = parser.parse('test');
console.log(parsed);