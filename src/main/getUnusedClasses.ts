import fs from 'fs';
import { conf } from '../..';
import unusedClassMapper from '../helpers/unusedClassMapper';
import findHtml from './../helpers/findHtml';
import findUnusedCss from './findUnusedCss';
export default class UnusedClasses {
  private allHtmlContent = '';

  getUnusedClasses (projectPath: string): Promise<[[string[], string]]> {
    const list = findHtml(projectPath);

    return this.mapClasses(list).then((r) => {
      return r.filter((c) => {
        const [unusedCssClasses] = c;
        return unusedCssClasses && unusedCssClasses.length > 0
      });
    }) as Promise<[[string[], string]]>;
  }

  getGlobalUnusedClasses (globalStyles: string) {
    const classes = findUnusedCss(this.allHtmlContent, globalStyles);
    return classes;
  }

  private mapClasses (list: string[]) {
    const promiseArray = list.map((element) => {
      const htmlPath = element;
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');

      // Expect same path as the template exept different extension.
      // If styleExt not provided in the config default to .scss
      const cssPath = htmlPath.replace('.html', conf && conf.styleExt ? conf.styleExt : '.scss');

      this.allHtmlContent += htmlContent;

      return unusedClassMapper(cssPath, htmlContent, htmlPath);
    });
    return Promise.all(promiseArray);
  }
}
