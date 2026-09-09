import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'

import { getPlanets } from '@/api/planets'
import { PlanetList } from '@/components/planets/PlanetList'
import { PlanetListSkeleton } from '@/components/planets/PlanetListSkeleton'
import { PlanetSearch } from '@/components/planets/PlanetSearch'
import { Button } from '@/components/ui/button'

export function PlanetsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageParam = Number(searchParams.get('page') ?? '1')
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1
  const search = searchParams.get('search') ?? ''

  const { data, isPending, isError, error, isFetching, isPlaceholderData, refetch } = useQuery({
    queryKey: ['planets', { page, search }],
    queryFn: ({ signal }) => getPlanets({ signal, page, search }),
    placeholderData: keepPreviousData,
  })

  const handleSearch = (value: string) => {
    if (value === search) {
      return
    }

    const params = new URLSearchParams(searchParams)

    params.set('page', '1')

    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }

    setSearchParams(params)
  }

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', String(nextPage))

    setSearchParams(params)
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Planets</h1>

        <p className="text-muted-foreground mt-2">Explore worlds from across the galaxy.</p>
      </header>

      <PlanetSearch initialValue={search} onSearch={handleSearch} />

      <section className="mt-8 flex flex-1 flex-col" aria-label="Planet results">
        <div className="flex-1">
          {isPending && <PlanetListSkeleton />}

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
                <PlanetList planets={data.results} isUpdating={isFetching} />
              ) : (
                <p className="text-muted-foreground">No planets found.</p>
              )}
            </>
          )}
        </div>

        {data && !isError && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <p className="text-muted-foreground text-sm">Page {page}</p>

              {isFetching && !isPending && (
                <output className="text-muted-foreground text-sm" aria-live="polite">
                  Updating...
                </output>
              )}
            </div>

            <nav
              className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto"
              aria-label="Planet pagination"
            >
              <Button
                variant="outline"
                className="min-h-11 w-full sm:w-auto"
                disabled={!data.previous || isPlaceholderData}
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                className="min-h-11 w-full sm:w-auto"
                disabled={!data.next || isPlaceholderData}
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </Button>
            </nav>
          </div>
        )}
      </section>
    </main>
  )
}
