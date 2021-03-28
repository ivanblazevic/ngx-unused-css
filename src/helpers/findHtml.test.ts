import findHtml from './findHtml'
import mock from 'mock-fs'

describe('findHtml', () => {
  beforeEach(() => {
    mock({
      base: {
        'somefile.html': 'file content here',
        subdir: {
          'somefilefromsubdir.html': 'file content here'
        }
      }
    })
  })

  afterAll(() => {
    mock.restore()
  })

  it('should return array of html files', () => {
    const results = findHtml('base')
    expect(results).toEqual([
      'base/somefile.html',
      'base/subdir/somefilefromsubdir.html'
    ])
  })
})
