import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getStarships } from '@/api/starships'
import { ResourceGrid } from '@/components/resource/ResourceGrid'
import { ResourceGridSkeleton } from '@/components/resource/ResourceGridSkeleton'
import { ResourcePagination } from '@/components/resource/ResourcePagination'
import { ResourceSearch } from '@/components/resource/ResourceSearch'
import { StarshipCard } from '@/components/starships/StarshipCard'
import { Button } from '@/components/ui/button'
import { useResourceSearchParams } from '@/hooks/useResourceSearchParams'

export function StarshipsPage() {
  const { page, search, handleSearch, handlePageChange } = useResourceSearchParams()

  const { data, isPending, isError, error, isFetching, isPlaceholderData, refetch } = useQuery({
    queryKey: ['starships', { page, search }],
    queryFn: ({ signal }) =>
      getStarships({
        signal,
        page,
        search,
      }),
    placeholderData: keepPreviousData,
  })

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Starships</h1>

        <p className="text-muted-foreground mt-2">Explore vessels from across the galaxy.</p>
      </header>

      <ResourceSearch
        id="starship-search"
        initialValue={search}
        label="Search starships"
        placeholder="Search starships..."
        onSearch={handleSearch}
      />

      <section className="mt-8 flex flex-1 flex-col" aria-label="Starship results">
        <div className="flex-1">
          {isPending && <ResourceGridSkeleton label="Loading starships..." />}

          {isError && (
            <div role="alert">
              <p className="font-medium">Something went wrong while loading starships.</p>

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
                  getKey={(starship) => starship.url}
                  renderItem={(starship) => <StarshipCard starship={starship} />}
                  isUpdating={isFetching}
                />
              ) : (
                <p className="text-muted-foreground">No starships found.</p>
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
            ariaLabel="Starship pagination"
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  )
}
