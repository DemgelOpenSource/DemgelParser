## Markdown With Styles
Markdown with Styles is a simple modification to show how Demgel-Parser can be used to create custom rendering specs. It simply allows for the addition of ```styles``` or ```classes``` to markdown.

## Usages
### Styles
Add the ```'color: red'``` style to a header
``` markdown
##{color: red} Header Text
```
Output:
``` html
<h2 style="color: red">Header Text</h2>
```
### Classes
Add a class called red style to a header
``` markdown
##[red] Header Text
```
Output:
``` html
<h2 class="red">Header Text</h2>
```
### Initializing
``` typescript
var options = new ParserOptions(new MarkdownStyleSpec());
options.allowedStyles = ['color', 'background'];
options.allowedClasses = ['red', 'blue'];
var parser = new DemgelParser(options);
```
## Current Status
Currently markdown with styles is limited, as more inline functions in the markdown mode get completed more options will become available in markdown with styles.