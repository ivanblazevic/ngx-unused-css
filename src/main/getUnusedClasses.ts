import fs from 'fs';
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
      const cssPath = htmlPath.replace('.html', '.scss'); // same path as html but css means it is component

      this.allHtmlContent += htmlContent;

      return unusedClassMapper(cssPath, htmlContent, htmlPath);
    });
    return Promise.all(promiseArray);
  }
}
