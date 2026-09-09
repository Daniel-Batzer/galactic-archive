import { describe, expect, it } from 'vitest'

import { formatMeasurement, formatNumber, formatValue } from './formatters'

describe('formatValue', () => {
  it('replaces unknown with a dash', () => {
    expect(formatValue('unknown')).toBe('—')
  })

  it('replaces n/a with a dash', () => {
    expect(formatValue('n/a')).toBe('—')
  })

  it('keeps known values unchanged', () => {
    expect(formatValue('Tatooine')).toBe('Tatooine')
  })
})

describe('formatNumber', () => {
  it('formats numeric strings', () => {
    expect(formatNumber('1000000')).toBe('1,000,000')
  })

  it('handles comma-separated values', () => {
    expect(formatNumber('1,000,000')).toBe('1,000,000')
  })

  it('preserves unknown values as a dash', () => {
    expect(formatNumber('unknown')).toBe('—')
  })
})

describe('formatMeasurement', () => {
  it('adds the requested unit', () => {
    expect(formatMeasurement('172', 'cm')).toBe('172 cm')
  })

  it('does not append a unit to unknown values', () => {
    expect(formatMeasurement('unknown', 'cm')).toBe('—')
  })
})
