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

export function formatDate(value: string) {
  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date)
}

export function formatCredits(value: string) {
  const formattedValue = formatNumber(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue} credits`
}

export function formatMass(value: string) {
  const formattedValue = formatNumber(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue} kg`
}

export function formatSpeed(value: string) {
  const formattedValue = formatNumber(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue} km/h`
}
