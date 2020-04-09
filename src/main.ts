import { conf } from "./../index";
import getUnusedClasses from "./main/getUnusedClasses";
import chalk from "chalk";
import { table } from "table";

class Main {
  constructor() {
    const unusedClasses = getUnusedClasses(conf.path);

    unusedClasses.then(res => {
      if (res.length > 0) {
        this.log(res);
      }
    });
  }

  private log(classes: any[]) {
    console.error(
      chalk.blue.bold("Unused CSS classes were found for the following files")
    );

    var result = "";

    classes
      .filter(c => c[0].length > 0)
      .forEach(e => {
        const htmlPath = e[1];
        const cssPath = e[1].replace(".html", ".scss");

        result += chalk.red(htmlPath) + "\n";
        result += chalk.red.bold(cssPath) + "\n";

        const cssClasses = e[0].join("\n");

        result += table([[chalk.green(cssClasses)]]);
      });

    throw new Error("Unused CSS classes found:\n" + result);
  }
}

export default Main;
