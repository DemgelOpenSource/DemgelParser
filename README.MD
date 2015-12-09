# DemgelParser
DemgelParser is a simple parser for custom markup languages. It is written in completely in Typescript.

## Modes
DemgelParser uses ```modes``` to handle parsing. Modes are the backbone of this parser, and anyone can extend/create a mode.

### Examples
To see some example modes, look in the modes directory. Currently ```markdown``` is currently the most complete markup language supported.

## Caveats
DemgelParser was not written to be fast, it was written to be customizable. While it should still be fast enough for most website to render previews, don't expect blazing speeds on large pages. Eventually, with enough community help, this case could be removed, and this could became a truely useful and fast parser for markup languages.

## About
I Started writting this parser purely because I couldn't find a specialized parser that I could customize for my own needs on my website.
It has been a good learning experience and I would love anyones input to improve this project.