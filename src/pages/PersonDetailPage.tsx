import { useQueries, useQuery } from '@tanstack/react-query'
import { ArrowLeft, Clapperboard, Orbit, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { cn } from '@/lib/utils'

import { getPerson } from '@/api/people'
import { getPlanet } from '@/api/planets'
import { getFilm } from '@/api/films'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatMeasurement, formatValue } from '@/lib/formatters'
import { getResourceId } from '@/lib/swapi'

import { RelatedResource, RelatedResourceSkeleton } from '@/components/resource/RelatedResource'

export function PersonDetailPage() {
  const { id } = useParams()

  const {
    data: person,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['people', 'detail', id],
    queryFn: ({ signal }) => getPerson(id!, signal),
    enabled: Boolean(id),
  })

  const homeworldId = person ? getResourceId(person.homeworld) : undefined

  const { data: homeworld, isError: isHomeworldError } = useQuery({
    queryKey: ['planets', 'detail', homeworldId],
    queryFn: ({ signal }) => getPlanet(homeworldId!, signal),
    enabled: Boolean(homeworldId),
  })

  const isHomeworldLoading = Boolean(homeworldId) && !homeworld && !isHomeworldError

  const filmIds =
    person?.films.map(getResourceId).filter((filmId): filmId is string => Boolean(filmId)) ?? []

  const filmQueries = useQueries({
    queries: filmIds.map((filmId) => ({
      queryKey: ['films', 'detail', filmId],
      queryFn: ({ signal }: { signal: AbortSignal }) => getFilm(filmId, signal),
    })),
  })

  const films = filmQueries.flatMap((query) => (query.data ? [query.data] : []))

  const areFilmsError = filmQueries.length > 0 && filmQueries.some((query) => query.isError)

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/people" className={cn(buttonVariants({ variant: 'ghost' }), 'mb-6 self-start')}>
        <ArrowLeft className="size-4" />
        Back to people
      </Link>

      {isPending && <PersonDetailSkeleton />}

      {isError && (
        <div role="alert">
          <p className="font-medium">Something went wrong while loading this person.</p>

          <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>

          <Button className="mt-4" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      )}

      {person && !isError && (
        <>
          <header className="mb-8 flex items-center gap-4">
            <div
              className="bg-muted flex size-16 shrink-0 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <UserRound className="size-8" />
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Galactic Archive</p>

              <h1 className="text-3xl font-semibold tracking-tight">{person.name}</h1>
            </div>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>

            <CardContent>
              <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DetailItem label="Birth year" value={formatValue(person.birth_year)} />

                <DetailItem label="Gender" value={formatValue(person.gender)} />

                <DetailItem label="Height" value={formatMeasurement(person.height, 'cm')} />

                <DetailItem label="Mass" value={formatMeasurement(person.mass, 'kg')} />

                <DetailItem label="Hair color" value={formatValue(person.hair_color)} />

                <DetailItem label="Eye color" value={formatValue(person.eye_color)} />

                <DetailItem label="Skin color" value={formatValue(person.skin_color)} />

                <div className="sm:col-span-2 lg:col-span-3">
                  <dt className="text-muted-foreground text-sm">Homeworld</dt>

                  <dd className="mt-2">
                    {isHomeworldLoading && <RelatedResourceSkeleton />}

                    {isHomeworldError && (
                      <span className="text-muted-foreground text-sm">Unavailable</span>
                    )}

                    {homeworld && (
                      <RelatedResource icon={Orbit} label="Planet" name={homeworld.name} />
                    )}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Films</CardTitle>
            </CardHeader>

            <CardContent>
              {filmQueries.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {filmQueries.map((query, index) => {
                    const filmId = filmIds[index]

                    if (query.isPending) {
                      return <RelatedResourceSkeleton key={filmId} />
                    }

                    if (query.data) {
                      return (
                        <RelatedResource
                          key={query.data.url}
                          icon={Clapperboard}
                          label={`Episode ${query.data.episode_id}`}
                          name={query.data.title}
                          to={`/films/${filmId}`}
                        />
                      )
                    }

                    return null
                  })}
                </div>
              )}

              {areFilmsError && films.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  Film information is currently unavailable.
                </p>
              )}

              {areFilmsError && films.length > 0 && (
                <p className="text-muted-foreground mt-3 text-sm">
                  Some film information could not be loaded.
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </main>
  )
}

type DetailItemProps = {
  label: string
  value: string
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <dt className="text-muted-foreground text-sm">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  )
}

function PersonDetailSkeleton() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Skeleton className="size-16 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-52" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>

        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-28" />
            </div>
          ))}
        </CardContent>
      </Card>

      <output className="sr-only" aria-live="polite">
        Loading person details...
      </output>
    </div>
  )
}
