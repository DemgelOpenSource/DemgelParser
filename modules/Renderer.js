var Renderer = (function () {
    function Renderer() {
    }
    Renderer.prototype.renderTokens = function (tokens) {
        var retString = "";
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].openTag) {
                retString = retString + tokens[i].openTag;
            }
            if (tokens[i].text) {
                retString = retString + tokens[i].text.source;
                if (tokens[i].inlineTokens) {
                    retString = retString + this.renderTokens(tokens[i].inlineTokens);
                }
            }
            if (tokens[i].closeTag) {
                retString = retString + tokens[i].closeTag;
            }
        }
        return retString;
    };
    return Renderer;
})();
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map