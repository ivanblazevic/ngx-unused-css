"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var parseNgClass_1 = tslib_1.__importDefault(require("./parseNgClass"));
describe("Parse ngClass method", function () {
    var template = "<div [ngClass]=\"{ class1: true, class2: false }\"></div>";
    it("should create all possible variations from given values in the ngClass attribute", function () {
        var results = parseNgClass_1.default(template, "");
        var expectedResults = "<html><head></head><body><div></div><div class=\"class1 class2\"></div><div class=\"class2\"></div><div class=\"class1\"></div></body></html>";
        expect(results).toEqual(expectedResults);
    });
});
//# sourceMappingURL=parseNgClass.test.js.map