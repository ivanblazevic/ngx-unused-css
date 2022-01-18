import { exec, execSync } from 'child_process';
import { Config } from '../src/config';
import Main from './../src/main';

describe('e2e', () => {
  it('should test CLI', (done) => {
    exec(
      'node ./../dist/index.js',
      { cwd: 'e2e' },
      function (error, stdout, stderr) {
        if (error) {
          expect(stdout).toMatchSnapshot();
          done();
        }
      }
    );
  });

  it('should test API', async () => {
    const config: Config = require('./.ngx-unused-css.json');

    // Copy test libs to root node modules to make tests not failing
    execSync('cp -R e2e/node_modules/test-css-lib node_modules/test-css-lib');

    // Override paths
    config.path = 'e2e/src/app';
    config.globalStyles = 'e2e/src/styles.scss';
    config.includePaths = ['e2e/node_modules/test-css-lib-load-paths'];

    const instance = new Main(config);

    const result = await instance.run();

    expect(result).toEqual({
      css: [
        [
          ['.test-lib-class', '.test-css-lib-load-paths', '.unused'],
          'e2e/src/app/app.component.html'
        ]
      ],
      globalCss: ['.i-am-global-class']
    });
  });
});
