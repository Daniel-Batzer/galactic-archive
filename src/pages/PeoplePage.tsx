import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getPeople } from '@/api/people'
import { PeopleCard } from '@/components/people/PeopleCard'
import { ResourceGrid } from '@/components/resource/ResourceGrid'
import { ResourceGridSkeleton } from '@/components/resource/ResourceGridSkeleton'
import { ResourcePagination } from '@/components/resource/ResourcePagination'
import { ResourceSearch } from '@/components/resource/ResourceSearch'
import { Button } from '@/components/ui/button'
import { useResourceSearchParams } from '@/hooks/useResourceSearchParams'

export function PeoplePage() {
  const { page, search, handleSearch, handlePageChange } = useResourceSearchParams()

  const { data, isPending, isError, error, isFetching, isPlaceholderData, refetch } = useQuery({
    queryKey: ['people', { page, search }],
    queryFn: ({ signal }) => getPeople({ signal, page, search }),
    placeholderData: keepPreviousData,
  })

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">People</h1>

        <p className="text-muted-foreground mt-2">Explore characters from across the galaxy.</p>
      </header>

      <ResourceSearch
        id="people-search"
        initialValue={search}
        label="Search people"
        placeholder="Search people..."
        onSearch={handleSearch}
      />

      <section className="mt-8 flex flex-1 flex-col" aria-label="People results">
        <div className="flex-1">
          {isPending && <ResourceGridSkeleton label="Loading people..." />}

          {isError && (
            <div role="alert">
              <p className="font-medium">Something went wrong while loading people.</p>

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
                  getKey={(person) => person.url}
                  renderItem={(person) => <PeopleCard person={person} />}
                  isUpdating={isFetching}
                />
              ) : (
                <p className="text-muted-foreground">No people found.</p>
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
            ariaLabel="People pagination"
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  )
}
