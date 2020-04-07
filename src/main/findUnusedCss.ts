import PurgeCSS from "purgecss";
import compileSCSS from "./compileSCSS";
import parseNgClass from "../helpers/parseNgClass";
import { conf } from "../..";
import { Ignore } from "../config";
import { SELECTORS_TO_IGNORE } from "../constants";

const path = require("path");
const projectPath = conf;

const ignoreSelectors = SELECTORS_TO_IGNORE.concat(
  // @ts-ignore
  conf && conf.ignore && conf.ignore.filter(c => typeof c === "string")
);

const filesToIgnore = (cssPath: string) => {
  return conf.ignore
    .filter(c => typeof c === "object")
    .filter(
      (c: Ignore) => path.join(projectPath, c.file) === cssPath
    ) as Ignore[];
};

/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssPath
 */
async function findUnusedCss(content: string, cssPath: string) {
  let css = "";
  try {
    if (!cssPath) return;
    css = compileSCSS(cssPath);
  } catch (error) {
    console.error(error);
  }

  try {
    const html = parseNgClass(content, cssPath);

    const options = {
      content: [
        {
          raw: html,
          extension: "html"
        }
      ],
      css: [{ raw: css }],
      rejected: true
    };

    const purgecssResult = await new PurgeCSS().purge(options);

    let result = purgecssResult[0].rejected;
    let ignore = ignoreSelectors;
    const fileIgnore = filesToIgnore(cssPath);

    if (fileIgnore.length > 0) {
      const selectorsToIgnore = fileIgnore[0].selectors;
      ignore = ignore.concat(selectorsToIgnore);

      // ignore all unused classes from file
      if (fileIgnore[0].all) {
        return [];
      }
    }

    // filter ignored selectors
    result = result.filter(c => {
      const ignoredSelectorFound = ignore.some(s => {
        return c.indexOf(s) > -1;
      });
      return !ignoredSelectorFound;
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}

export default findUnusedCss;
