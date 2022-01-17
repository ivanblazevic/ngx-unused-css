import fs from 'fs';
import { Config } from '../config';
import unusedClassMapper, {
  UnusedClassesMap
} from '../helpers/unusedClassMapper';
import findHtml from './../helpers/findHtml';
import findUnusedCss from './findUnusedCss';

export default class UnusedClasses {
  private allHtmlContent = '';

  private config: Config;

  constructor(private _config: Config) {
    this.config = _config;
  }

  async getUnusedClasses(projectPath: string): Promise<UnusedClassesMap[]> {
    const list = findHtml(projectPath);
    const result = await this.mapClasses(list);

    return result.filter((c) => {
      const unusedCssClasses: string[] | string = c?.length ? c[0] : [];
      return unusedCssClasses && unusedCssClasses.length > 0;
    });
  }

  getGlobalUnusedClasses(globalStyles: string) {
    return findUnusedCss(this.allHtmlContent, globalStyles, this.config);
  }

  /**
   *
   * @param list List of html files to be checked
   * @returns
   */
  private mapClasses(list: string[]): Promise<UnusedClassesMap[]> {
    const promiseArray = list.map((element) => {
      const htmlPath = element;
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');

      // Expect same path as the template except different extension.
      const cssPath = htmlPath.replace('.html', `.${this.config.styleExt}`);

      this.allHtmlContent += htmlContent;

      return unusedClassMapper(cssPath, htmlContent, htmlPath, this.config);
    });

    return Promise.all(promiseArray);
  }
}
