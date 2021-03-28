#!/usr/bin/env node
/* eslint-disable no-tabs */

/*
Find unused css inside Angular components
*/
// import Main from "./src/main";
import { Config } from './src/config';
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

if (cli.flags.config) {
  config = require(path.join(__dirname, cli.flags.config));
} else if (fs.existsSync(path.resolve(defaultConfigPath))) {
  config = require(path.resolve(defaultConfigPath));
}

if (!config) {
  throw new Error('Config not found, did you forgot to run ngx-unused-css --init?');
}

export const conf = config;

export function getConfig () {
  return config;
}

// Use dynamic import so config is initialized on every import
async function start () {
  const mainPromise = import('./src/main');
  mainPromise.then(res => {
    new res.default();
  });
}

start();
