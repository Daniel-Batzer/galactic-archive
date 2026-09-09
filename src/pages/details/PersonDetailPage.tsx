import { useQueries, useQuery } from '@tanstack/react-query'
import { CarFront, Clapperboard, Dna, Orbit, Rocket, UserRound } from 'lucide-react'
import { useParams } from 'react-router'

import { getFilm } from '@/api/films'
import { getPerson } from '@/api/people'
import { getPlanet } from '@/api/planets'
import { getSpeciesById } from '@/api/species'
import { getStarship } from '@/api/starships'
import { getVehicle } from '@/api/vehicles'
import { DetailCard } from '@/components/detail/DetailCard'
import { DetailError } from '@/components/detail/DetailError'
import { DetailHeader } from '@/components/detail/DetailHeader'
import { DetailPageLayout } from '@/components/detail/DetailPageLayout'
import { DetailPageSkeleton } from '@/components/detail/DetailPageSkeleton'
import { RelatedResourceSection } from '@/components/detail/RelatedResourceSection'
import { RelatedResource, RelatedResourceSkeleton } from '@/components/resource/RelatedResource'
import { formatMeasurement, formatValue } from '@/lib/formatters'
import { getResourceId, getResourceIds } from '@/lib/swapi'

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

  const speciesIds = person ? getResourceIds(person.species) : []

  const speciesQueries = useQueries({
    queries: speciesIds.map((speciesId) => ({
      queryKey: ['species', 'detail', speciesId],
      queryFn: ({ signal }) => getSpeciesById(speciesId, signal),
    })),
  })

  const loadedSpecies = speciesQueries.flatMap((query) => (query.data ? [query.data] : []))

  const areSpeciesError = speciesQueries.length > 0 && speciesQueries.some((query) => query.isError)

  const vehicleIds = person ? getResourceIds(person.vehicles) : []

  const vehicleQueries = useQueries({
    queries: vehicleIds.map((vehicleId) => ({
      queryKey: ['vehicles', 'detail', vehicleId],
      queryFn: ({ signal }) => getVehicle(vehicleId, signal),
    })),
  })

  const starshipIds = person ? getResourceIds(person.starships) : []

  const starshipQueries = useQueries({
    queries: starshipIds.map((starshipId) => ({
      queryKey: ['starships', 'detail', starshipId],
      queryFn: ({ signal }) => getStarship(starshipId, signal),
    })),
  })

  const filmIds = person ? getResourceIds(person.films) : []

  const filmQueries = useQueries({
    queries: filmIds.map((filmId) => ({
      queryKey: ['films', 'detail', filmId],
      queryFn: ({ signal }) => getFilm(filmId, signal),
    })),
  })

  return (
    <DetailPageLayout backTo="/people" backLabel="people">
      {isPending && <DetailPageSkeleton fieldCount={7} label="Loading person details..." />}

      {isError && (
        <DetailError resourceName="person" message={error.message} onRetry={() => void refetch()} />
      )}

      {person && !isError && (
        <>
          <DetailHeader icon={UserRound} title={person.name} subtitle="Galactic Archive" />

          <DetailCard
            fields={[
              {
                label: 'Birth year',
                value: formatValue(person.birth_year),
              },
              {
                label: 'Gender',
                value: formatValue(person.gender),
              },
              {
                label: 'Height',
                value: formatMeasurement(person.height, 'cm'),
              },
              {
                label: 'Mass',
                value: formatMeasurement(person.mass, 'kg'),
              },
              {
                label: 'Hair color',
                value: formatValue(person.hair_color),
              },
              {
                label: 'Eye color',
                value: formatValue(person.eye_color),
              },
              {
                label: 'Skin color',
                value: formatValue(person.skin_color),
              },
            ]}
          >
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

                  {areSpeciesError && loadedSpecies.length === 0 && (
                    <span className="text-muted-foreground text-sm">Unavailable</span>
                  )}
                </div>

                {areSpeciesError && loadedSpecies.length > 0 && (
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
                      to={homeworldId ? `/planets/${homeworldId}` : undefined}
                      className="w-full"
                    />
                  )}
                </div>
              </div>
            </div>
          </DetailCard>

          <RelatedResourceSection
            title="Vehicles"
            ids={vehicleIds}
            queries={vehicleQueries}
            icon={CarFront}
            getKey={(vehicle) => vehicle.url}
            getLabel={() => 'Vehicle'}
            getName={(vehicle) => vehicle.name}
            getTo={(vehicleId) => `/vehicles/${vehicleId}`}
            unavailableMessage="Vehicle information is currently unavailable."
            partialErrorMessage="Some vehicle information could not be loaded."
          />

          <RelatedResourceSection
            title="Starships"
            ids={starshipIds}
            queries={starshipQueries}
            icon={Rocket}
            getKey={(starship) => starship.url}
            getLabel={() => 'Starship'}
            getName={(starship) => starship.name}
            getTo={(starshipId) => `/starships/${starshipId}`}
            unavailableMessage="Starship information is currently unavailable."
            partialErrorMessage="Some starship information could not be loaded."
          />

          <RelatedResourceSection
            title="Films"
            ids={filmIds}
            queries={filmQueries}
            icon={Clapperboard}
            getKey={(film) => film.url}
            getLabel={(film) => `Episode ${film.episode_id}`}
            getName={(film) => film.title}
            getTo={(filmId) => `/films/${filmId}`}
            unavailableMessage="Film information is currently unavailable."
            partialErrorMessage="Some film information could not be loaded."
          />
        </>
      )}
    </DetailPageLayout>
  )
}
