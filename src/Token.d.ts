import { ISource } from './TokenRegex';
export interface IToken {
    openTag?: string;
    closeTag?: string;
    text?: ISource;
    processBlock?: boolean;
    inlineTokens?: Array<IToken>;
    sanitize?: boolean;
}
