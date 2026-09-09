import { getResourceList } from './resources'

import type { Planet } from '@/types/swapi'
import type { GetResourceParams } from './resources'
import { apiClient } from './client'

export function getPlanets(params?: GetResourceParams) {
  return getResourceList<Planet>('planets', params)
}

export function getPlanet(id: string, signal?: AbortSignal) {
  return apiClient<Planet>(`/planets/${id}/`, signal)
}
