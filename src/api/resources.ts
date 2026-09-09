import type { SwapiPaginatedResponse } from '@/types/swapi'

import { apiClient } from './client'

export type GetResourceParams = {
  page?: number
  search?: string
  signal?: AbortSignal
}

export function getResourceList<T>(
  resource: string,
  { page = 1, search = '', signal }: GetResourceParams = {},
) {
  const params = new URLSearchParams({
    page: String(page),
  })

  if (search) {
    params.set('search', search)
  }

  return apiClient<SwapiPaginatedResponse<T>>(`/${resource}/?${params.toString()}`, signal)
}

export function getResourceById<T>(resource: string, id: string, signal?: AbortSignal) {
  return apiClient<T>(`/${resource}/${id}/`, signal)
}
