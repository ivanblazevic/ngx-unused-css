"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var findHtml_1 = tslib_1.__importDefault(require("./../helpers/findHtml"));
var findUnusedCss_1 = tslib_1.__importDefault(require("./findUnusedCss"));
var fs = require("fs");
var UnusedClasses = /** @class */ (function () {
    function UnusedClasses() {
        this.allHtmlContent = "";
    }
    UnusedClasses.prototype.unusedClassMapper = function (cssPath, htmlContent, htmlPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var classes, error_1, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        fs.readFileSync(cssPath);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, new findUnusedCss_1.default().findUnusedCss(htmlContent, cssPath)];
                    case 2:
                        classes = _a.sent();
                        return [2 /*return*/, [classes, htmlPath]];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.log("Styling file for component " + htmlPath + " not found, skipping...");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UnusedClasses.prototype.mapClasses = function (list) {
        var _this = this;
        var promiseArray = list.map(function (element) {
            var htmlPath = element;
            var htmlContent = fs.readFileSync(htmlPath, "utf8");
            var cssPath = htmlPath.replace(".html", ".scss"); // same path as html but css means it is component
            _this.allHtmlContent += htmlContent;
            return _this.unusedClassMapper(cssPath, htmlContent, htmlPath);
        });
        return Promise.all(promiseArray);
    };
    UnusedClasses.prototype.getUnusedClasses = function (projectPath) {
        var list = new findHtml_1.default().findHtml(projectPath);
        return this.mapClasses(list).then(function (r) {
            return r.filter(function (c) { return c[0].length > 0; });
        });
    };
    UnusedClasses.prototype.getGlobalUnusedClasses = function (globalStyles) {
        var classes = new findUnusedCss_1.default().findUnusedCss(this.allHtmlContent, globalStyles);
        return classes;
    };
    return UnusedClasses;
}());
exports.default = UnusedClasses;
//# sourceMappingURL=getUnusedClasses.js.map