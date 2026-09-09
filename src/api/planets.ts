import type { Planet, SwapiPaginatedResponse } from '@/types/swapi'

import { apiClient } from './client'

type GetPlanetsParams = {
  page?: number
  search?: string
  signal?: AbortSignal
}

export function getPlanets({ page = 1, search = '', signal }: GetPlanetsParams = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
  })

  if (search) {
    params.set('search', search)
  }

  return apiClient<SwapiPaginatedResponse<Planet>>(`/planets/?${params.toString()}`, signal)
}
