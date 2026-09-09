import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getPlanets } from '@/api/planets'
import { PlanetCard } from '@/components/planets/PlanetCard'
import { ResourceGrid } from '@/components/resource/ResourceGrid'
import { ResourceGridSkeleton } from '@/components/resource/ResourceGridSkeleton'
import { ResourcePagination } from '@/components/resource/ResourcePagination'
import { ResourceSearch } from '@/components/resource/ResourceSearch'
import { Button } from '@/components/ui/button'
import { useResourceSearchParams } from '@/hooks/useResourceSearchParams'

export function PlanetsPage() {
  const { page, search, handleSearch, handlePageChange } = useResourceSearchParams()

  const { data, isPending, isError, error, isFetching, isPlaceholderData, refetch } = useQuery({
    queryKey: ['planets', { page, search }],
    queryFn: ({ signal }) =>
      getPlanets({
        signal,
        page,
        search,
      }),
    placeholderData: keepPreviousData,
  })

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Planets</h1>

        <p className="text-muted-foreground mt-2">Explore worlds from across the galaxy.</p>
      </header>

      <ResourceSearch
        id="planet-search"
        initialValue={search}
        label="Search planets"
        placeholder="Search planets..."
        onSearch={handleSearch}
      />

      <section className="mt-8 flex flex-1 flex-col" aria-label="Planet results">
        <div className="flex-1">
          {isPending && <ResourceGridSkeleton label="Loading planets..." />}

          {isError && (
            <div role="alert">
              <p className="font-medium">Something went wrong while loading planets.</p>

              <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>

              <Button className="mt-4" onClick={() => void refetch()}>
                Try again
              </Button>
            </div>
          )}

          {data && !isError && (
            <>
              {data.results.length > 0 ? (
                <ResourceGrid
                  items={data.results}
                  getKey={(planet) => planet.url}
                  renderItem={(planet) => <PlanetCard planet={planet} />}
                  isUpdating={isFetching}
                />
              ) : (
                <p className="text-muted-foreground">No planets found.</p>
              )}
            </>
          )}
        </div>

        {data && !isError && (
          <ResourcePagination
            page={page}
            hasPrevious={Boolean(data.previous)}
            hasNext={Boolean(data.next)}
            isUpdating={isFetching && !isPending}
            disabled={isPlaceholderData}
            ariaLabel="Planet pagination"
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  )
}
