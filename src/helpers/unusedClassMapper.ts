import fs from 'fs';
import { Config } from '../config';
import findUnusedCss from '../main/findUnusedCss';

type UnusedClasses = string[]; // Return class names as array of strings
export type UnusedClassesMap = [UnusedClasses, string]; // Second string is actual html file where unused classes were found

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
): Promise<UnusedClassesMap> {
  try {
    // Try to read styling file path in order to determine if file exist
    fs.readFileSync(cssPath);
  } catch (error) {
    throw new Error(
      'Styling file for component ' + htmlPath + ' not found, skipping...'
    );
  }

  const classes = await findUnusedCss(htmlContent, cssPath, config);
  return [classes, htmlPath];
}
