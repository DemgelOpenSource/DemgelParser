import {IParseSpec} from './Specs';
import {MarkdownSpec} from './modes/markdown/markdown';
import {replace} from './Helpers';

export class ParserOptions {
	parserMode: Array<IParseSpec> = [];
	compiled: boolean = false;
	sanitize: boolean = true;
	//allowedClasses: Array<string> = [];
	//allowedStyles: Array<string> = [];
	
	compiledClasses: RegExp = /^ *(classes)(?: *,|  *|$)|^  *|^\w* *,|^\w* *|^.*\n|^.*$/;
	compiledStyles: RegExp = /(^ *(styles) *: *(.[^;]*) *;?)|(?:^.*;|^.*\n|^.*$)/;

	constructor(mode?: IParseSpec) {
		if (mode) {
			this.addMode(mode);
		} else {
			this.addMode(new MarkdownSpec());
		}
	}	
	
	set allowedClasses(classList: Array<string>) {
		var classes: string = "";
		
		for(var i = 0; i < classList.length; i++) {
			if (i == 0) {
				classes = classes + classList[i];
			} else {
				classes = classes + "|" + classList[i];
			}
		}
		
		this.compiledClasses = replace(this.compiledClasses)
			("classes", classes)
			();
	}
	
	set allowedStyles(styleList: Array<string>) {
		var styles: string = "";
		
		for(var i = 0; i < styleList.length; i++) {
			if (i == 0) {
				styles = styles + styleList[i];
			} else {
				styles = styles + "|" + styleList[i];
			}
		}
		
		this.compiledStyles = replace(this.compiledStyles)
			("styles", styles)
			();
	}
	
	addMode(mode: IParseSpec) {
		this.parserMode.push(mode);
		this.compiled = false;
	}
}
