const fs = require("fs");
const path = require("path");

//source: https://gist.github.com/victorsollozzo/4134793
function findHtml(base: string, ext?: string, files?: any, result?: any) {
  files = files || fs.readdirSync(base);
  result = result || [];

  files.forEach(function(file) {
    let newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      result = findHtml(newbase, "html", fs.readdirSync(newbase), result);
    } else {
      if (file.substr(-1 * (ext.length + 1)) == "." + ext) {
        result.push(newbase);
      }
    }
  });
  return result;
}

export default findHtml;
