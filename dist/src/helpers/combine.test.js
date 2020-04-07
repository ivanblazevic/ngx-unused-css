"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var combine_1 = tslib_1.__importDefault(require("./combine"));
describe("Combine method", function () {
    it("should return all possible combinations for the array", function () {
        var results = combine_1.default(["a", "b"]);
        expect(results).toEqual([["a"], ["b"], ["a", "b"]]);
    });
});
//# sourceMappingURL=combine.test.js.map