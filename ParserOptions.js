var markdown_1 = require('./modes/markdown');
var ParserOptions = (function () {
    function ParserOptions(mode) {
        this.parserMode = [];
        this.compiled = false;
        this.sanitize = true;
        if (mode) {
            this.addMode(mode);
        }
        else {
            this.addMode(new markdown_1.MarkdownSpec());
        }
    }
    ParserOptions.prototype.addMode = function (mode) {
        this.parserMode.push(mode);
        this.compiled = false;
    };
    return ParserOptions;
})();
exports.ParserOptions = ParserOptions;
