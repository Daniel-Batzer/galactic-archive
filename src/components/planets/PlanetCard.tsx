import { Orbit } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { Planet } from '@/types/swapi'

type PlanetCardProps = {
  planet: Planet
}

export function PlanetCard({ planet }: PlanetCardProps) {
  return (
    <Card className="transition-shadow duration-200 hover:shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center gap-4">
        <div
          className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full"
          aria-hidden="true"
        >
          <Orbit className="size-6" />
        </div>

        <CardTitle>{planet.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Climate</dt>
            <dd>{formatValue(planet.climate)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Terrain</dt>
            <dd>{formatValue(planet.terrain)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Population</dt>
            <dd>{formatNumber(planet.population)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Diameter</dt>
            <dd>{formatMeasurement(planet.diameter, 'km')}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

function formatValue(value: string) {
  return value === 'unknown' || value === 'n/a' ? '—' : value
}

function formatNumber(value: string) {
  const formattedValue = formatValue(value)

  if (formattedValue === '—') {
    return formattedValue
  }

  const number = Number(value)

  return Number.isNaN(number) ? formattedValue : new Intl.NumberFormat('en-US').format(number)
}

function formatMeasurement(value: string, unit: string) {
  const formattedValue = formatNumber(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue} ${unit}`
}
