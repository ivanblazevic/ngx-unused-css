import fs from 'fs';
import findUnusedCss from '../main/findUnusedCss';

async function unusedClassMapper (
  cssPath: string,
  htmlContent: string,
  htmlPath: string
): Promise<(string | string[])[]> {
  try {
    // Try to read styling file path in order to determine if file exist
    fs.readFileSync(cssPath);
    try {
      const classes = await findUnusedCss(htmlContent, cssPath);
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

export default unusedClassMapper;
