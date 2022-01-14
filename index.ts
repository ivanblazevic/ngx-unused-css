#! /usr/bin/env node
/* eslint-disable no-tabs */

/*
Find unused css inside Angular components
*/
// import Main from "./src/main";
import { Config } from './src/config';
import init from './src/init';

const path = require('path');
const fs = require('fs');
const meow = require('meow');
const defaultConfigPath = '.ngx-unused-css.json';

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
        type: 'string',
        alias: 'c'
      }
    }
  }
);

let config: Config;

// Use dynamic import so config is initialized on every import
async function start () {
  const mainPromise = import('./src/main');
  mainPromise.then(res => {
    new res.default();
  });
}

if (cli.flags.init) {
  init();
} else {

  if (cli.flags.config) {
    config = require(path.join(__dirname, cli.flags.config));
  } else if (fs.existsSync(path.resolve(path.join(__dirname, defaultConfigPath)))) {
    config = require(path.join(__dirname, defaultConfigPath));
  }

  if (!config) {
    throw new Error('Config not found, did you forgot to run ngx-unused-css --init?');
  }

  start();
}

export default function getConfig(): Config {
  return config;
}
