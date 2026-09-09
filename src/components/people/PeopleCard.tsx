import { UserRound } from 'lucide-react'

import { ResourceCardLink } from '@/components/resource/ResourceCardLink'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatMeasurement, formatValue } from '@/lib/formatters'

import type { Person } from '@/types/swapi'

type PeopleCardProps = {
  person: Person
}

export function PeopleCard({ person }: PeopleCardProps) {
  return (
    <ResourceCardLink url={person.url} basePath="/people">
      <PeopleCardContent person={person} />
    </ResourceCardLink>
  )
}

function PeopleCardContent({ person }: PeopleCardProps) {
  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center gap-4">
        <div
          className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full"
          aria-hidden="true"
        >
          <UserRound className="size-6" />
        </div>

        <CardTitle>{person.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Birth year</dt>
            <dd>{formatValue(person.birth_year)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Gender</dt>
            <dd>{formatValue(person.gender)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Height</dt>
            <dd>{formatMeasurement(person.height, 'cm')}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Mass</dt>
            <dd>{formatMeasurement(person.mass, 'kg')}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
