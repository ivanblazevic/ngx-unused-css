/**
 * These tests are using .ngx-unused-css.json as a configuration and templatest from test directory
 */
const ngxUnusedCss = function () {
    require(__dirname + "/index.js");
}

describe("ngx unused css", () => {
    it("should detect unused class", () => {
        var result = "";
        try {
            ngxUnusedCss();
        } catch (error) {
            result = error.message.trimAll()
        }

        // expect html file path, css file path & unused classes
        expect(result).toContain('./test\\test.component.html');
        expect(result).toContain('./test\\test.component.scss');
        expect(result).toContain('.test-2');
    })
});

String.prototype.trimAll = function () { return this.replace(/\s/g, ''); };
