import type { Person } from '@/types/swapi'
import { getResourceList, type GetResourceParams } from './resources'
import { apiClient } from './client'

export function getPeople(params?: GetResourceParams) {
  return getResourceList<Person>('people', params)
}

export function getPerson(id: string, signal?: AbortSignal) {
  return apiClient<Person>(`/people/${id}/`, signal)
}
