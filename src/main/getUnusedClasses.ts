import fs from 'fs';
import unusedClassMapper from '../helpers/unusedClassMapper';
import findHtml from './../helpers/findHtml';
import findUnusedCss from './findUnusedCss';

export default class UnusedClasses {
  private allHtmlContent = '';
  private styleExtension: string;

  constructor(private _styleExtension: string) {
    this.styleExtension = _styleExtension;
  }

  getUnusedClasses(projectPath: string): Promise<[[string[], string]]> {
    const list = findHtml(projectPath);

    return this.mapClasses(list).then((r) => {
      return r.filter((c) => {
        const unusedCssClasses: string[] | string = c?.length ? c[0] : [];
        return unusedCssClasses && unusedCssClasses.length > 0;
      });
    }) as Promise<[[string[], string]]>;
  }

  getGlobalUnusedClasses(globalStyles: string) {
    const classes = findUnusedCss(this.allHtmlContent, globalStyles);
    return classes;
  }

  private mapClasses(list: string[]) {
    const promiseArray = list.map((element) => {
      const htmlPath = element;
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');

      // Expect same path as the template except different extension.
      const cssPath = htmlPath.replace('.html', this.styleExtension);

      this.allHtmlContent += htmlContent;

      return unusedClassMapper(cssPath, htmlContent, htmlPath);
    });
    return Promise.all(promiseArray);
  }
}
