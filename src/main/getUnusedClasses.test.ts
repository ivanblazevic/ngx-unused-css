import UnusedClasses from './getUnusedClasses'
import mock from 'mock-fs'

import findHtml from './../helpers/findHtml'

import findUnusedCss from './findUnusedCss'
jest.mock('./../helpers/findHtml', () => jest.fn())
jest.mock('./findUnusedCss', () => jest.fn())

const mockFindUnusedCss = (returnValue: string[]) => {
  // @ts-ignore
  findUnusedCss.mockImplementationOnce(() => {
    return Promise.resolve(returnValue)
  })
}

describe('GetUnusedClasses', () => {
  beforeAll(() => {
    mock({
      'file.html': 'file.html',
      'file.scss': 'file.scss'
    })

    // @ts-ignore
    findHtml.mockImplementation(() => {
      return ['file.html']
    })
  })

  afterAll(() => {
    mock.restore()
  })

  it('should return empty array if no unused css files', async () => {
    mockFindUnusedCss([])

    const result = await new UnusedClasses().getUnusedClasses('')
    expect(result).toEqual([])
  })

  it('should return only unused classes from the results', async () => {
    mockFindUnusedCss(['class1'])

    const result = await new UnusedClasses().getUnusedClasses('')
    expect(result).toEqual([[['class1'], 'file.html']])
  })
})
