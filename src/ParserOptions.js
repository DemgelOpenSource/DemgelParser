var markdown_1 = require("./modes/markdown/markdown");
var Helpers_1 = require("./Helpers");
var ParserOptions = (function () {
    function ParserOptions(mode) {
        this.parserMode = [];
        this.compiled = false;
        this.sanitize = true;
        this.humanReadable = true;
        // allowedClasses: Array<string> = [];
        // allowedStyles: Array<string> = [];
        this.compiledClasses = /^ *(classes)(?: *,|  *|$)|^  *|^\w* *,|^\w* *|^.*\n|^.*$/;
        this.compiledStyles = /(^ *(styles) *: *(.[^;]*) *;?)|(?:^.*;|^.*\n|^.*$)/;
        if (mode) {
            this.addMode(mode);
        }
        else {
            this.addMode(new markdown_1.MarkdownSpec());
        }
    }
    Object.defineProperty(ParserOptions.prototype, "allowedClasses", {
        set: function (classList) {
            var classes = "";
            for (var i = 0; i < classList.length; i++) {
                if (i === 0) {
                    classes = classes + classList[i];
                }
                else {
                    classes = classes + "|" + classList[i];
                }
            }
            this.compiledClasses = Helpers_1.replace(this.compiledClasses)("classes", classes)();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParserOptions.prototype, "allowedStyles", {
        set: function (styleList) {
            var styles = "";
            for (var i = 0; i < styleList.length; i++) {
                if (i === 0) {
                    styles = styles + styleList[i];
                }
                else {
                    styles = styles + "|" + styleList[i];
                }
            }
            this.compiledStyles = Helpers_1.replace(this.compiledStyles)("styles", styles)();
        },
        enumerable: true,
        configurable: true
    });
    ParserOptions.prototype.addMode = function (mode) {
        this.parserMode.push(mode);
        this.compiled = false;
    };
    return ParserOptions;
})();
exports.ParserOptions = ParserOptions;
//# sourceMappingURL=ParserOptions.js.map