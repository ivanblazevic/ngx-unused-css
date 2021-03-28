import findHtml from './../helpers/findHtml';
import findUnusedCss from './findUnusedCss';
import fs from 'fs';
export default class UnusedClasses {
  private allHtmlContent = '';

  async unusedClassMapper (
    cssPath: string,
    htmlContent: string,
    htmlPath: string
  ) {
    try {
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

  mapClasses (list: any) {
    const promiseArray = list.map((element) => {
      const htmlPath = element;
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');
      const cssPath = htmlPath.replace('.html', '.scss'); // same path as html but css means it is component

      this.allHtmlContent += htmlContent;

      return this.unusedClassMapper(cssPath, htmlContent, htmlPath);
    });
    return Promise.all(promiseArray);
  }

  getUnusedClasses (projectPath: string): Promise<[[string[], string]]> {
    const list = findHtml(projectPath);

    return this.mapClasses(list).then((r) => {
      return r.filter((c: string[]) => {
        if (c[0]) {
          return c[0].length > 0;
        } else {
          return false;
        }
      });
    }) as Promise<[[string[], string]]>;
  }

  getGlobalUnusedClasses (globalStyles: string) {
    const classes = findUnusedCss(this.allHtmlContent, globalStyles);
    return classes;
  }
}
