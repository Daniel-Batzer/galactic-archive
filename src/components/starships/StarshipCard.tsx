import { Rocket } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatNumber, formatValue } from '@/lib/formatters'

import type { Starship } from '@/types/swapi'
import { ResourceCardLink } from '../resource/ResourceCardLink'

type StarshipCardProps = {
  starship: Starship
}

export function StarshipCard({ starship }: StarshipCardProps) {
  return (
    <ResourceCardLink url={starship.url} basePath="/starships">
      <StarshipCardContent starship={starship} />
    </ResourceCardLink>
  )
}

function StarshipCardContent({ starship }: StarshipCardProps) {
  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center gap-4">
        <div
          className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full"
          aria-hidden="true"
        >
          <Rocket className="size-6" />
        </div>

        <div className="min-w-0">
          <CardTitle>{starship.name}</CardTitle>

          <p className="text-muted-foreground mt-1 text-sm">{formatValue(starship.model)}</p>
        </div>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Class</dt>
            <dd>{formatValue(starship.starship_class)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Crew</dt>
            <dd>{formatNumber(starship.crew)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Passengers</dt>
            <dd>{formatNumber(starship.passengers)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Hyperdrive</dt>
            <dd>{formatValue(starship.hyperdrive_rating)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
