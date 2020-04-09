import { SELECTORS_TO_IGNORE } from "../constants";
import { Ignore } from "../config";
import { conf } from "../..";
import { handler } from "./whitelist/handler";

const path = require("path");
const projectPath = conf.path;

const fileToIgnore = (cssPath: string) => {
  return conf.ignore
    .filter(c => typeof c === "object")
    .find((c: Ignore) => path.join(projectPath, c.file) === cssPath) as Ignore;
};

const ignoreSelectors = SELECTORS_TO_IGNORE.concat(
  // @ts-ignore
  conf && conf.ignore && conf.ignore.filter(c => typeof c === "string")
);

function whitelist(classes: string[], cssPath: string) {
  const ignoreFileMatched = fileToIgnore(cssPath);

  console.log("ignoreFileMatched", cssPath, ignoreFileMatched);

  return handler(classes, ignoreFileMatched, ignoreSelectors);
}

export default whitelist;
