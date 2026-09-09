import { describe, expect, it } from 'vitest'

import { getResourceId, getResourceIds } from './swapi'

describe('getResourceId', () => {
  it('extracts an id from a SWAPI resource URL', () => {
    expect(getResourceId('https://swapi.py4e.com/api/people/1/')).toBe('1')
  })

  it('works without a trailing slash', () => {
    expect(getResourceId('https://swapi.py4e.com/api/vehicles/14')).toBe('14')
  })
})

describe('getResourceIds', () => {
  it('extracts multiple resource ids', () => {
    expect(
      getResourceIds([
        'https://swapi.py4e.com/api/films/1/',
        'https://swapi.py4e.com/api/films/2/',
        'https://swapi.py4e.com/api/films/6/',
      ]),
    ).toEqual(['1', '2', '6'])
  })
})
