import { IToken } from './Token';
import { ISource } from './TokenRegex';
import { ParserOptions } from './ParserOptions';
export declare class TokenManager {
    private options;
    private _inline;
    private _block;
    constructor(options: ParserOptions);
    compileTokenRegex(): void;
    tokenize(source: ISource): Array<IToken>;
    tokenizeInline(token: IToken): void;
}
