import {IToken} from "./Token";
import {ITokenRegex, TokenParseType} from "./TokenRegex";
import {ISource} from "./Source";
import {ParserOptions} from "./ParserOptions";
import {escape} from "./Helpers";

export class TokenManager {
    private _inline: Array<ITokenRegex> = [];
    private _block: Array<ITokenRegex> = [];

    constructor(private options: ParserOptions) {
    }

    /**
     * Add each RegexToken from each mode into the arrays
     */
    compileTokenRegex() {
        for (let i = 0; i < this.options.parserMode.length; i++) {
            for (let ii = 0; ii < this.options.parserMode[i].regexTokens.length; ii++) {
                let regexToken = this.options.parserMode[i].regexTokens[ii];
                switch (regexToken.parseType) {
                    case TokenParseType.Block: {
                        this._block.push(regexToken);
                        break;
                    }
                    case TokenParseType.Inline: {
                        this._inline.push(regexToken);
                        break;
                    }
                    case TokenParseType.InlineBlock: {
                        this._inline.push(regexToken);
                        this._block.push(regexToken);
                        break;
                    }
                }
            }
        }

		// sort array

        this.options.compiled = true;
    }

    tokenize(source: ISource): Array<IToken> {
        if (!this.options.compiled) {
			// Compile the provided ParseSpecs
            this.compileTokenRegex();
        }

        for (let i = 0; i < this.options.parserMode.length; i++) {
            this.options.parserMode[i].preProcess(source);
        }

        source.source = source.source.replace(/^ +$/gm, "");

        let regex: ITokenRegex;
        let matches: RegExpExecArray;
        let retTokens: IToken[];
        let tokens: Array<IToken> = [];

        while (source.source) {
            for (let i = 0; i < this._block.length; i++) {
                regex = this._block[i];
                matches = regex.regex.exec(source.source);
                if (matches && regex.validate(matches)) {
                    retTokens = regex.apply(source, matches, this.options);
                    for (let ii = 0; ii < retTokens.length; ii++) {
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
    }

    tokenizeInline(token: IToken) {
        if (!token.text || !token.text.source) {
            return;
        }

        token.inlineTokens = [];
        let regex: ITokenRegex;
        let matches: RegExpExecArray;
        let retTokens: IToken[];

        while (token.text.source) {
            for (let i = 0; i < this._inline.length; i++) {
                regex = this._inline[i];
                matches = regex.regex.exec(token.text.source);
                if (matches && regex.validate(matches)) {
                    retTokens = regex.apply(token.text, matches, this.options);
                    for (let ii = 0; ii < retTokens.length; ii++) {
                        token.inlineTokens.push(retTokens[ii]);
                        if (this.options.sanitize) {
                            if (token.sanitize == null || (token.sanitize)) {
                                retTokens[ii].text.source = escape(retTokens[ii].text.source);
                            }
                        }
                    }
                    break;
                }
            }
        }
    }
}
