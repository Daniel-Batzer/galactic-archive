import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getFilms } from '@/api/films'
import { FilmCard } from '@/components/films/FilmCard'
import { ResourceGrid } from '@/components/resource/ResourceGrid'
import { ResourceGridSkeleton } from '@/components/resource/ResourceGridSkeleton'
import { ResourcePagination } from '@/components/resource/ResourcePagination'
import { ResourceSearch } from '@/components/resource/ResourceSearch'
import { Button } from '@/components/ui/button'
import { useResourceSearchParams } from '@/hooks/useResourceSearchParams'

export function FilmsPage() {
  const { page, search, handleSearch, handlePageChange } = useResourceSearchParams()

  const { data, isPending, isError, error, isFetching, isPlaceholderData, refetch } = useQuery({
    queryKey: ['films', { page, search }],
    queryFn: ({ signal }) =>
      getFilms({
        signal,
        page,
        search,
      }),
    placeholderData: keepPreviousData,
  })

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Films</h1>

        <p className="text-muted-foreground mt-2">Explore stories from across the galaxy.</p>
      </header>

      <ResourceSearch
        id="film-search"
        initialValue={search}
        label="Search films"
        placeholder="Search films..."
        onSearch={handleSearch}
      />

      <section className="mt-8 flex flex-1 flex-col" aria-label="Film results">
        <div className="flex-1">
          {isPending && <ResourceGridSkeleton count={6} label="Loading films..." />}

          {isError && (
            <div role="alert">
              <p className="font-medium">Something went wrong while loading films.</p>

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
                  getKey={(film) => film.url}
                  renderItem={(film) => <FilmCard film={film} />}
                  isUpdating={isFetching}
                />
              ) : (
                <p className="text-muted-foreground">No films found.</p>
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
            ariaLabel="Film pagination"
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  )
}
