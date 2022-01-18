import { Ignore } from '../../config';

export function handler(
  classes: string[],
  fileIgnore: Ignore | undefined,
  ignore: string[]
) {
  if (fileIgnore) {
    const selectorsToIgnore = fileIgnore.selectors || [];
    ignore = ignore.concat(selectorsToIgnore);

    // ignore all unused classes from file
    if (fileIgnore.all) {
      return [];
    }
  }

  // filter ignored selectors
  classes = classes.filter((c) => {
    const ignoredSelectorFound = ignore.some((s) => {
      return c.indexOf(s) > -1;
    });
    return !ignoredSelectorFound;
  });

  return classes;
}
