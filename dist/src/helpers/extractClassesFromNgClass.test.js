"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var extractClassesFromNgClass_1 = tslib_1.__importDefault(require("./extractClassesFromNgClass"));
describe("ExtractClassesFromNgClass", function () {
    var template = "{ class1: true, class2: false }";
    it("should extract all possible classes found in ngClass attribute", function () {
        var results = extractClassesFromNgClass_1.default(template);
        expect(results).toEqual(["class1", "class2"]);
    });
});
//# sourceMappingURL=extractClassesFromNgClass.test.js.map