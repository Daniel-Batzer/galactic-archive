import type { Person, SwapiPaginatedResponse } from '@/types/swapi'

import { apiClient } from './client'

export type GetPeopleParams = {
  page?: number
  search?: string
  signal?: AbortSignal
}

export function getPeople({ page = 1, search = '', signal }: GetPeopleParams = {}) {
  const params = new URLSearchParams({
    page: String(page),
  })

  if (search) {
    params.set('search', search)
  }

  return apiClient<SwapiPaginatedResponse<Person>>(`/people/?${params.toString()}`, signal)
}
