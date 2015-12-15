import {IParseSpec} from '../../Specs';
import {TokenParseType, ITokenRegex} from '../../TokenRegex';
import {ISource} from '../../Source';
import {IToken} from '../../Token';
import {replace} from '../../Helpers'

export class MarkdownSpec implements IParseSpec {
	regexTokens: Array<ITokenRegex>;
	block = {
		newline: /^\n+/,
		code: /^( {4}[^\n]+\n*)+/,
		hr: /^( *[-*_]){3,} *(?:\n+|$)/,
		heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
		lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
		blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
		def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
		paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|def))+)\n*/,
  		text: /^[^\n]+/
	}
	
	inline = {
		escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  		autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  		//url: noop,
  		tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  		link: /^!?\[(inside)\]\(href\)/,
  		reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  		nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  		strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  		em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  		code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  		br: /^ {2,}\n(?!\s*$)/,
  		//del: noop,
  		text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/,
		_inside: /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,
		_href: /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/
	}
	
	constructor() {
		this.block.blockquote = replace(this.block.blockquote)
  			('def', this.block.def)
  			();
		this.block.paragraph = replace(this.block.paragraph)
			('hr', this.block.hr)
			('heading', this.block.heading)
			('lheading', this.block.lheading)
			('blockquote', this.block.blockquote)
			// ('tag', '<' + this.block._tag)
			('def', this.block.def)
			();

		this.inline.link = replace(this.inline.link)
  			('inside', this.inline._inside)
  			('href', this.inline._href)
  			();

		this.inline.reflink = replace(this.inline.reflink)
  			('inside', this.inline._inside)
  			();
		
		this.regexTokens = [
			new NewLine(this.block.newline),
			new CodeBlock(this.block.code),
			new HrBlock(this.block.hr),
			new BlockQuote(this.block.blockquote),
			new HeadingBlock(this.block.heading),
			new LHeading(this.block.lheading),
			new Paragraph(this.block.paragraph),
			new Text(this.block.text),
			// Inline
			new InlineText(this.inline.text)
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
				
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		var cap = matches[0].replace(/^ {4}/gm, '');
		return [{openTag: '<pre>\n\t<code>\n\t\t',
			closeTag: '\t</code>\n</pre>\n', 
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
				
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken> {
		source.source = source.source.substring(matches[0].length);
		return [{openTag: '<h' + matches[1].length + '>', 
			    closeTag: '</h' + matches[1].length + '>\n', 
			    text: {source: matches[2]}}];
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

class InlineText implements ITokenRegex {
	regex: RegExp;
	parseType = TokenParseType.Inline;
	priority = 10;
	
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