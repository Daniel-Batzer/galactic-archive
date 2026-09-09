import type { Starship, SwapiPaginatedResponse } from '@/types/swapi'

import { apiClient } from './client'

type GetStarshipsParams = {
  page?: number
  search?: string
  signal?: AbortSignal
}

export function getStarships({ page = 1, search = '', signal }: GetStarshipsParams = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
  })

  if (search) {
    params.set('search', search)
  }

  return apiClient<SwapiPaginatedResponse<Starship>>(`/starships/?${params.toString()}`, signal)
}
