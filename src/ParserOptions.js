var markdown_1 = require('./modes/markdown');
var Helpers_1 = require('./Helpers');
var ParserOptions = (function () {
    function ParserOptions(mode) {
        this.parserMode = [];
        this.compiled = false;
        this.sanitize = true;
        //allowedClasses: Array<string> = [];
        //allowedStyles: Array<string> = [];
        this.compiledClasses = /^ *(classes)(?: *,|  *|$)|^  *|^\w* *,|^\w* *|^.*\n|^.*$/;
        this.compiledStyles = /(^ *(styles) *: *(.[^;]*) *;?)|(?:^.*;|^.*\n|^.*$)/;
        if (mode) {
            this.addMode(mode);
        }
        else {
            this.addMode(new markdown_1.MarkdownSpec());
        }
        // var styles: string = "";
        // for(var i = 0; i < this.allowedStyles.length; i++) {
        // 	if (i == 0) {
        // 		styles = styles + this.allowedStyles[i];
        // 	} else {
        // 		styles = styles + "|" + this.allowedStyles[i];
        // 	}
        // }
        // this.compiledStyles = replace(this.compiledStyles)
        // 	("styles", styles)
        // 	();
        // var classes: string = "";
        // for(var i = 0; i < this.allowedClasses.length; i++) {
        // 	if (i == 0) {
        // 		classes = classes + this.allowedClasses[i];
        // 	} else {
        // 		classes = classes + "|" + this.allowedClasses[i];
        // 	}
        // }
        // this.compiledClasses = replace(this.compiledClasses)
        // 	("styles", styles)
        // 	();
    }
    Object.defineProperty(ParserOptions.prototype, "allowedClasses", {
        set: function (classList) {
            var classes = "";
            for (var i = 0; i < classList.length; i++) {
                if (i == 0) {
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
                if (i == 0) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyT3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJ0cy8iLCJzb3VyY2VzIjpbIlBhcnNlck9wdGlvbnMudHMiXSwibmFtZXMiOlsiUGFyc2VyT3B0aW9ucyIsIlBhcnNlck9wdGlvbnMuY29uc3RydWN0b3IiLCJQYXJzZXJPcHRpb25zLmFsbG93ZWRDbGFzc2VzIiwiUGFyc2VyT3B0aW9ucy5hbGxvd2VkU3R5bGVzIiwiUGFyc2VyT3B0aW9ucy5hZGRNb2RlIl0sIm1hcHBpbmdzIjoiQUFDQSx5QkFBMkIsa0JBQWtCLENBQUMsQ0FBQTtBQUM5Qyx3QkFBc0IsV0FBVyxDQUFDLENBQUE7QUFFbEM7SUFVQ0EsdUJBQVlBLElBQWlCQTtRQVQ3QkMsZUFBVUEsR0FBc0JBLEVBQUVBLENBQUNBO1FBQ25DQSxhQUFRQSxHQUFZQSxLQUFLQSxDQUFDQTtRQUMxQkEsYUFBUUEsR0FBWUEsSUFBSUEsQ0FBQ0E7UUFDekJBLHFDQUFxQ0E7UUFDckNBLG9DQUFvQ0E7UUFFcENBLG9CQUFlQSxHQUFXQSwwREFBMERBLENBQUNBO1FBQ3JGQSxtQkFBY0EsR0FBV0Esb0RBQW9EQSxDQUFDQTtRQUc3RUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDcEJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ1BBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLHVCQUFZQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUNsQ0EsQ0FBQ0E7UUFFREEsMkJBQTJCQTtRQUUzQkEsdURBQXVEQTtRQUN2REEsaUJBQWlCQTtRQUNqQkEsNkNBQTZDQTtRQUM3Q0EsWUFBWUE7UUFDWkEsbURBQW1EQTtRQUNuREEsS0FBS0E7UUFDTEEsSUFBSUE7UUFFSkEscURBQXFEQTtRQUNyREEsc0JBQXNCQTtRQUN0QkEsT0FBT0E7UUFFUEEsNEJBQTRCQTtRQUU1QkEsd0RB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