import {IParseSpec} from '../../Specs';
import {TokenParseType, ITokenRegex} from '../../TokenRegex';
import {ISource} from '../../Source';
import {IToken} from '../../Token';
import {replace, validateStyle, validateClass} from '../../Helpers';
import {ParserOptions} from '../../ParserOptions';
import {MarkdownStyleRules} from './markdown-style-rules';

export class MarkdownStyleSpec implements IParseSpec {
	regexTokens: Array<ITokenRegex>;
	rules = new MarkdownStyleRules();

	constructor() {		
		this.regexTokens = [
			new NewLine(this.rules.block.newline),
			new CodeBlock(this.rules.block.code),
			new HrBlock(this.rules.block.hr),
			new BlockQuote(this.rules.block.blockquote),
			new HeadingBlock(this.rules.block.heading),
			new LHeading(this.rules.block.lheading),
			new List(this.rules.block.list, this.rules.block.item),
			new Paragraph(this.rules.block.paragraph),
			new Text(this.rules.block.text),
			// Inline
			new SpanTag(this.rules.inline.span),
			new BoldText(this.rules.inline.strong),
			new ItalicText(this.rules.inline.em),
			new CodeText(this.rules.inline.code),
			new InlineText(this.rules.inline.text)
		]
	}
	
	preProcess(source: ISource) {
		source.source
				.replace(/\r\n|\r/g, '\n')
				.replace(/\t/g, '    ')
				.replace(/\u00e0/g, ' ')
				.replace(/\u2424/g, '\n');
	}
}

class NewLine implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Block;
	priority = 0;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
				
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		return [{}];
	}
}

class CodeBlock implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Block;
	priority = 1;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
				
	apply(source: ISource, matches: RegExpExecArray, options: ParserOptions) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		var cap = matches[0].replace(/^ {4}/gm, '');
		return [{openTag: '<pre><code>',
			closeTag: '</code></pre>\n', 
			text: {source: cap},
			sanitize: false}];
	}
}

class HrBlock implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Block;
	priority = 2;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
				
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		return [{openTag: '<hr>\n'}];
	}
}

class HeadingBlock implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Block;
	priority = 3;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
				
	apply(source: ISource, matches: RegExpExecArray, options: ParserOptions) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		var token = '<h' + matches[1].length;
		
		var styles = validateStyle(matches[2], options);
		if (styles !== '') {
			token = token + ' style="' + styles + '"';
		}
		var classes = validateClass(matches[3], options);
		if (classes !== '') {
			token = token + ' class="' + classes + '"';
		}
		
		token = token + '>';
		
		return [{openTag: token, 
			    closeTag: '</h' + matches[1].length + '>\n', 
			    text: {source: matches[4]}}];
	}
}

class LHeading implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Block;
	priority = 4;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
	
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		return [{openTag: '<h' + (matches[2] === '=' ? 1 : 2) + '>',
			closeTag: '</h' + (matches[2] === '=' ?  1 : 2) + '>\n',
			text: {source: matches[1]}}]
	}
}

// Code here is currently ported from marked... Thanks
class List implements ITokenRegex {
	parseType = TokenParseType.Block;
	priority = 6;
	
	constructor(public regex: RegExp, private itemReg: RegExp) {
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
	
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		
		var bull = matches[2];
		var items = matches[0].match(this.itemReg);
		var next: {next: boolean, source: ISource} = {next: false, source: {source: null}};
		
		var tokens: Array<IToken> = [];
		tokens.push({openTag: '<ul>'});
		
		for(var i = 0; i < items.length; i++) {
			var item = items[i];
			
			// Remove the list item's bullet
			var space = item.length;
			item = item.replace(/^ *([*+-]|\d+\.) +/, '');
			
			// Outdent
			if (~item.indexOf('\n ')) {
				space -= item.length;
				item = item.replace(new RegExp('^ {1,'+ space + '}', 'gm'), '');
			}
			
			// // Determine whether the next list item belongs here.
			// // Backpedal if it does not belong in this list.
			// if (this.options.smartLists && i !== l - 1) {
			//   b = block.bullet.exec(cap[i + 1])[0];
			//   if (bull !== b && !(bull.length > 1 && b.length > 1)) {
			//     src = cap.slice(i + 1).join('\n') + src;
			//     i = l - 1;
			//   }
			// }
				// Determine whether item is loose or not.
			// Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
			// for discount behavior.
			
        	var loose = next.next || /\n\n(?!\s*$)/.test(item);
        	if (i !== items.length - 1) {
          		next.next = item.charAt(item.length - 1) === '\n';
          		if (!loose) loose = next.next;
        	}
			
			// Add Token for item here (set to be parsed as inline)
			if (loose) {
				next.source.source = next.source.source + item;
			} else {
				tokens.push({openTag: '<li>'});
				tokens.push({text: next.source.source ? next.source : {source: item}, 
					processBlock: true});
				tokens.push({closeTag: '</li>\n'});
				next.source.source = null;
			}
		}
		
		// Add List item end
		tokens.push({closeTag: '</ul>\n'});
		return tokens;
	}
}

class Paragraph implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Block;
	priority = 5;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
	
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		return [{openTag: '<p>',
			closeTag: '</p>\n',
			text: {source: matches[1].charAt(matches[1].length - 1) === '\n' 
				? matches[1].slice(0, -1)
				: matches[1]}}]
	}
}

class Text implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Block;
	priority = 6;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
	
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		return [{text: {source: matches[0]}}]
	}
}

class BlockQuote implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Block;
	priority = 7;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
	
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		return [{
					openTag: '<blockquote>\n',
					text: {source: matches[0].replace(/^ *> ?/gm, '')},
					processBlock: true
				},
				{
					closeTag: '</blockquote>\n'
				}]
	}
}

/**
 * Inline Classes
 */

class SpanTag implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Inline;
	priority = 75;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate() : boolean {
		return true;
	}
	
	apply(source: ISource, matches: RegExpExecArray, options: ParserOptions) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		
		var token = '<span';
		
		var styles = validateStyle(matches[1], options);
		if (styles !== '') {
			token = token + ' style="' + styles + '"';
		}
		var classes = validateClass(matches[2], options);
		if (classes !== '') {
			token = token + ' class="' + classes + '"';
		}
		
		token = token + '>';
		
		return [{
					openTag: token,
					closeTag: '</span>',
					text: {source: matches[3]}
				}];
	}
}

class InlineText implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Inline;
	priority = 100;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
	
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		return [{
					text: {source: matches[0]}
				}];
	}
}

class BoldText implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Inline;
	priority = 90;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
	
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		return [{
					openTag: '<strong>',
					text: {source: matches[1]},
					closeTag: '</strong>',
				}];
	}
}

class ItalicText implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Inline;
	priority = 80;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
	
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		return [{
					openTag: '<em>',
					text: {source: matches[1]},
					closeTag: '</em>',
				}];
	}
}

class CodeText implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Inline;
	priority = 70;
	
	constructor(reg: RegExp) {
		this.regex = reg;
	}
	
	validate(matches: RegExpExecArray) : boolean {
		return true;
	}
	
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		return [{
					openTag: '<pre>',
					text: {source: matches[2]},
					closeTag: '</pre>',
				}];
	}
}