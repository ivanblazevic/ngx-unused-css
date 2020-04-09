"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var purgecss_1 = tslib_1.__importDefault(require("purgecss"));
var compileSCSS_1 = tslib_1.__importDefault(require("./compileSCSS"));
var parseNgClass_1 = tslib_1.__importDefault(require("../helpers/parseNgClass"));
var whitelist_1 = tslib_1.__importDefault(require("../helpers/whitelist"));
/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssPath
 */
var FindUnusedCss = /** @class */ (function () {
    function FindUnusedCss() {
    }
    FindUnusedCss.prototype.findUnusedCss = function (content, cssPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var css, html, options, purgecssResult, result, error_1;
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
                        return [2 /*return*/, whitelist_1.default(result, cssPath)];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return FindUnusedCss;
}());
exports.default = FindUnusedCss;
//# sourceMappingURL=findUnusedCss.js.map