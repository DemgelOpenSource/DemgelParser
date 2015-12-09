import {ITokenRegex, ISource} from './TokenRegex';

export interface IParseSpec {
	regexTokens: Array<ITokenRegex>;
	
	preProcess(source: ISource);
}
