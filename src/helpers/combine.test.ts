import combine from './combine'

describe('Combine method', () => {
  it('should return all possible combinations for the array', () => {
    const results = combine(['a', 'b'])
    expect(results).toEqual([['a'], ['b'], ['a', 'b']])
  })
})
