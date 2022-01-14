import path from 'path'
import sass from 'sass'
import getConfig from '../../index'

/**
 * Resolve tilda relative importes from node_modules
 * @param {*} url
 */
function importer (url: string) {
  if (url[0] === '~') {
    url = path.resolve('node_modules', url.substr(1))
  }
  return { file: url }
}

/**
 * Compile SCSS
 * @param {string} cssPath
 */
function compileSCSS (cssPath) {
  const conf = getConfig();
  const result = sass.renderSync({
    file: cssPath,
    importer: [importer, conf.importer],
    includePaths: conf.includePaths
  })
  return result.css.toString()
}

export default compileSCSS
