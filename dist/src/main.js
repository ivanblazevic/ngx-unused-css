"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("./../index");
var getUnusedClasses_1 = tslib_1.__importDefault(require("./main/getUnusedClasses"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var table_1 = require("table");
var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        var unusedClasses = getUnusedClasses_1.default(index_1.conf.path);
        unusedClasses.then(function (res) {
            if (res.length > 0) {
                _this.log(res);
            }
        });
    }
    Main.prototype.log = function (classes) {
        console.error(chalk_1.default.blue.bold("Unused CSS classes were found for the following files"));
        var result = "";
        classes.forEach(function (e) {
            var htmlPath = e[1];
            var cssPath = e[1].replace(".html", ".scss");
            result += chalk_1.default.red(htmlPath) + "\n";
            result += chalk_1.default.red.bold(cssPath) + "\n";
            var cssClasses = e[0].join("\n");
            result += table_1.table([[chalk_1.default.green(cssClasses)]]);
        });
        throw new Error("Unused CSS classes found:\n" + result);
    };
    return Main;
}());
exports.default = Main;
//# sourceMappingURL=main.js.map