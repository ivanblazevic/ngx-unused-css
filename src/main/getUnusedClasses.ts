import findHtml from "./../helpers/findHtml";
import findUnusedCss from "./findUnusedCss";
const fs = require("fs");

function getUnusedClasses(projectPath: string) {
  const list = findHtml(projectPath, "html");
  let unusedClasses = [];

  list.forEach(element => {
    const htmlFile = element;
    const html = fs.readFileSync(htmlFile, "utf8");
    const cssPath = htmlFile.replace(".html", ".scss"); // same path as html but css means it is component

    try {
      fs.readFileSync(cssPath);
      try {
        const classes = findUnusedCss(html, cssPath);
        if (classes.length > 0) {
          unusedClasses.push([classes, htmlFile]);
        }
      } catch (error) {}
    } catch (error) {
      console.log(
        "Styling file for component " + htmlFile + " not found, skipping..."
      );
    }
  });

  return unusedClasses;
}

export default getUnusedClasses;
