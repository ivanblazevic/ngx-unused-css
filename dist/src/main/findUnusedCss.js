"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var purgecss_1 = tslib_1.__importDefault(require("purgecss"));
var compileSCSS_1 = tslib_1.__importDefault(require("./compileSCSS"));
var parseNgClass_1 = tslib_1.__importDefault(require("../helpers/parseNgClass"));
var __1 = require("../..");
var path = require("path");
var projectPath = __1.conf;
// const ignoreSelectors = SELECTORS_TO_IGNORE.concat(
//   // @ts-ignore
//   config.ignore.filter(c => typeof c === "string")
// );
var ignoreSelectors = [];
var filesToIgnore = function (cssPath) {
    return __1.conf.ignore
        .filter(function (c) { return typeof c === "object"; })
        .filter(function (c) { return path.join(projectPath, c.file) === cssPath; });
};
/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssPath
 */
function findUnusedCss(content, cssPath) {
    var css = "";
    try {
        if (!cssPath)
            return;
        css = compileSCSS_1.default(cssPath);
    }
    catch (error) {
        console.error(error);
    }
    try {
        var html = parseNgClass_1.default(content, cssPath);
        var options = {
            content: [
                {
                    raw: html,
                    extension: "html"
                }
            ],
            css: [{ raw: css }],
            rejected: true
        };
        var purgecss = new purgecss_1.default(options);
        var purgecssResult = purgecss.purge();
        var result = purgecssResult[0].rejected;
        var ignore_1 = ignoreSelectors;
        var fileIgnore = filesToIgnore(cssPath);
        if (fileIgnore.length > 0) {
            var selectorsToIgnore = fileIgnore[0].selectors;
            ignore_1 = ignore_1.concat(selectorsToIgnore);
            // ignore all unused classes from file
            if (fileIgnore[0].all) {
                return [];
            }
        }
        // filter ignored selectors
        result = result.filter(function (c) {
            var ignoredSelectorFound = ignore_1.some(function (s) {
                return c.indexOf(s) > -1;
            });
            return !ignoredSelectorFound;
        });
        return result;
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = findUnusedCss;
//# sourceMappingURL=findUnusedCss.js.map