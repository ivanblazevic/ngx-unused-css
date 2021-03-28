import { execSync } from 'child_process';

describe('e2e', () => {
  it('should throw error with the list of unused css classes', () => {
    try {
      execSync('node dist/index')
    } catch (error) {
      expect(error).toMatchSnapshot()
    }
  })
})
