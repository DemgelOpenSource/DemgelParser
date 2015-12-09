var Renderer_1 = require('./modules/Renderer');
var TokenManager_1 = require('./modules/TokenManager');
var ParserOptions_1 = require('./ParserOptions');
var DemgelParser = (function () {
    function DemgelParser(options) {
        if (options) {
            this.options = options;
        }
        else {
            this.options = new ParserOptions_1.ParserOptions();
        }
        this.tokenManager = new TokenManager_1.TokenManager(this.options);
        this.renderer = new Renderer_1.Renderer();
    }
    DemgelParser.prototype.parse = function (source) {
        var tokens = this.tokenManager.tokenize({ source: source });
        if (tokens.length > 0) {
            return this.renderer.renderTokens(tokens);
        }
        return "";
    };
    return DemgelParser;
})();
exports.DemgelParser = DemgelParser;
//# sourceMappingURL=DemgelParser.js.map