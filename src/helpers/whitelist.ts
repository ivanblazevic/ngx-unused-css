import path from 'path';
import { Ignore } from '../config';
import { SELECTORS_TO_IGNORE } from '../constants';
import { handler } from './whitelist/handler';

export default function whitelist(
  classes: string[],
  cssPath: string,
  ignore: (string | Ignore)[],
  projectPath: string
) {
  const fileToIgnore = (cssPath: string) => {
    return ignore
      .filter((c) => typeof c === 'object')
      .find(
        (c: Ignore) => path.join(projectPath, c.file) === cssPath
      ) as Ignore;
  };

  const ignoreFileMatched = fileToIgnore(cssPath);

  const ignoreSelectors = SELECTORS_TO_IGNORE.concat(
    // @ts-ignore
    ignore && ignore.filter((c) => typeof c === 'string')
  );

  return handler(classes, ignoreFileMatched, ignoreSelectors);
}
