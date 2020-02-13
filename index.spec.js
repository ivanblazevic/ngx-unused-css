/**
 * These tests are using .ngx-unused-css.json as a configuration and templatest from test directory
 */
const { execSync } = require('child_process');
const ngxUnusedCss = function () {
    require(__dirname + "/index.js");
}

describe("ngx unused css", () => {
    it("should detect unused class", () => {
        let result = "";

        try {
            ngxUnusedCss();
        } catch (error) {
            result = error.message.trim();
        }

        // expect html file path, css file path & unused classes
        expect(result).toContain('test.component.html');
        expect(result).toContain('test.component.scss');
        expect(result).toContain('.test-2');
    })

    it("should ignore whole to-ignore.html and test configuration override", () => {
        const result = execSync('node index.js --config=ngx-unused-css-ignore-test', {stdio: 'inherit'});
        expect(result).toBeNull();
    })

});

String.prototype.trimAll = function () { return this.replace(/\s/g, ''); };
