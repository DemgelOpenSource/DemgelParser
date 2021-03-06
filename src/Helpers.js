function escape(html, encode) {
    if (!html) {
        return "";
    }
    return html
        .replace(!encode ? /&(?!#?\w+;)/g : /&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
exports.escape = escape;
function unescape(html) {
    return html.replace(/&([#\w]+);/g, function (_, n) {
        n = n.toLowerCase();
        if (n === "colon")
            return ":";
        if (n.charAt(0) === "#") {
            return n.charAt(1) === "x"
                ? String.fromCharCode(parseInt(n.substring(2), 16))
                : String.fromCharCode(+n.substring(1));
        }
        return "";
    });
}
exports.unescape = unescape;
function replace(regex, opt) {
    regex = regex.source;
    opt = opt || "";
    return function self(name, val) {
        if (!name)
            return new RegExp(regex, opt);
        val = val.source || val;
        val = val.replace(/(^|[^\[])\^/g, "$1");
        regex = regex.replace(name, val);
        return self;
    };
}
exports.replace = replace;
function validateStyle(source, options) {
    var retString = "";
    while (source) {
        var matches = options.compiledStyles.exec(source);
        if (matches) {
            source = source.substring(matches[0].length);
            if (matches[1]) {
                retString = retString + matches[2] + ": " + matches[3] + ";";
            }
        }
    }
    return retString;
}
exports.validateStyle = validateStyle;
function validateClass(source, options) {
    var retString = "";
    while (source) {
        var matches = options.compiledClasses.exec(source);
        if (matches) {
            source = source.substring(matches[0].length);
            if (matches[1]) {
                retString = retString + ((retString === "") ? "" : " ") + matches[1];
            }
        }
    }
    return retString;
}
exports.validateClass = validateClass;
/**
 * For now just check options and return newline...
 *
 * TODO make this more rebust
 */
function humanReadable(options) {
    if (options.humanReadable) {
        return "\n";
    }
    return "";
}
exports.humanReadable = humanReadable;
//# sourceMappingURL=Helpers.js.map