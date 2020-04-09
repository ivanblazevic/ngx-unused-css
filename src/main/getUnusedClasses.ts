import findUnusedCss from "./findUnusedCss";
import FindHtml from "./../helpers/findHtml";
const fs = require("fs");

export default class UnusedClasses {
  async unusedClassMapper(cssPath: string, html: string, htmlFile: string) {
    try {
      fs.readFileSync(cssPath);
      try {
        const classes = await findUnusedCss(html, cssPath);
        return [classes, htmlFile];
      } catch (error) {}
    } catch (error) {
      console.log(
        "Styling file for component " + htmlFile + " not found, skipping..."
      );
    }
  }

  mapClasses(list: any) {
    const promiseArray = list.map(element => {
      const htmlFile = element;
      const html = fs.readFileSync(htmlFile, "utf8");
      const cssPath = htmlFile.replace(".html", ".scss"); // same path as html but css means it is component

      return this.unusedClassMapper(cssPath, html, htmlFile);
    });
    return Promise.all(promiseArray);
  }

  getUnusedClasses(projectPath: string): Promise<string[][]> {
    const list = new FindHtml().findHtml(projectPath);
    return this.mapClasses(list).then(r =>
      r.filter(c => c[0].length > 0)
    ) as Promise<string[][]>;
  }
}
