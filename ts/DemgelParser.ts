import {Renderer} from './Renderer';
import {TokenManager} from './TokenManager';
import {ParserOptions} from './ParserOptions';

export class DemgelParser {
	tokenManager: TokenManager;
	renderer: Renderer;
	options: ParserOptions;
	
	constructor(options?: ParserOptions) {
		if (options) {
			this.options = options;
		} else {
			this.options = new ParserOptions();
		}
		
		this.tokenManager = new TokenManager(this.options);
		this.renderer = new Renderer();
	}
	
	parse(source: string) : string {
		var tokens = this.tokenManager.tokenize({source: source});
		if (tokens.length > 0) {
			return this.renderer.renderTokens(tokens);
		}
		
		return "";
	}
}
