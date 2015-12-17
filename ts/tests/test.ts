import {DemgelParser, ParserOptions} from '../demgel-parser';
import {MarkdownStyleSpec} from '../modes';

var options = new ParserOptions(new MarkdownStyleSpec());
options.allowedStyles = ['color', 'background'];
options.allowedClasses = ['red', 'blue'];
var parser = new DemgelParser(options);
var parsed = parser.parse(`     
##[red2 dafsd,asdfas asdf blue] __hello__ ` + '`world`' +`

    this should be code <b>test</b>
---
Something
==
justsomething <div>enocded?</div>

> someblock _quote_ text
> and somemore...
> > and again <div>another Test</div>

*{color: red}[something in red]
*[blue][thing styled with class]
`);

parsed = parser.parse('test');
console.log(parsed);