/**
 * Returns array of all possible combinations of array values
 * e.g. if param is ["a", "b"] it will return [["a"], ["b"], ["a", "b"]]
 * @param { Array<string> } a - Array of strings
 */
function combine (a: string[]) {
  var fn = function (n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got
      }
      return
    }
    for (let j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all)
    }
  }
  const all = []
  for (let i = 0; i < a.length; i++) {
    fn(i, a, [], all)
  }
  all.push(a)
  return all
}

export default combine
