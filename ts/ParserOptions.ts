import {IParseSpec} from './Specs';
import {MarkdownSpec} from './modes/markdown';

export class ParserOptions {
	parserMode: Array<IParseSpec> = [];
	compiled: boolean = false;
	sanitize: boolean = true;

	constructor(mode?: IParseSpec) {
		if (mode) {
			this.addMode(mode);
		} else {
			this.addMode(new MarkdownSpec());
		}	
	}	
	
	addMode(mode: IParseSpec) {
		this.parserMode.push(mode);
		this.compiled = false;
	}
}
