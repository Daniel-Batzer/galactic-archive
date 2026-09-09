type ResourceCountProps = {
  count: number
  label: string
}

export function ResourceCount({ count, label }: ResourceCountProps) {
  const pluralLabel = label === 'species' ? 'species' : `${label}s`

  return (
    <p className="pl-2 pb-2 text-sm text-muted-foreground" aria-live="polite">
      <span className="font-medium text-foreground">
        {new Intl.NumberFormat('en-US').format(count)}
      </span>{' '}
      {count === 1 ? label : pluralLabel}
    </p>
  )
}
