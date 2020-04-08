"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsdom_1 = require("jsdom");
var combine_1 = tslib_1.__importDefault(require("./combine"));
var extractClassesFromNgClass_1 = tslib_1.__importDefault(require("./extractClassesFromNgClass"));
/**
 * Create copy of reference element and add classes passed as a params
 * @param { JSDOM } dom
 * @param { element } e
 * @param { Array<string> } classes
 */
function createCopyOfElementWithClasses(dom, e, classes) {
    var el = dom.window.document.createElement(e.tagName);
    el.classList = e.classList;
    classes.forEach(function (c) { return el.classList.add(c); });
    return el;
}
/**
 * Parse html template and find all elements which contains ngClass attribute, if found
 * make copy of elements on the same level with all possible combinations of classes found
 * in ngClass configuration
 * @param {string} html
 * @param {string} cssPath
 */
function parseNgClass(html, cssPath) {
    var dom = new jsdom_1.JSDOM(html);
    var all = dom.window.document.getElementsByTagName("*");
    var inputList = Array.prototype.slice.call(all);
    inputList.forEach(function (e) {
        var attrs = Array.prototype.slice.call(e.attributes);
        attrs.forEach(function (a) {
            if (a.name === "[ngclass]") {
                var classes = extractClassesFromNgClass_1.default(a.value);
                e.removeAttribute("[ngclass]");
                /*
                  console.log(
                    'ngClass removed from the element, classes found: ',
                    classes
                  );
                  */
                var classCombinations = combine_1.default(classes);
                classCombinations.forEach(function (c) {
                    var el = createCopyOfElementWithClasses(dom, e, c);
                    e.parentNode.insertBefore(el, e.nextSibling);
                });
            }
        });
    });
    return dom.serialize();
}
exports.default = parseNgClass;
//# sourceMappingURL=parseNgClass.js.map