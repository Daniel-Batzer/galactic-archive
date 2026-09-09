import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getSpecies } from '@/api/species'
import { ResourceGrid } from '@/components/resource/ResourceGrid'
import { ResourceGridSkeleton } from '@/components/resource/ResourceGridSkeleton'
import { ResourcePagination } from '@/components/resource/ResourcePagination'
import { ResourceSearch } from '@/components/resource/ResourceSearch'
import { SpeciesCard } from '@/components/species/SpeciesCard'
import { Button } from '@/components/ui/button'
import { useResourceSearchParams } from '@/hooks/useResourceSearchParams'
import { ResourceCount } from '@/components/resource/ResourceCount'

export function SpeciesPage() {
  const { page, search, handleSearch, handlePageChange } = useResourceSearchParams()

  const { data, isPending, isError, error, isFetching, isPlaceholderData, refetch } = useQuery({
    queryKey: ['species', { page, search }],
    queryFn: ({ signal }) =>
      getSpecies({
        signal,
        page,
        search,
      }),
    placeholderData: keepPreviousData,
  })

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Species</h1>

        <p className="text-muted-foreground mt-2">Explore species from across the galaxy.</p>
      </header>

      <ResourceSearch
        id="species-search"
        initialValue={search}
        label="Search species"
        placeholder="Search species..."
        onSearch={handleSearch}
      />

      <section className="mt-8 flex flex-1 flex-col" aria-label="Species results">
        {data && <ResourceCount count={data.count} label="species" />}
        <div className="flex-1">
          {isPending && <ResourceGridSkeleton label="Loading species..." />}

          {isError && (
            <div role="alert">
              <p className="font-medium">Something went wrong while loading species.</p>

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
                  getKey={(species) => species.url}
                  renderItem={(species) => <SpeciesCard species={species} />}
                  isUpdating={isFetching}
                />
              ) : (
                <p className="text-muted-foreground">No species found.</p>
              )}
            </>
          )}
        </div>

        {data && !isError && (data.previous || data.next) && (
          <ResourcePagination
            page={page}
            hasPrevious={Boolean(data.previous)}
            hasNext={Boolean(data.next)}
            isUpdating={isFetching && !isPending}
            disabled={isPlaceholderData}
            ariaLabel="Species pagination"
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  )
}
