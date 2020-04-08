import findHtml from "./../helpers/findHtml";
import findUnusedCss from "./findUnusedCss";
const fs = require("fs");

async function unusedClassMapper(
  cssPath: string,
  html: string,
  htmlFile: string
) {
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

function getUnusedClasses(projectPath: string) {
  const list = findHtml(projectPath);

  const result = list.map(element => {
    const htmlFile = element;
    const html = fs.readFileSync(htmlFile, "utf8");
    const cssPath = htmlFile.replace(".html", ".scss"); // same path as html but css means it is component

    return unusedClassMapper(cssPath, html, htmlFile);
  });

  return Promise.all(result);
}

export default getUnusedClasses;
