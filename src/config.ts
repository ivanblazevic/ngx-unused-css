export interface Ignore {
  file: string;
  all?: boolean;
  selectors?: string[];
}

export interface Config {
  path: string;
  styleExt?: 'scss | sass | css';
  ignore: (string | Ignore)[];
  importer?: string;
  includePaths?: string[];
  globalStyles?: string;
}
