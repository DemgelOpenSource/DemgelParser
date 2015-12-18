export declare class MarkdownStyleRules {
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
        span: RegExp;
    };
    styles: RegExp;
    constructor();
}
