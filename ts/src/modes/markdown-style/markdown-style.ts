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
			new Paragraph(this.rules.block.paragraph),
			new Text(this.rules.block.text),
			// Inline
			new SpanTag(this.rules.inline.span),
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
		console.log(matches);
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
		return [{text: {source: matches[0]}}]
	}
}