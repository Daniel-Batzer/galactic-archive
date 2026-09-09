import { useSearchParams } from 'react-router'

export function useResourceSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageParam = Number(searchParams.get('page') ?? '1')

  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1

  const search = searchParams.get('search') ?? ''

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

  return {
    page,
    search,
    handleSearch,
    handlePageChange,
  }
}
