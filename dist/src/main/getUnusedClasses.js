"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var findHtml_1 = tslib_1.__importDefault(require("./../helpers/findHtml"));
var findUnusedCss_1 = tslib_1.__importDefault(require("./findUnusedCss"));
var fs = require("fs");
function getUnusedClasses(projectPath) {
    var list = findHtml_1.default(projectPath, "html");
    var unusedClasses = [];
    list.forEach(function (element) {
        var htmlFile = element;
        var html = fs.readFileSync(htmlFile, "utf8");
        var cssPath = htmlFile.replace(".html", ".scss"); // same path as html but css means it is component
        try {
            fs.readFileSync(cssPath);
            try {
                var classes = findUnusedCss_1.default(html, cssPath);
                if (classes.length > 0) {
                    unusedClasses.push([classes, htmlFile]);
                }
            }
            catch (error) { }
        }
        catch (error) {
            console.log("Styling file for component " + htmlFile + " not found, skipping...");
        }
    });
    return unusedClasses;
}
exports.default = getUnusedClasses;
//# sourceMappingURL=getUnusedClasses.js.map