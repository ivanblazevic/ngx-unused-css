"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var purgecss_1 = tslib_1.__importDefault(require("purgecss"));
var compileSCSS_1 = tslib_1.__importDefault(require("./compileSCSS"));
var parseNgClass_1 = tslib_1.__importDefault(require("../helpers/parseNgClass"));
var __1 = require("../..");
var constants_1 = require("../constants");
var path = require("path");
var projectPath = __1.conf;
var ignoreSelectors = constants_1.SELECTORS_TO_IGNORE.concat(
// @ts-ignore
__1.conf && __1.conf.ignore && __1.conf.ignore.filter(function (c) { return typeof c === "string"; }));
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
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var css, html, options, purgecssResult, result, ignore_1, fileIgnore, selectorsToIgnore, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    css = "";
                    try {
                        if (!cssPath)
                            return [2 /*return*/];
                        css = compileSCSS_1.default(cssPath);
                    }
                    catch (error) {
                        console.error(error);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    html = parseNgClass_1.default(content, cssPath);
                    options = {
                        content: [
                            {
                                raw: html,
                                extension: "html"
                            }
                        ],
                        css: [{ raw: css }],
                        rejected: true
                    };
                    return [4 /*yield*/, new purgecss_1.default().purge(options)];
                case 2:
                    purgecssResult = _a.sent();
                    result = purgecssResult[0].rejected;
                    ignore_1 = ignoreSelectors;
                    fileIgnore = filesToIgnore(cssPath);
                    if (fileIgnore.length > 0) {
                        selectorsToIgnore = fileIgnore[0].selectors;
                        ignore_1 = ignore_1.concat(selectorsToIgnore);
                        // ignore all unused classes from file
                        if (fileIgnore[0].all) {
                            return [2 /*return*/, []];
                        }
                    }
                    // filter ignored selectors
                    result = result.filter(function (c) {
                        var ignoredSelectorFound = ignore_1.some(function (s) {
                            return c.indexOf(s) > -1;
                        });
                        return !ignoredSelectorFound;
                    });
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = findUnusedCss;
//# sourceMappingURL=findUnusedCss.js.map