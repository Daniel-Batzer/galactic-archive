import { getResourceById, getResourceList } from './resources'

import type { Planet } from '@/types/swapi'
import type { GetResourceParams } from './resources'

export function getPlanets(params?: GetResourceParams) {
  return getResourceList<Planet>('planets', params)
}

export function getPlanet(id: string, signal?: AbortSignal) {
  return getResourceById<Planet>('planets', id, signal)
}
