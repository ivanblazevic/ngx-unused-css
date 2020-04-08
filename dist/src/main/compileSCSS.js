"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var node_sass_1 = tslib_1.__importDefault(require("node-sass"));
var __1 = require("../..");
var path = require("path");
/**
 * Resolve tilda relative importes from node_modules
 * @param {*} url
 */
function importer(url) {
    if (url[0] === "~") {
        url = path.resolve("node_modules", url.substr(1));
    }
    return { file: url };
}
/**
 * Compile SCSS
 * @param {string} cssPath
 */
function compileSCSS(cssPath) {
    var result = node_sass_1.default.renderSync({
        file: cssPath,
        importer: [importer, __1.conf.importer],
        includePaths: __1.conf.includePaths
    });
    return result.css.toString();
}
exports.default = compileSCSS;
//# sourceMappingURL=compileSCSS.js.map