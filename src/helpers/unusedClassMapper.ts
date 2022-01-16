import fs from 'fs';
import { Config } from '../config';
import findUnusedCss from '../main/findUnusedCss';

/**
 * Returns array of classes/attributes not used in html
 *
 * @param cssPath - styling file path
 * @param htmlContent - html content to analyse
 * @param htmlPath - html file path
 * @returns Promise<([string[], string])>
 */
export default async function unusedClassMapper(
  cssPath: string,
  htmlContent: string,
  htmlPath: string,
  config: Config
): Promise<[string[], string]> {
  try {
    // Try to read styling file path in order to determine if file exist
    fs.readFileSync(cssPath);
    try {
      const classes = await findUnusedCss(htmlContent, cssPath, config);
      return [classes, htmlPath];
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(
      'Styling file for component ' + htmlPath + ' not found, skipping...'
    );
  }
}
