export interface Ignore {
  file: string;
  all?: boolean;
  selectors?: string[];
}

export type SupportedStyleExtensions = 'scss' | 'sass' | 'css';

export interface Config {
  path: string;
  styleExt?: SupportedStyleExtensions;
  ignore: (string | Ignore)[];
  importer?: string;
  includePaths?: string[];
  globalStyles?: string;
}
