export interface Ignore {
  file: string;
  all?: boolean;
  selectors?: string;
}

export interface Config {
  path: string;
  ignore: (string | Ignore)[];
  importer?: string;
  includePaths?: string;
}
