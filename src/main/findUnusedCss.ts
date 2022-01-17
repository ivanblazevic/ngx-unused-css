import PurgeCSS from 'purgecss';
import { Config } from '../config';
import parseNgClass from '../helpers/parseNgClass';
import whitelist from '../helpers/whitelist';
import compileSCSS from './compileSCSS';

/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssPath
 */
export default async function findUnusedCss(
  content: string,
  cssPath: string,
  config: Config
) {
  let css = '';

  if (!cssPath) return;

  css = compileSCSS(cssPath, config);

  const html = parseNgClass(content, cssPath);

  const options = {
    content: [
      {
        raw: html,
        extension: 'html'
      }
    ],
    css: [{ raw: css }],
    rejected: true
  };

  const purgecssResult = await new PurgeCSS().purge(options);
  const result = purgecssResult[0].rejected;

  return whitelist(result, cssPath, config.ignore, config.path);
}
