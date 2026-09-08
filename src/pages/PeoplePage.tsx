import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'

import { getPeople } from '@/api/people'
import { Button } from '@/components/ui/button'
import { PeopleSearch } from '@/components/people/PeopleSearch'
import { PeopleListSkeleton } from '@/components/people/PeopleList'

export function PeoplePage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageParam = Number(searchParams.get('page') ?? '1')
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1
  const search = searchParams.get('search') ?? ''

  const { data, isPending, isError, error, isFetching, isPlaceholderData, refetch } = useQuery({
    queryKey: ['people', { page, search }],
    queryFn: ({ signal }) => getPeople({ signal, page, search }),
    placeholderData: keepPreviousData,
  })

  const handleSearch = (value: string) => {
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

  if (isPending) {
    return (
      <main>
        <h1>People</h1>

        <PeopleSearch key={search} initialValue={search} onSearch={handleSearch} />

        <PeopleListSkeleton />
      </main>
    )
  }

  if (isError) {
    return (
      <main>
        <h1>People</h1>

        <PeopleSearch key={search} initialValue={search} onSearch={handleSearch} />

        <div className="mt-6" role="alert">
          <p>Something went wrong while loading people.</p>

          <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>

          <Button className="mt-4" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <h1>People</h1>

      <PeopleSearch initialValue={search} onSearch={handleSearch} />

      <div className="mt-6">
        {data.results.length > 0 ? (
          <ul className="space-y-2" aria-busy={isFetching}>
            {data.results.map((person) => (
              <li key={person.url}>{person.name}</li>
            ))}
          </ul>
        ) : (
          <p>No people found.</p>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <p>Page {page}</p>

        {isFetching && (
          <output className="text-muted-foreground text-sm" aria-live="polite">
            Updating...
          </output>
        )}
      </div>

      <nav className="mt-3 flex gap-2" aria-label="People pagination">
        <Button
          variant="outline"
          disabled={!data.previous || isPlaceholderData}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          disabled={!data.next || isPlaceholderData}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      </nav>
    </main>
  )
}
