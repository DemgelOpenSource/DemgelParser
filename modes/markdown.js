var TokenRegex_1 = require('../modules/TokenRegex');
var Helpers_1 = require('../Helpers');
var MarkdownSpec = (function () {
    function MarkdownSpec() {
        this.block = {
            newline: /^\n+/,
            code: /^( {4}[^\n]+\n*)+/,
            hr: /^( *[-*_]){3,} *(?:\n+|$)/,
            heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
            lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
            blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
            paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|def))+)\n*/,
            text: /^[^\n]+/
        };
        this.inline = {
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
        };
        this.block.blockquote = Helpers_1.replace(this.block.blockquote)('def', this.block.def)();
        this.block.paragraph = Helpers_1.replace(this.block.paragraph)('hr', this.block.hr)('heading', this.block.heading)('lheading', this.block.lheading)('blockquote', this.block.blockquote)('def', this.block.def)();
        this.inline.link = Helpers_1.replace(this.inline.link)('inside', this.inline._inside)('href', this.inline._href)();
        this.inline.reflink = Helpers_1.replace(this.inline.reflink)('inside', this.inline._inside)();
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
        ];
    }
    MarkdownSpec.prototype.preProcess = function (source) {
        source.source
            .replace(/\r\n|\r/g, '\n')
            .replace(/\t/g, '    ')
            .replace(/\u00e0/g, ' ')
            .replace(/\u2424/g, '\n');
    };
    return MarkdownSpec;
})();
exports.MarkdownSpec = MarkdownSpec;
var NewLine = (function () {
    function NewLine(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 0;
        this.regex = reg;
    }
    NewLine.prototype.validate = function (matches) {
        return true;
    };
    NewLine.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{}];
    };
    return NewLine;
})();
var CodeBlock = (function () {
    function CodeBlock(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 1;
        this.regex = reg;
    }
    CodeBlock.prototype.validate = function (matches) {
        return true;
    };
    CodeBlock.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        var cap = matches[0].replace(/^ {4}/gm, '');
        return [{ openTag: '<pre>\n\t<code>\n\t\t',
                closeTag: '\t</code>\n</pre>\n',
                text: { source: cap },
                sanitize: false }];
    };
    return CodeBlock;
})();
var HrBlock = (function () {
    function HrBlock(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 2;
        this.regex = reg;
    }
    HrBlock.prototype.validate = function (matches) {
        return true;
    };
    HrBlock.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{ openTag: '<hr>\n' }];
    };
    return HrBlock;
})();
var HeadingBlock = (function () {
    function HeadingBlock(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 3;
        this.regex = reg;
    }
    HeadingBlock.prototype.validate = function (matches) {
        return true;
    };
    HeadingBlock.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{ openTag: '<h' + matches[1].length + '>',
                closeTag: '</h' + matches[1].length + '>\n',
                text: { source: matches[2] } }];
    };
    return HeadingBlock;
})();
var LHeading = (function () {
    function LHeading(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 4;
        this.regex = reg;
    }
    LHeading.prototype.validate = function (matches) {
        return true;
    };
    LHeading.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{ openTag: '<h' + (matches[2] === '=' ? 1 : 2) + '>',
                closeTag: '</h' + (matches[2] === '=' ? 1 : 2) + '>\n',
                text: { source: matches[1] } }];
    };
    return LHeading;
})();
var Paragraph = (function () {
    function Paragraph(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 5;
        this.regex = reg;
    }
    Paragraph.prototype.validate = function (matches) {
        return true;
    };
    Paragraph.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{ openTag: '<p>',
                closeTag: '</p>\n',
                text: { source: matches[1].charAt(matches[1].length - 1) === '\n'
                        ? matches[1].slice(0, -1)
                        : matches[1] } }];
    };
    return Paragraph;
})();
var Text = (function () {
    function Text(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 6;
        this.regex = reg;
    }
    Text.prototype.validate = function (matches) {
        return true;
    };
    Text.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{ text: { source: matches[0] } }];
    };
    return Text;
})();
var BlockQuote = (function () {
    function BlockQuote(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 7;
        this.regex = reg;
    }
    BlockQuote.prototype.validate = function (matches) {
        return true;
    };
    BlockQuote.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{
                openTag: '<blockquote>\n',
                text: { source: matches[0].replace(/^ *> ?/gm, '') },
                processBlock: true
            },
            {
                closeTag: '</blockquote>\n'
            }];
    };
    return BlockQuote;
})();
var InlineText = (function () {
    function InlineText(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Inline;
        this.priority = 10;
        this.regex = reg;
    }
    InlineText.prototype.validate = function (matches) {
        return true;
    };
    InlineText.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{ text: { source: matches[0] } }];
    };
    return InlineText;
})();
//# sourceMappingURL=markdown.js.map