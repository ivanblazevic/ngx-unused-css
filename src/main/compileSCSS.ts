import path from 'path';
import sass from 'sass';
import { pathToFileURL } from 'url';
import { Config } from '../config';

/**
 * Compile SCSS
 * @param {string} cssPath
 */
export default function compileSCSS(cssPath: string, config: Config): string {
  const result = sass.compile(cssPath, {
    importers: [
      {
        // An importer that redirects relative URLs starting with "~" to
        // `node_modules`.
        findFileUrl(url) {
          if (!url.startsWith('~')) return null;
          return new URL(
            path.join('node_modules', url.substring(1)),
            pathToFileURL('node_modules')
          );
        }
      },
      config.importer
    ],
    loadPaths: config.includePaths
  });

  return result.css.toString();
}
