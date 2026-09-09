export function formatValue(value: string) {
  return value === 'unknown' || value === 'n/a' ? '—' : value
}

export function formatNumber(value: string) {
  const formattedValue = formatValue(value)

  if (formattedValue === '—') {
    return formattedValue
  }

  const number = Number(value.replaceAll(',', ''))

  return Number.isNaN(number) ? formattedValue : new Intl.NumberFormat('en-US').format(number)
}

export function formatMeasurement(value: string, unit: string) {
  const formattedValue = formatNumber(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue} ${unit}`
}
