import chalk from 'chalk';
import { table } from 'table';
import getConfig from './../index';
import UnusedClasses from './main/getUnusedClasses';

class Main {
  constructor () {
    const conf = getConfig();
    const unusedClasses = new UnusedClasses(conf.styleExt || '.scss')

    unusedClasses.getUnusedClasses(conf.path).then((res) => {
      if (conf.globalStyles) {
        unusedClasses.getGlobalUnusedClasses(conf.globalStyles).then((r) => {
          if (r.length > 0) {
            // @ts-ignore
            res.push([r, '***** GLOBAL UNUSED CSS *****'])
          }
          if (res.length > 0) {
            this.log(res)
          }
        })
      } else {
        if (res.length > 0) {
          this.log(res)
        }
      }
    })
  }

  private log (classes: [[string[], string]]) {
    let result = ''

    classes.forEach((e: [string[], string]) => {
      const htmlPath = e[1]
      const cssPath = e[1].replace('.html', '.scss')

      result += chalk.red(htmlPath) + '\n'
      result += chalk.red.bold(cssPath) + '\n'

      const cssClasses = e[0].join('\n')

      result += table([[chalk.green(cssClasses)]])
    })

    console.log(
      chalk.red.bold('Unused CSS classes were found for the following files:\n')
    )

    console.log(result);
    process.exit(1);
  }
}

export default Main
