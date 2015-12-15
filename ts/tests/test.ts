import {DemgelParser} from '../src/DemgelParser';
import {ParserOptions} from '../src/ParserOptions';
import {MarkdownStyleSpec} from '../src/modes/markdown-style/markdown-style'

var options = new ParserOptions(new MarkdownStyleSpec());
options.allowedStyles = ['color', 'background'];
options.allowedClasses = ['red', 'blue'];
var parser = new DemgelParser(options);
var parsed = parser.parse(`     
##[red2 dafsd,asdfas asdf blue] hello world

    this should be code <b>test</b>
---
Something
==
justsomething <div>enocded?</div>

> someblock quote text
> and somemore...
> > and again <div>another Test</div>

*{color: red}[something in red]
*[blue][thing styled with class]
`);

console.log(parsed);