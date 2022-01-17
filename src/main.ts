import chalk from 'chalk';
import { table } from 'table';
import { Config } from './config';
import { DEFAULT_STYLE_EXTENSION } from './constants';
import { UnusedClassesMap } from './helpers/unusedClassMapper';
import UnusedClasses from './main/getUnusedClasses';

class Main {
  constructor(config: Config) {
    if (!config.styleExt) {
      config.styleExt = DEFAULT_STYLE_EXTENSION;
    }

    const unusedClasses = new UnusedClasses(config);

    unusedClasses.getUnusedClasses(config.path).then((res) => {
      if (config.globalStyles) {
        unusedClasses.getGlobalUnusedClasses(config.globalStyles).then((r) => {
          if (r.length > 0) {
            // @ts-ignore
            res.push([r, '***** GLOBAL UNUSED CSS *****']);
          }
          if (res.length > 0) {
            this.log(res);
          }
        });
      } else {
        if (res.length > 0) {
          this.log(res);
        }
      }
    });
  }

  private log(classes: UnusedClassesMap[]) {
    let result = chalk.red.bold(
      'Unused CSS classes were found for the following files:\n\n'
    );

    classes.forEach((e: [string[], string]) => {
      const htmlPath = e[1];
      const cssPath = e[1].replace('.html', '.scss');

      result += chalk.red(htmlPath) + '\n';
      result += chalk.red.bold(cssPath) + '\n';

      const cssClasses = e[0].join('\n');

      result += table([[chalk.green(cssClasses)]]);
    });

    console.log(result);

    process.exit(1);
  }
}

export default Main;
