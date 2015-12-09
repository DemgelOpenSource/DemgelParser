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
                    var retTokens = regex.apply(source, matches);
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
                    var retTokens = regex.apply(token.text, matches);
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
