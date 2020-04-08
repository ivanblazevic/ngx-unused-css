"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
//source: https://gist.github.com/victorsollozzo/4134793
function findHtml(base, ext, files, result) {
    files = files || fs.readdirSync(base);
    result = result || [];
    ext = "html";
    files.forEach(function (file) {
        var newbase = path.join(base, file);
        if (fs.statSync(newbase).isDirectory()) {
            result = findHtml(newbase, "html", fs.readdirSync(newbase), result);
        }
        else {
            if (file.substr(-1 * (ext.length + 1)) == "." + ext) {
                result.push(newbase);
            }
        }
    });
    return result;
}
exports.default = findHtml;
//# sourceMappingURL=findHtml.js.map