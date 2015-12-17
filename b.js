(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.parser = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./src/DemgelParser'));
__export(require('./src/ParserOptions'));
},{"./src/DemgelParser":2,"./src/ParserOptions":4}],2:[function(require,module,exports){
var Renderer_1 = require('./Renderer');
var TokenManager_1 = require('./TokenManager');
var ParserOptions_1 = require('./ParserOptions');
var DemgelParser = (function () {
    function DemgelParser(options) {
        if (options) {
            this.options = options;
        }
        else {
            this.options = new ParserOptions_1.ParserOptions();
        }
        this.tokenManager = new TokenManager_1.TokenManager(this.options);
        this.renderer = new Renderer_1.Renderer();
    }
    DemgelParser.prototype.parse = function (source) {
        var tokens = this.tokenManager.tokenize({ source: source });
        if (tokens.length > 0) {
            return this.renderer.renderTokens(tokens);
        }
        return "";
    };
    return DemgelParser;
})();
exports.DemgelParser = DemgelParser;
},{"./ParserOptions":4,"./Renderer":5,"./TokenManager":6}],3:[function(require,module,exports){
function escape(html, encode) {
    return html
        .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
exports.escape = escape;
function unescape(html) {
    return html.replace(/&([#\w]+);/g, function (_, n) {
        n = n.toLowerCase();
        if (n === 'colon')
            return ':';
        if (n.charAt(0) === '#') {
            return n.charAt(1) === 'x'
                ? String.fromCharCode(parseInt(n.substring(2), 16))
                : String.fromCharCode(+n.substring(1));
        }
        return '';
    });
}
exports.unescape = unescape;
function replace(regex, opt) {
    regex = regex.source;
    opt = opt || '';
    return function self(name, val) {
        if (!name)
            return new RegExp(regex, opt);
        val = val.source || val;
        val = val.replace(/(^|[^\[])\^/g, '$1');
        regex = regex.replace(name, val);
        return self;
    };
}
exports.replace = replace;
function validateStyle(source, options) {
    var retString = "";
    while (source) {
        var matches = options.compiledStyles.exec(source);
        if (matches) {
            source = source.substring(matches[0].length);
            if (matches[1]) {
                retString = retString + matches[2] + ": " + matches[3] + ";";
            }
        }
    }
    return retString;
}
exports.validateStyle = validateStyle;
function validateClass(source, options) {
    var retString = "";
    while (source) {
        var matches = options.compiledClasses.exec(source);
        if (matches) {
            source = source.substring(matches[0].length);
            if (matches[1]) {
                retString = retString + ((retString === '') ? '' : ' ') + matches[1];
            }
        }
    }
    return retString;
}
exports.validateClass = validateClass;
},{}],4:[function(require,module,exports){
var markdown_1 = require('./modes/markdown/markdown');
var Helpers_1 = require('./Helpers');
var ParserOptions = (function () {
    function ParserOptions(mode) {
        this.parserMode = [];
        this.compiled = false;
        this.sanitize = true;
        //allowedClasses: Array<string> = [];
        //allowedStyles: Array<string> = [];
        this.compiledClasses = /^ *(classes)(?: *,|  *|$)|^  *|^\w* *,|^\w* *|^.*\n|^.*$/;
        this.compiledStyles = /(^ *(styles) *: *(.[^;]*) *;?)|(?:^.*;|^.*\n|^.*$)/;
        if (mode) {
            this.addMode(mode);
        }
        else {
            this.addMode(new markdown_1.MarkdownSpec());
        }
    }
    Object.defineProperty(ParserOptions.prototype, "allowedClasses", {
        set: function (classList) {
            var classes = "";
            for (var i = 0; i < classList.length; i++) {
                if (i == 0) {
                    classes = classes + classList[i];
                }
                else {
                    classes = classes + "|" + classList[i];
                }
            }
            this.compiledClasses = Helpers_1.replace(this.compiledClasses)("classes", classes)();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParserOptions.prototype, "allowedStyles", {
        set: function (styleList) {
            var styles = "";
            for (var i = 0; i < styleList.length; i++) {
                if (i == 0) {
                    styles = styles + styleList[i];
                }
                else {
                    styles = styles + "|" + styleList[i];
                }
            }
            this.compiledStyles = Helpers_1.replace(this.compiledStyles)("styles", styles)();
        },
        enumerable: true,
        configurable: true
    });
    ParserOptions.prototype.addMode = function (mode) {
        this.parserMode.push(mode);
        this.compiled = false;
    };
    return ParserOptions;
})();
exports.ParserOptions = ParserOptions;
},{"./Helpers":3,"./modes/markdown/markdown":8}],5:[function(require,module,exports){
var Renderer = (function () {
    function Renderer() {
    }
    Renderer.prototype.renderTokens = function (tokens) {
        var retString = "";
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].openTag) {
                retString = retString + tokens[i].openTag;
            }
            if (tokens[i].text) {
                retString = retString + tokens[i].text.source;
                if (tokens[i].inlineTokens) {
                    retString = retString + this.renderTokens(tokens[i].inlineTokens);
                }
            }
            if (tokens[i].closeTag) {
                retString = retString + tokens[i].closeTag;
            }
        }
        return retString;
    };
    return Renderer;
})();
exports.Renderer = Renderer;
},{}],6:[function(require,module,exports){
var TokenRegex_1 = require('./TokenRegex');
var Helpers_1 = require('./Helpers');
var TokenManager = (function () {
    function TokenManager(options) {
        this.options = options;
        this._inline = [];
        this._block = [];
    }
    TokenManager.prototype.compileTokenRegex = function () {
        for (var i = 0; i < this.options.parserMode.length; i++) {
            // compile the modes
            for (var ii = 0; ii < this.options.parserMode[i].regexTokens.length; ii++) {
                var regex = this.options.parserMode[i].regexTokens[ii];
                switch (regex.parseType) {
                    case TokenRegex_1.TokenParseType.Block: {
                        this._block.push(regex);
                        break;
                    }
                    case TokenRegex_1.TokenParseType.Inline: {
                        this._inline.push(regex);
                        break;
                    }
                    case TokenRegex_1.TokenParseType.InlineBlock: {
                        this._inline.push(regex);
                        this._block.push(regex);
                        break;
                    }
                }
            }
        }
        // sort array
        this.options.compiled = true;
    };
    TokenManager.prototype.tokenize = function (source) {
        var tokens = [];
        if (!this.options.compiled) {
            // Compile the provided ParseSpecs
            this.compileTokenRegex();
        }
        for (var i = 0; i < this.options.parserMode.length; i++) {
            this.options.parserMode[i].preProcess(source);
        }
        source.source = source.source.replace(/^ +$/gm, '');
        while (source.source) {
            for (var i = 0; i < this._block.length; i++) {
                var regex = this._block[i];
                var matches = regex.regex.exec(source.source);
                if (matches && regex.validate(matches)) {
                    var retTokens = regex.apply(source, matches, this.options);
                    for (var ii = 0; ii < retTokens.length; ii++) {
                        tokens.push(retTokens[ii]);
                        if (retTokens[ii].processBlock) {
                            tokens = tokens.concat(this.tokenize(retTokens[ii].text));
                        }
                        this.tokenizeInline(retTokens[ii]);
                    }
                    break;
                }
            }
        }
        return tokens;
    };
    TokenManager.prototype.tokenizeInline = function (token) {
        if (!token.text || !token.text.source) {
            return;
        }
        token.inlineTokens = [];
        while (token.text.source) {
            for (var i = 0; i < this._inline.length; i++) {
                var regex = this._inline[i];
                var matches = regex.regex.exec(token.text.source);
                if (matches && regex.validate(matches)) {
                    var retTokens = regex.apply(token.text, matches, this.options);
                    for (var ii = 0; ii < retTokens.length; ii++) {
                        token.inlineTokens.push(retTokens[ii]);
                        if (this.options.sanitize) {
                            if (token.sanitize == null || (token.sanitize)) {
                                retTokens[ii].text.source = Helpers_1.escape(retTokens[ii].text.source);
                            }
                        }
                    }
                    break;
                }
            }
        }
    };
    return TokenManager;
})();
exports.TokenManager = TokenManager;
},{"./Helpers":3,"./TokenRegex":7}],7:[function(require,module,exports){
(function (TokenParseType) {
    TokenParseType[TokenParseType["Inline"] = 0] = "Inline";
    TokenParseType[TokenParseType["Block"] = 1] = "Block";
    TokenParseType[TokenParseType["InlineBlock"] = 2] = "InlineBlock";
})(exports.TokenParseType || (exports.TokenParseType = {}));
var TokenParseType = exports.TokenParseType;
},{}],8:[function(require,module,exports){
var TokenRegex_1 = require('../../TokenRegex');
var Helpers_1 = require('../../Helpers');
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
},{"../../Helpers":3,"../../TokenRegex":7}]},{},[1])(1)
});