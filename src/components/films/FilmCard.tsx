import { Clapperboard } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { Film } from '@/types/swapi'

type FilmCardProps = {
  film: Film
}

export function FilmCard({ film }: FilmCardProps) {
  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center gap-4">
        <div
          className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full"
          aria-hidden="true"
        >
          <Clapperboard className="size-6" />
        </div>

        <div className="min-w-0">
          <p className="text-muted-foreground text-sm">Episode {film.episode_id}</p>

          <CardTitle>{film.title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Director</dt>
            <dd>{film.director}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Released</dt>
            <dd>{formatReleaseDate(film.release_date)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

function formatReleaseDate(value: string) {
  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date)
}
