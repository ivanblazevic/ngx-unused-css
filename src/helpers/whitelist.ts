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
    const ignoreList = ignore.filter((c) => typeof c === 'object') as Ignore[];
    return ignoreList.find((c) => path.join(projectPath, c.file) === cssPath);
  };

  const ignoreFileMatched = fileToIgnore(cssPath);

  const ignoreSelectors = SELECTORS_TO_IGNORE.concat(
    // @ts-ignore
    ignore && ignore.filter((c) => typeof c === 'string')
  );

  return handler(classes, ignoreFileMatched, ignoreSelectors);
}
