import { IParseSpec } from '../../Specs';
import { ITokenRegex } from '../../TokenRegex';
import { ISource } from '../../Source';
export declare class MarkdownSpec implements IParseSpec {
    regexTokens: Array<ITokenRegex>;
    block: {
        newline: RegExp;
        code: RegExp;
        hr: RegExp;
        heading: RegExp;
        lheading: RegExp;
        list: RegExp;
        blockquote: RegExp;
        def: RegExp;
        paragraph: RegExp;
        text: RegExp;
        bullet: RegExp;
        item: RegExp;
    };
    inline: {
        escape: RegExp;
        autolink: RegExp;
        tag: RegExp;
        link: RegExp;
        reflink: RegExp;
        nolink: RegExp;
        strong: RegExp;
        em: RegExp;
        code: RegExp;
        br: RegExp;
        text: RegExp;
        _inside: RegExp;
        _href: RegExp;
    };
    constructor();
    preProcess(source: ISource): void;
}
