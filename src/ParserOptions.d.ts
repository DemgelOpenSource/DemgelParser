import { IParseSpec } from './Specs';
export declare class ParserOptions {
    parserMode: Array<IParseSpec>;
    compiled: boolean;
    sanitize: boolean;
    compiledClasses: RegExp;
    compiledStyles: RegExp;
    constructor(mode?: IParseSpec);
    allowedClasses: Array<string>;
    allowedStyles: Array<string>;
    addMode(mode: IParseSpec): void;
}
