import { spawn } from 'child_process';

describe('e2e', () => {
  it('should throw error with the list of unused css classes', (done) => {
    const reverse = spawn('node', [
      'dist/index', '--config', '../e2e/.ngx-unused-css.json'
    ]);

    const chunks = [];

    reverse.stdout.on('data', (chunk) => {
      chunks.push(chunk);
    });

    reverse.stdout.on('end', () => {
      const output = Buffer.concat(chunks).toString();
      expect(output).toMatchSnapshot()
      done();
    });
  })
})
