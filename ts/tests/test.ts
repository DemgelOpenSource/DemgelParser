import {DemgelParser} from '../DemgelParser';
import {ParserOptions} from '../ParserOptions';
import {MarkdownStyleSpec} from '../modes/markdown-style/markdown-style'

var options = new ParserOptions(new MarkdownStyleSpec());
options.allowedStyles = ['color', 'background'];
options.allowedClasses = ['red', 'blue'];
var parser = new DemgelParser(options);
var parsed = parser.parse(`     
##[red2 dafsd,asdfas asdf blue3] hello world

    this should be code <b>test</b>
---
Something
==
justsomething <div>enocded?</div>

> someblock quote text
> and somemore...
> > and again <div>another Test</div>
`);

console.log(parsed);