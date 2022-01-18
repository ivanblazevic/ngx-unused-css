import path from 'path';
import sass from 'sass';
import { pathToFileURL } from 'url';
import { Config } from '../config';

/**
 * Compile styling file
 * @param {string} cssPath
 */
export default function compileSCSS(cssPath: string, config: Config): string {
  const options: sass.Options<'sync'> = {
    importers: [
      {
        // An importer that redirects relative URLs starting with "~" to
        // `node_modules`.
        findFileUrl(url: string) {
          if (!url.startsWith('~')) return null;
          return new URL(
            path.join('node_modules', url.substring(1)),
            pathToFileURL('node_modules')
          );
        }
      }
    ],
    loadPaths: config.includePaths
  };

  if (config.importer) {
    options.importers?.push(config.importer);
  }

  const result = sass.compile(cssPath, options);

  return result.css.toString();
}
