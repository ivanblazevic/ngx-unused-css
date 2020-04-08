"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var findHtml_1 = tslib_1.__importDefault(require("./findHtml"));
var mock_fs_1 = tslib_1.__importDefault(require("mock-fs"));
describe("FindHtml", function () {
    beforeEach(function () {
        mock_fs_1.default({
            base: {
                "somefile.html": "file content here",
                subdir: {
                    "somefilefromsubdir.html": "file content here"
                }
            }
        });
    });
    it("should create all possible variations from given values in the ngClass attribute", function () {
        var results = findHtml_1.default("base");
        expect(results).toEqual([
            "base/somefile.html",
            "base/subdir/somefilefromsubdir.html"
        ]);
    });
});
//# sourceMappingURL=findHtml.test.js.map