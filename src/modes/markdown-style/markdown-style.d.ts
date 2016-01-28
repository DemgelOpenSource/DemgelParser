import { IParseSpec } from "../../Specs";
import { ITokenRegex } from "../../TokenRegex";
import { ISource } from "../../Source";
import { MarkdownStyleRules } from "./markdown-style-rules";
export declare class MarkdownStyleSpec implements IParseSpec {
    regexTokens: Array<ITokenRegex>;
    rules: MarkdownStyleRules;
    constructor();
    preProcess(source: ISource): void;
}
