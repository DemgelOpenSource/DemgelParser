[![demgel MyGet Build Status](https://www.myget.org/BuildSource/Badge/demgel?identifier=ac684281-7c39-4236-ae97-d3ebc261324f)](https://www.myget.org/)

# DemgelParser
DemgelParser is a simple parser for custom markup languages. It is written in completely in Typescript.

## Modes
DemgelParser uses ```modes``` to handle parsing. Modes are the backbone of this parser, and anyone can extend/create a mode.

### Examples
To see some example modes, look in the modes directory. Currently ```markdown``` is currently the most complete markup language supported.

## Usage

``` typescript
import {DemgelParser} from '../DemgelParser';

var parser = new DemgelParser();
var parsed = parser.parse(`## I am using DemgelParser`);
```

## Downloads
Currently the npm and bower are hosted on Myget (add link to myget for information). You will need to follow instructions use the public feed there.

Otherwise if you can always use this repo to download with NPM and Bower directly, or select one of the Release files.

## Caveats
DemgelParser was not written to be fast, it was written to be customizable. While it should still be fast enough for most website to render previews, don't expect blazing speeds on large pages. Eventually, with enough community help, this case could be removed, and this could became a truely useful and fast parser for markup languages.

## About
I Started writting this parser purely because I couldn't find a specialized parser that I could customize for my own needs on my website.
It has been a good learning experience and I would love anyones input to improve this project.