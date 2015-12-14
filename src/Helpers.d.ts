import { ParserOptions } from './ParserOptions';
export declare function escape(html: string, encode?: boolean): string;
export declare function unescape(html: string): string;
export declare function replace(regex: any, opt?: any): any;
export declare function validateStyle(source: string, options: ParserOptions): string;
export declare function validateClass(source: string, options: ParserOptions): string;
