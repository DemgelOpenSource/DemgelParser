import { IParseSpec } from './Specs';
export declare class ParserOptions {
    parserMode: Array<IParseSpec>;
    compiled: boolean;
    sanitize: boolean;
    constructor(mode?: IParseSpec);
    addMode(mode: IParseSpec): void;
}
