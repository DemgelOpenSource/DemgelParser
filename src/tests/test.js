var DemgelParser_1 = require('../DemgelParser');
var ParserOptions_1 = require('../ParserOptions');
var markdown_style_1 = require('../modes/markdown-style/markdown-style');
var options = new ParserOptions_1.ParserOptions(new markdown_style_1.MarkdownStyleSpec());
options.allowedStyles = ['color', 'background'];
options.allowedClasses = ['red', 'blue'];
var parser = new DemgelParser_1.DemgelParser(options);
var parsed = parser.parse("     \n##[red2 dafsd,asdfas asdf blue] hello world\n\n    this should be code <b>test</b>\n---\nSomething\n==\njustsomething <div>enocded?</div>\n\n> someblock quote text\n> and somemore...\n> > and again <div>another Test</div>\n\n*{color: red}[something in red]\n*[blue][thing styled with class]\n");
console.log(parsed);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiJ0cy8iLCJzb3VyY2VzIjpbInRlc3RzL3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFDN0MsOEJBQTRCLGtCQUFrQixDQUFDLENBQUE7QUFDL0MsK0JBQWdDLHdDQUVoQyxDQUFDLENBRnVFO0FBRXhFLElBQUksT0FBTyxHQUFHLElBQUksNkJBQWEsQ0FBQyxJQUFJLGtDQUFpQixFQUFFLENBQUMsQ0FBQztBQUN6RCxPQUFPLENBQUMsYUFBYSxHQUFHLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2hELE9BQU8sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLEdBQUcsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsNlNBZXpCLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMifQ==