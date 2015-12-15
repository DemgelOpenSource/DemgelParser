import { ISource } from './Source';
export interface IToken {
    openTag?: string;
    closeTag?: string;
    text?: ISource;
    processBlock?: boolean;
    inlineTokens?: Array<IToken>;
    sanitize?: boolean;
}
