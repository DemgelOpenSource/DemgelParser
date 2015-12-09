(function (TokenParseType) {
    TokenParseType[TokenParseType["Inline"] = 0] = "Inline";
    TokenParseType[TokenParseType["Block"] = 1] = "Block";
    TokenParseType[TokenParseType["InlineBlock"] = 2] = "InlineBlock";
})(exports.TokenParseType || (exports.TokenParseType = {}));
var TokenParseType = exports.TokenParseType;
