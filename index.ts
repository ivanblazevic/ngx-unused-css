#!/usr/bin/env node

/*
Find unused css inside Angular components
*/
//import Main from "./src/main";
import { Config } from "./src/config";
const path = require("path");
const fs = require("fs");
const meow = require("meow");
const defaultConfigPath = ".ngx-unused-css.json";

const cli = meow(
  `
	Usage
	  $ ngx-unused-css

	Options
	  --config, -c override default config path

	Examples
	  $ ngx-unused-css --config ngx-custom-unused-css.json
`,
  {
    flags: {
      config: {
        type: "string",
        alias: "c"
      }
    }
  }
);

let config: Config = {
  path: "src/app",
  ignore: []
};

if (cli.flags.config) {
  config = require(__dirname + "/." + cli.flags.config);
} else if (fs.existsSync(path.resolve(defaultConfigPath))) {
  config = require(path.resolve(defaultConfigPath));
}

export const conf = config;

// Use dynamic import so config is initialized on every import
async function start() {
  const mainPromise = import("./src/main");
  mainPromise.then(res => {
    new res.default();
  });
}

start();
