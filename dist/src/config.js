"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function getConfig() {
    return config;
}
exports.getConfig = getConfig;
//# sourceMappingURL=config.js.map