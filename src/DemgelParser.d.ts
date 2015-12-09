import { Renderer } from './Renderer';
import { TokenManager } from './TokenManager';
import { ParserOptions } from './ParserOptions';
export declare class DemgelParser {
    tokenManager: TokenManager;
    renderer: Renderer;
    options: ParserOptions;
    constructor(options?: ParserOptions);
    parse(source: string): string;
}
