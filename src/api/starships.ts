import type { Starship } from '@/types/swapi'
import type { GetResourceParams } from './resources'

import { getResourceById, getResourceList } from './resources'

export function getStarships(params?: GetResourceParams) {
  return getResourceList<Starship>('starships', params)
}

export function getStarship(id: string, signal?: AbortSignal) {
  return getResourceById<Starship>('starships', id, signal)
}
