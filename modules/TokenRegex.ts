import {IToken} from './Token';

export enum TokenParseType {
	Inline,
	Block,
	InlineBlock
}

export interface ITokenRegex {
	regex: RegExp;
	parseType: TokenParseType;
	priority: number;
	
	// Any checks that need to be handled (is there an ending tag, is there content, etc)
	validate(matches: RegExpExecArray) : boolean;
	// Return the generated element
	apply(source: ISource, matches: RegExpExecArray) : Array<IToken>;
}

/**
 * How a Capture is handled and its value
 */
export interface ISource {
	source: string;
}