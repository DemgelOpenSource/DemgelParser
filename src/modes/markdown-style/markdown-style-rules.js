var Helpers_1 = require('../../Helpers');
var MarkdownStyleRules = (function () {
    function MarkdownStyleRules() {
        this.block = {
            newline: /^\n+/,
            code: /^( {4}[^\n]+\n*)+/,
            hr: /^( *[-*_]){3,} *(?:\n+|$)/,
            heading: /^ *(#{1,6})styles *([^\n]+?) *#* *(?:\n+|$)/,
            lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
            blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
            paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|def))+)\n*/,
            text: /^[^\n]+/
        };
        this.inline = {
            escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
            autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
            //url: noop,
            tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
            link: /^!?\[(inside)\]\(href\)/,
            reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
            nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
            strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
            em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
            code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
            br: /^ {2,}\n(?!\s*$)/,
            //del: noop,
            text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/,
            _inside: /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,
            _href: /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,
            span: /^\*?styles\s*\[([^\]]*)\]/
        };
        this.styles = /(?:{(.+)}|\[(.+)\])?/;
        this.block.blockquote = Helpers_1.replace(this.block.blockquote)('def', this.block.def)();
        this.block.heading = Helpers_1.replace(this.block.heading)('styles', this.styles)();
        this.block.paragraph = Helpers_1.replace(this.block.paragraph)('hr', this.block.hr)('heading', this.block.heading)('lheading', this.block.lheading)('blockquote', this.block.blockquote)('def', this.block.def)();
        this.inline.link = Helpers_1.replace(this.inline.link)('inside', this.inline._inside)('href', this.inline._href)();
        this.inline.reflink = Helpers_1.replace(this.inline.reflink)('inside', this.inline._inside)();
        this.inline.span = Helpers_1.replace(this.inline.span)('styles', this.styles)();
    }
    return MarkdownStyleRules;
})();
exports.MarkdownStyleRules = MarkdownStyleRules;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tc3R5bGUtcnVsZXMuanMiLCJzb3VyY2VSb290IjoidHMvIiwic291cmNlcyI6WyJzcmMvbW9kZXMvbWFya2Rvd24tc3R5bGUvbWFya2Rvd24tc3R5bGUtcnVsZXMudHMiXSwibmFtZXMiOlsiTWFya2Rvd25TdHlsZVJ1bGVzIiwiTWFya2Rvd25TdHlsZVJ1bGVzLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSx3QkFBc0IsZUFBZSxDQUFDLENBQUE7QUFFdEM7SUFtQ0NBO1FBbENBQyxVQUFLQSxHQUFHQTtZQUNQQSxPQUFPQSxFQUFFQSxNQUFNQTtZQUNmQSxJQUFJQSxFQUFFQSxtQkFBbUJBO1lBQ3pCQSxFQUFFQSxFQUFFQSwyQkFBMkJBO1lBQy9CQSxPQUFPQSxFQUFFQSw2Q0FBNkNBO1lBQ3REQSxRQUFRQSxFQUFFQSxtQ0FBbUNBO1lBQzdDQSxVQUFVQSxFQUFFQSxvQ0FBb0NBO1lBQ2hEQSxHQUFHQSxFQUFFQSxtRUFBbUVBO1lBQ3hFQSxTQUFTQSxFQUFFQSw0REFBNERBO1lBQ3JFQSxJQUFJQSxFQUFFQSxTQUFTQTtTQUNqQkEsQ0FBQUE7UUFFREEsV0FBTUEsR0FBR0E7WUFDUkEsTUFBTUEsRUFBRUEsNkJBQTZCQTtZQUNuQ0EsUUFBUUEsRUFBRUEsMEJBQTBCQTtZQUNwQ0EsWUFBWUE7WUFDWkEsR0FBR0EsRUFBRUEsd0RBQXdEQTtZQUM3REEsSUFBSUEsRUFBRUEseUJBQXlCQTtZQUMvQkEsT0FBT0EsRUFBRUEsZ0NBQWdDQTtZQUN6Q0EsTUFBTUEsRUFBRUEsa0NBQWtDQTtZQUMxQ0EsTUFBTUEsRUFBRUEsZ0RBQWdEQTtZQUN4REEsRUFBRUEsRUFBRUEsdURBQXVEQTtZQUMzREEsSUFBSUEsRUFBRUEsa0NBQWtDQTtZQUN4Q0EsRUFBRUEsRUFBRUEsa0JBQWtCQTtZQUN0QkEsWUFBWUE7WUFDWkEsSUFBSUEsRUFBRUEsb0NBQW9DQTtZQUM1Q0EsT0FBT0EsRUFBRUEsd0NBQXdDQTtZQUNqREEsS0FBS0EsRUFBRUEsZ0RBQWdEQTtZQUV2REEsSUFBSUEsRUFBRUEsMkJBQTJCQTtTQUNqQ0EsQ0FBQUE7UUFFREEsV0FBTUEsR0FBR0Esc0JBQXNCQSxDQUFDQTtRQUcvQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBVUEsR0FBR0EsaUJBQU9BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFVBQVVBLENBQUNBLENBQ2xEQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUNyQkEsQ0FBQ0E7UUFFSEEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsR0FBR0EsaUJBQU9BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLENBQ2pEQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUNyQkEsQ0FBQ0E7UUFFSkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsR0FBR0EsaUJBQU9BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLENBQ2xEQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUNwQkEsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FDOUJBLFVBQVVBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLENBQ2hDQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUVwQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFDckJBLENBQUNBO1FBRUpBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEdBQUdBLGlCQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUN4Q0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FDOUJBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLEVBQ3pCQSxDQUFDQTtRQUVOQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxHQUFHQSxpQkFBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FDOUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLEVBQzdCQSxDQUFDQTtRQUVOQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxHQUFHQSxpQkFBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FDMUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEVBQ3JCQSxDQUFDQTtJQUNMQSxDQUFDQTtJQUNGRCx5QkFBQ0E7QUFBREEsQ0FBQ0EsQUFsRUQsSUFrRUM7QUFsRVksMEJBQWtCLHFCQWtFOUIsQ0FBQSJ9