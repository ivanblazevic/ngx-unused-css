#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*
Find unused css inside Angular components
*/
var main_1 = tslib_1.__importDefault(require("./src/main"));
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
new main_1.default();
//# sourceMappingURL=index.js.map