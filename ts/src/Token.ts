import {ISource}  from "./Source";

export interface IToken {
	// The open tag with styles
    openTag?: string;
	// The closing tag
    closeTag?: string;
	// This will get parsed with In-Line if it exists
    text?: ISource;
	// Should we process text as Block or Inline
    processBlock?: boolean;
	// Inline processed Tokens
    inlineTokens?: Array<IToken>;
	// Override sanitize
    sanitize?: boolean;
}
