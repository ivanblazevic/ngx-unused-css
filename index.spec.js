/**
 * These tests are using .ngx-unused-css.json as a configuration and templatest from test directory
 */
const { execSync } = require('child_process');
const childProcess = require('child_process');
const ngxUnusedCss = function () {
    require(__dirname + "/index.js");
}

describe("ngx unused css", () => {
    it("should throw error if path not found in config", () => {
        var spawn = childProcess.spawnSync("./index.js" , ["--config=ngx-unused-css-no-path"]);
        var errorText = spawn.stderr.toString();
        expect(errorText).toContain("Project path not defined");
    })

    it("should detect unused class", () => {
        let result = "";
        try {
            result = ngxUnusedCss();  //execSync('./index.js --projectPath=test', {stdio: 'inherit'});    
        } catch (error) {
            result = error.message.trimAll();    
        }

        // expect html file path, css file path & unused classes
        expect(result).toContain('test.component.html');
        expect(result).toContain('test.component.scss');
        expect(result).toContain('.test-2');
    })

    it("should ignore whole to-ignore.html and test configuration override", () => {
        const result = execSync('./index.js --config=ngx-unused-css-ignore-test', {stdio: 'inherit'});
        expect(result).toBeNull();
    })

});

String.prototype.trimAll = function () { return this.replace(/\s/g, ''); };
