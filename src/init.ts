import chalk from 'chalk';
import fs from 'fs';
import prompts from 'prompts';
import { Config } from './config';

const questions: prompts.PromptObject<string>[] = [
  {
    type: 'confirm',
    name: 'isDefaultSrc',
    message: 'Is your app located in src/app?'
  },
  {
    type: 'confirm',
    name: 'isDefaultGlobalStylingSrc',
    message: 'Is your global styling located in src/styles.scss?'
  },
  {
    type: 'confirm',
    name: 'hasMaterialLib',
    message: 'Does your project use Angular Material library?'
  },
  {
    type: 'select',
    name: 'styleExt',
    message: 'Which style extension is your project using?',
    choices: [
      { title: 'SCSS', value: '.scss' },
      { title: 'SASS', value: '.sass' },
      { title: 'CSS', value: '.css' }
    ],
    initial: 0
  }
];

export default async function init() {
  const result = await prompts(questions);

  const feedback = [];

  const config: Config = {
    path: '',
    ignore: [],
    cli: true
  };

  if (result.isDefaultSrc) {
    config.path = 'src/app';
  } else {
    feedback.push(
      'App is not located in the src/app, pls provide correct path in the config'
    );
  }

  if (result.isDefaultGlobalStylingSrc) {
    config.globalStyles = 'src/styles.scss';
  } else {
    feedback.push(
      'Looks like configuration for global styling is missing, pls provide correct globalStyles in the config if there is any'
    );
  }

  if (result.hasMaterialLib) {
    config.ignore.push('.mat-');
  }

  config.styleExt = result.styleExt;

  if (feedback.length > 0) {
    console.log(
      chalk.red.bold(
        'INFO: Following changes in the .ngx-unused-css.json are required:\n'
      )
    );

    feedback.forEach((f, idx) => {
      console.log(chalk.red.bold(`${idx + 1}. ${f}`));
    });
  }

  fs.writeFileSync('.ngx-unused-css.json', JSON.stringify(config, null, 2));

  process.exit(0);
}
