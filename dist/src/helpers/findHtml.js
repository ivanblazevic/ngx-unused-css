"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
//source: https://gist.github.com/victorsollozzo/4134793
var FindHTML = /** @class */ (function () {
    function FindHTML() {
        var _this = this;
        this.findHtml = function (base, ext, files, result) {
            if (!base) {
                return [];
            }
            files = files || fs.readdirSync(base);
            result = result || [];
            ext = "html";
            files.forEach(function (file) {
                var newbase = path.join(base, file);
                if (fs.statSync(newbase).isDirectory()) {
                    result = _this.findHtml(newbase, "html", fs.readdirSync(newbase), result);
                }
                else {
                    if (file.substr(-1 * (ext.length + 1)) == "." + ext) {
                        result.push(newbase);
                    }
                }
            });
            return result;
        };
    }
    return FindHTML;
}());
exports.default = FindHTML;
//# sourceMappingURL=findHtml.js.map