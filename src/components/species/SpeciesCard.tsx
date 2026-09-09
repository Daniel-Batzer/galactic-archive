import { Dna } from 'lucide-react'

import { ResourceCardLink } from '@/components/resource/ResourceCardLink'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatMeasurement, formatValue } from '@/lib/formatters'

import type { Species } from '@/types/swapi'

type SpeciesCardProps = {
  species: Species
}

export function SpeciesCard({ species }: SpeciesCardProps) {
  return (
    <ResourceCardLink url={species.url} basePath="/species">
      <SpeciesCardContent species={species} />
    </ResourceCardLink>
  )
}

function SpeciesCardContent({ species }: SpeciesCardProps) {
  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center gap-4">
        <div
          className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full"
          aria-hidden="true"
        >
          <Dna className="size-6" />
        </div>

        <div className="min-w-0">
          <CardTitle>{species.name}</CardTitle>

          <p className="text-muted-foreground mt-1 text-sm">
            {formatValue(species.classification)}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Designation</dt>
            <dd>{formatValue(species.designation)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Language</dt>
            <dd>{formatValue(species.language)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Average height</dt>
            <dd>{formatMeasurement(species.average_height, 'cm')}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Lifespan</dt>
            <dd>{formatValue(species.average_lifespan)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
