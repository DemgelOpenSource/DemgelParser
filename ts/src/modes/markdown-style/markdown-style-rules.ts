import {replace} from "../../Helpers";

export class MarkdownStyleRules {
    block = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n)+/,
        // code: /^( {4}[^\n]*)(?:\n+|$)/,
        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
        heading: /^ *(#{1,6})styles *([^\n]+?) *#* *(?:\n+|$)/,
        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
        paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|def))+)\n*/,
        text: /^[^\n]+/,

        bullet: /(?:[*+-]|\d+\.)/,
        item: /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/
    };

    inline = {
        escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
        autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  		// url: noop,
        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
        link: /^!?\[(inside)\]\(href\)/,
        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
        strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
        em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
        code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
        br: /^ {2,}\n(?!\s*$)/,
  		// del: noop,
        text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/,
        _inside: /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,
        _href: /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,

        span: /^\*?styles\s*\[([^\]]*)\]/
    };

    styles = /(?:{(.+)}|\[(.+)\])?/;

    constructor() {
        this.block.blockquote = replace(this.block.blockquote)
            ("def", this.block.def)
            ();

        this.block.heading = replace(this.block.heading)
            ("styles", this.styles)
            ();

        this.block.paragraph = replace(this.block.paragraph)
            ("hr", this.block.hr)
            ("heading", this.block.heading)
            ("lheading", this.block.lheading)
            ("blockquote", this.block.blockquote)
			// ('tag', '<' + this.block._tag)
            ("def", this.block.def)
            ();

        this.inline.link = replace(this.inline.link)
            ("inside", this.inline._inside)
            ("href", this.inline._href)
            ();

        this.inline.reflink = replace(this.inline.reflink)
            ("inside", this.inline._inside)
            ();

        this.inline.span = replace(this.inline.span)
            ("styles", this.styles)
            ();

        this.block.item = replace(this.block.item, "gm")
            (/bull/g, this.block.bullet)
            ();
        this.block.list = replace(this.block.list)
            (/bull/g, this.block.bullet)
            ("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")
            ("def", "\\n+(?=" + this.block.def.source + ")")
            ();
    }
}
