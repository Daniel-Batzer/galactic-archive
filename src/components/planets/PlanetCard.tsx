import { Orbit } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatMeasurement, formatNumber, formatValue } from '@/lib/formatters'

import type { Planet } from '@/types/swapi'
import { ResourceCardLink } from '../resource/ResourceCardLink'

type PlanetCardProps = {
  planet: Planet
}

export function PlanetCard({ planet }: PlanetCardProps) {
  return (
    <ResourceCardLink url={planet.url} basePath="/planets">
      <PlanetCardContent planet={planet} />
    </ResourceCardLink>
  )
}

function PlanetCardContent({ planet }: PlanetCardProps) {
  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center gap-4">
        <div
          className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full"
          aria-hidden="true"
        >
          <Orbit className="size-6" />
        </div>

        <div className="min-w-0">
          <CardTitle>{planet.name}</CardTitle>

          <p className="text-muted-foreground mt-1 text-sm">{formatValue(planet.climate)}</p>
        </div>
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
