import {DemgelParser} from '../DemgelParser';

var parser = new DemgelParser();
var parsed = parser.parse(`     
## hello world

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