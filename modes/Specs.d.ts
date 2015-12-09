import {ITokenRegex, ISource} from '../modules/TokenRegex';

export interface IParseSpec {
	regexTokens: Array<ITokenRegex>;
	
	preProcess(source: ISource);
}
