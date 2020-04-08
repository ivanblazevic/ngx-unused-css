import PurgeCSS from "purgecss";
import compileSCSS from "./compileSCSS";
import parseNgClass from "../helpers/parseNgClass";
import whitelist from "../helpers/whitelist";

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

    console.log("result", result);

    return whitelist(result, cssPath);
  } catch (error) {
    console.error(error);
  }
}

export default findUnusedCss;
