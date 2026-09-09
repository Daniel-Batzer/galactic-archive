import { useQueries, useQuery } from '@tanstack/react-query'
import { ArrowLeft, CarFront, Clapperboard, Dna, Orbit, Rocket, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { getFilm } from '@/api/films'
import { getPerson } from '@/api/people'
import { getPlanet } from '@/api/planets'
import { getSpeciesById } from '@/api/species'
import { getStarship } from '@/api/starships'
import { getVehicle } from '@/api/vehicles'
import { RelatedResource, RelatedResourceSkeleton } from '@/components/resource/RelatedResource'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatMeasurement, formatValue } from '@/lib/formatters'
import { getResourceId, getResourceIds } from '@/lib/swapi'
import { cn } from '@/lib/utils'

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

  const filmIds = person ? getResourceIds(person.films) : []

  const filmQueries = useQueries({
    queries: filmIds.map((filmId) => ({
      queryKey: ['films', 'detail', filmId],
      queryFn: ({ signal }: { signal: AbortSignal }) => getFilm(filmId, signal),
    })),
  })

  const films = filmQueries.flatMap((query) => (query.data ? [query.data] : []))

  const areFilmsError = filmQueries.length > 0 && filmQueries.some((query) => query.isError)

  const speciesIds = person ? getResourceIds(person.species) : []

  const speciesQueries = useQueries({
    queries: speciesIds.map((speciesId) => ({
      queryKey: ['species', 'detail', speciesId],
      queryFn: ({ signal }) => getSpeciesById(speciesId, signal),
    })),
  })

  const species = speciesQueries.flatMap((query) => (query.data ? [query.data] : []))

  const areSpeciesError = speciesQueries.length > 0 && speciesQueries.some((query) => query.isError)

  const vehicleIds = person ? getResourceIds(person.vehicles) : []

  const vehicleQueries = useQueries({
    queries: vehicleIds.map((vehicleId) => ({
      queryKey: ['vehicles', 'detail', vehicleId],
      queryFn: ({ signal }) => getVehicle(vehicleId, signal),
    })),
  })

  const vehicles = vehicleQueries.flatMap((query) => (query.data ? [query.data] : []))

  const areVehiclesError =
    vehicleQueries.length > 0 && vehicleQueries.some((query) => query.isError)

  const starshipIds = person ? getResourceIds(person.starships) : []

  const starshipQueries = useQueries({
    queries: starshipIds.map((starshipId) => ({
      queryKey: ['starships', 'detail', starshipId],
      queryFn: ({ signal }) => getStarship(starshipId, signal),
    })),
  })

  const starships = starshipQueries.flatMap((query) => (query.data ? [query.data] : []))

  const areStarshipsError =
    starshipQueries.length > 0 && starshipQueries.some((query) => query.isError)

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
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
              </dl>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-muted-foreground text-sm">Species</p>

                  <div className="mt-2 flex flex-col gap-2">
                    {speciesIds.length === 0 && (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}

                    {speciesQueries.map((query, index) => {
                      const speciesId = speciesIds[index]

                      if (query.isPending) {
                        return <RelatedResourceSkeleton key={speciesId} className="w-full" />
                      }

                      if (query.data) {
                        return (
                          <RelatedResource
                            key={query.data.url}
                            icon={Dna}
                            label="Species"
                            name={query.data.name}
                            to={`/species/${speciesId}`}
                            className="w-full"
                          />
                        )
                      }

                      return null
                    })}

                    {areSpeciesError && species.length === 0 && (
                      <span className="text-muted-foreground text-sm">Unavailable</span>
                    )}
                  </div>

                  {areSpeciesError && species.length > 0 && (
                    <p className="text-muted-foreground mt-2 text-sm">
                      Some species information could not be loaded.
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Homeworld</p>

                  <div className="mt-2">
                    {isHomeworldLoading && <RelatedResourceSkeleton className="w-full" />}

                    {isHomeworldError && (
                      <span className="text-muted-foreground text-sm">Unavailable</span>
                    )}

                    {homeworld && (
                      <RelatedResource
                        icon={Orbit}
                        label="Planet"
                        name={homeworld.name}
                        to={`/planets/${homeworldId}`}
                        className="w-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {vehicleIds.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Vehicles</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {vehicleQueries.map((query, index) => {
                    const vehicleId = vehicleIds[index]

                    if (query.isPending) {
                      return <RelatedResourceSkeleton key={vehicleId} />
                    }

                    if (query.data) {
                      return (
                        <RelatedResource
                          key={query.data.url}
                          icon={CarFront}
                          label="Vehicle"
                          name={query.data.name}
                          to={`/vehicles/${vehicleId}`}
                        />
                      )
                    }

                    return null
                  })}
                </div>

                {areVehiclesError && vehicles.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    Vehicle information is currently unavailable.
                  </p>
                )}

                {areVehiclesError && vehicles.length > 0 && (
                  <p className="text-muted-foreground mt-3 text-sm">
                    Some vehicle information could not be loaded.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {starshipIds.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Starships</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {starshipQueries.map((query, index) => {
                    const starshipId = starshipIds[index]

                    if (query.isPending) {
                      return <RelatedResourceSkeleton key={starshipId} />
                    }

                    if (query.data) {
                      return (
                        <RelatedResource
                          key={query.data.url}
                          icon={Rocket}
                          label="Starship"
                          name={query.data.name}
                          to={`/starships/${starshipId}`}
                        />
                      )
                    }

                    return null
                  })}
                </div>

                {areStarshipsError && starships.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    Starship information is currently unavailable.
                  </p>
                )}

                {areStarshipsError && starships.length > 0 && (
                  <p className="text-muted-foreground mt-3 text-sm">
                    Some starship information could not be loaded.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {filmIds.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Films</CardTitle>
              </CardHeader>

              <CardContent>
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
          )}
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

        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-28" />
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <Skeleton className="mb-2 h-4 w-16" />
              <RelatedResourceSkeleton className="w-full" />
            </div>

            <div>
              <Skeleton className="mb-2 h-4 w-20" />
              <RelatedResourceSkeleton className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      <output className="sr-only" aria-live="polite">
        Loading person details...
      </output>
    </div>
  )
}
