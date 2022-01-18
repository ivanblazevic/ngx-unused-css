import { exec } from 'child_process';

describe('e2e', () => {
  it('should throw error with the list of unused css classes', (done) => {
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
});
