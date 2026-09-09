import type { Person } from '@/types/swapi'
import { getResourceById, getResourceList, type GetResourceParams } from './resources'

export function getPeople(params?: GetResourceParams) {
  return getResourceList<Person>('people', params)
}

export function getPerson(id: string, signal?: AbortSignal) {
  return getResourceById<Person>('people', id, signal)
}
