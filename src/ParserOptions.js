var markdown_1 = require('./modes/markdown/markdown');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyT3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJ0cy8iLCJzb3VyY2VzIjpbInNyYy9QYXJzZXJPcHRpb25zLnRzIl0sIm5hbWVzIjpbIlBhcnNlck9wdGlvbnMiLCJQYXJzZXJPcHRpb25zLmNvbnN0cnVjdG9yIiwiUGFyc2VyT3B0aW9ucy5hbGxvd2VkQ2xhc3NlcyIsIlBhcnNlck9wdGlvbnMuYWxsb3dlZFN0eWxlcyIsIlBhcnNlck9wdGlvbnMuYWRkTW9kZSJdLCJtYXBwaW5ncyI6IkFBQ0EseUJBQTJCLDJCQUEyQixDQUFDLENBQUE7QUFDdkQsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBRWxDO0lBVUNBLHVCQUFZQSxJQUFpQkE7UUFUN0JDLGVBQVVBLEdBQXNCQSxFQUFFQSxDQUFDQTtRQUNuQ0EsYUFBUUEsR0FBWUEsS0FBS0EsQ0FBQ0E7UUFDMUJBLGFBQVFBLEdBQVlBLElBQUlBLENBQUNBO1FBQ3pCQSxxQ0FBcUNBO1FBQ3JDQSxvQ0FBb0NBO1FBRXBDQSxvQkFBZUEsR0FBV0EsMERBQTBEQSxDQUFDQTtRQUNyRkEsbUJBQWNBLEdBQVdBLG9EQUFvREEsQ0FBQ0E7UUFHN0VBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ1ZBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3BCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSx1QkFBWUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDbENBLENBQUNBO0lBQ0ZBLENBQUNBO0lBRURELHNCQUFJQSx5Q0FBY0E7YUFBbEJBLFVBQW1CQSxTQUF3QkE7WUFDMUNFLElBQUlBLE9BQU9BLEdBQVdBLEVBQUVBLENBQUNBO1lBRXpCQSxHQUFHQSxDQUFBQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDMUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNaQSxPQUFPQSxHQUFHQSxPQUFPQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbENBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDUEEsT0FBT0EsR0FBR0EsT0FBT0EsR0FBR0EsR0FBR0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hDQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUVEQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxpQkFBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FDbERBLFNBQVNBLEVBQUVBLE9BQU9BLENBQUNBLEVBQ2xCQSxDQUFDQTtRQUNMQSxDQUFDQTs7O09BQUFGO0lBRURBLHNCQUFJQSx3Q0FBYUE7YUFBakJBLFVBQWtCQSxTQUF3QkE7WUFDekNHLElBQUlBLE1BQU1BLEdBQVdBLEVBQUVBLENBQUNBO1lBRXhCQSxHQUFHQSxDQUFBQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDMUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNaQSxNQUFNQSxHQUFHQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaENBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDUEEsTUFBTUEsR0FBR0EsTUFBTUEsR0FBR0EsR0FBR0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RDQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUVEQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxpQkFBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FDaERBLFFBQVFBLEVBQUVBLE1BQU1BLENBQUNBLEVBQ2hCQSxDQUFDQTtRQUNMQSxDQUFDQTs7O09BQUFIO0lBRURBLCtCQUFPQSxHQUFQQSxVQUFRQSxJQUFnQkE7UUFDdkJJLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQzNCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUN2QkEsQ0FBQ0E7SUFDRkosb0JBQUNBO0FBQURBLENBQUNBLEFBdERELElBc0RDO0FBdERZLHFCQUFhLGdCQXNEekIsQ0FBQSJ9