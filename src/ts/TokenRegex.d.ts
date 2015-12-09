import { IToken } from './Token';
export declare enum TokenParseType {
    Inline = 0,
    Block = 1,
    InlineBlock = 2,
}
export interface ITokenRegex {
    regex: RegExp;
    parseType: TokenParseType;
    priority: number;
    validate(matches: RegExpExecArray): boolean;
    apply(source: ISource, matches: RegExpExecArray): Array<IToken>;
}
export interface ISource {
    source: string;
}
