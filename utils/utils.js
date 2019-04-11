const fs = require('fs');
const path = require('path');

/**
 * Returns array of all possible combinations of array values
 * e.g. if param is ["a", "b"] it will return [["a"], ["b"], ["a", "b"]]
 * @param { Array<string> } a - Array of strings
 */
var combine = function(a) {
  var fn = function(n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  };
  var all = [];
  for (var i = 0; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
};

//source: https://gist.github.com/victorsollozzo/4134793
function findHtml(base, ext, files, result) {
  files = files || fs.readdirSync(base);
  result = result || [];

  files.forEach(function(file) {
    let newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      result = findHtml(newbase, ext, fs.readdirSync(newbase), result);
    } else {
      if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
        result.push(newbase);
      }
    }
  });
  return result;
}

module.exports.findHtml = findHtml;
module.exports.combine = combine;