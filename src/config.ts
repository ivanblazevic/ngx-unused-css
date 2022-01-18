import { FileImporter, Importer } from 'sass';

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
  importer?: Importer<'sync'> | FileImporter<'sync'>;
  includePaths?: string[];
  globalStyles?: string;
  cli: boolean; // Determine if running via CLI or by using programmic API
}
