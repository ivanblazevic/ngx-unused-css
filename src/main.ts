import { conf } from "./../index";
import getUnusedClasses from "./main/getUnusedClasses";
import chalk from "chalk";
import { table } from "table";
import UnusedClasses from "./main/getUnusedClasses";

class Main {
  constructor() {
    new UnusedClasses().getUnusedClasses(conf.path).then(res => {
      if (res.length > 0) {
        this.log(res);
      }
    });
  }

  private log(classes: string[][]) {
    console.error(
      chalk.blue.bold("Unused CSS classes were found for the following files")
    );

    var result = "";

    classes.forEach(e => {
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
