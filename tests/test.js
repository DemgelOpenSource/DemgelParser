var demgel_parser_1 = require('../demgel-parser');
var modes_1 = require('../modes');
var options = new demgel_parser_1.ParserOptions(new modes_1.MarkdownStyleSpec());
options.allowedStyles = ['color', 'background'];
options.allowedClasses = ['red', 'blue'];
var parser = new demgel_parser_1.DemgelParser(options);
var parsed = parser.parse("     \n##[red2 dafsd,asdfas asdf blue] hello world\n\n    this should be code <b>test</b>\n---\nSomething\n==\njustsomething <div>enocded?</div>\n\n> someblock quote text\n> and somemore...\n> > and again <div>another Test</div>\n\n*{color: red}[something in red]\n*[blue][thing styled with class]\n");
console.log(parsed);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiJ0cy8iLCJzb3VyY2VzIjpbInRlc3RzL3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOEJBQTBDLGtCQUFrQixDQUFDLENBQUE7QUFDN0Qsc0JBQWdDLFVBQVUsQ0FBQyxDQUFBO0FBRTNDLElBQUksT0FBTyxHQUFHLElBQUksNkJBQWEsQ0FBQyxJQUFJLHlCQUFpQixFQUFFLENBQUMsQ0FBQztBQUN6RCxPQUFPLENBQUMsYUFBYSxHQUFHLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2hELE9BQU8sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLEdBQUcsSUFBSSw0QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsNlNBZXpCLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMifQ==