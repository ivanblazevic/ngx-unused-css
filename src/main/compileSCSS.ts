import path from 'path';
import sass from 'sass';

// TODO: return feature back
// conf.importer

/**
 * Compile SCSS
 * @param {string} cssPath
 */
function compileSCSS(cssPath) {
  const result = sass.compile(cssPath, {
    importers: [
      {
        // An importer that redirects relative URLs starting with "~" to
        // `node_modules`.
        findFileUrl(url) {
          if (!url.startsWith('~')) return null;
          return new URL(path.resolve('node_modules', url.substring(1)));
        }
      }
    ],
    loadPaths: conf.includePaths
  });
  return result.css.toString();
}

export default compileSCSS;
