import { IToken } from "./Token";
import { ISource } from "./Source";
import { ParserOptions } from "./ParserOptions";
export declare class TokenManager {
    private options;
    private _inline;
    private _block;
    constructor(options: ParserOptions);
    /**
     * Add each RegexToken from each mode into the arrays
     */
    compileTokenRegex(): void;
    tokenize(source: ISource): Array<IToken>;
    tokenizeInline(token: IToken): void;
}
