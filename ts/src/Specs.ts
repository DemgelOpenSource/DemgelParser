import {ITokenRegex} from "./TokenRegex";
import {ISource} from "./Source";

export interface IParseSpec {
    regexTokens: Array<ITokenRegex>;

    preProcess(source: ISource);
}
