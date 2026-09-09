import type { Person } from '@/types/swapi'
import { getResourceList, type GetResourceParams } from './resources'

export function getPeople(params?: GetResourceParams) {
  return getResourceList<Person>('people', params)
}
