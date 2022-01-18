import fs from 'fs';
import path from 'path';

// source: https://gist.github.com/victorsollozzo/4134793

/**
 * Find all htmls in the project
 *
 * @param base
 * @param ext
 * @param files
 * @param result
 * @returns
 */
export default function findHtml(
  base: string,
  ext = 'html',
  files?: string[],
  result?: string[]
): string[] {
  if (!base) {
    return [];
  }
  files = files || fs.readdirSync(base);
  result = result || [];

  files.forEach((file) => {
    const newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      result = findHtml(newbase, 'html', fs.readdirSync(newbase), result);
    } else {
      if (file.substr(-1 * (ext.length + 1)) === '.' + ext) {
        result?.push(newbase);
      }
    }
  });
  return result;
}
