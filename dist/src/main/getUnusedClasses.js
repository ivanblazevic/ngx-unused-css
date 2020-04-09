"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var findUnusedCss_1 = tslib_1.__importDefault(require("./findUnusedCss"));
var findHtml_1 = tslib_1.__importDefault(require("./../helpers/findHtml"));
var fs = require("fs");
var UnusedClasses = /** @class */ (function () {
    function UnusedClasses() {
    }
    UnusedClasses.prototype.unusedClassMapper = function (cssPath, html, htmlFile) {
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
                        return [4 /*yield*/, findUnusedCss_1.default(html, cssPath)];
                    case 2:
                        classes = _a.sent();
                        return [2 /*return*/, [classes, htmlFile]];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.log("Styling file for component " + htmlFile + " not found, skipping...");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UnusedClasses.prototype.mapClasses = function (list) {
        var _this = this;
        var promiseArray = list.map(function (element) {
            var htmlFile = element;
            var html = fs.readFileSync(htmlFile, "utf8");
            var cssPath = htmlFile.replace(".html", ".scss"); // same path as html but css means it is component
            return _this.unusedClassMapper(cssPath, html, htmlFile);
        });
        return Promise.all(promiseArray);
    };
    UnusedClasses.prototype.getUnusedClasses = function (projectPath) {
        var list = new findHtml_1.default().findHtml(projectPath);
        return this.mapClasses(list).then(function (r) {
            return r.filter(function (c) { return c[0].length > 0; });
        });
    };
    return UnusedClasses;
}());
exports.default = UnusedClasses;
//# sourceMappingURL=getUnusedClasses.js.map