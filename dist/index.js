#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = require("path");
var fs = require("fs");
var meow = require("meow");
var defaultConfigPath = ".ngx-unused-css.json";
var cli = meow("\n\tUsage\n\t  $ ngx-unused-css\n\n\tOptions\n\t  --config, -c override default config path\n\n\tExamples\n\t  $ ngx-unused-css --config ngx-custom-unused-css.json\n", {
    flags: {
        config: {
            type: "string",
            alias: "c"
        }
    }
});
var config = {
    path: "src/app",
    ignore: []
};
if (cli.flags.config) {
    config = require(__dirname + "/." + cli.flags.config);
}
else if (fs.existsSync(path.resolve(defaultConfigPath))) {
    config = require(path.resolve(defaultConfigPath));
}
exports.conf = config;
// Use dynamic import so config is initialized on every import
function start() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var mainPromise;
        return tslib_1.__generator(this, function (_a) {
            mainPromise = Promise.resolve().then(function () { return tslib_1.__importStar(require("./src/main")); });
            mainPromise.then(function (res) {
                new res.default();
            });
            return [2 /*return*/];
        });
    });
}
start();
//# sourceMappingURL=index.js.map