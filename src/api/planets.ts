import { getResourceList } from './resources'

import type { Planet } from '@/types/swapi'
import type { GetResourceParams } from './resources'

export function getPlanets(params?: GetResourceParams) {
  return getResourceList<Planet>('planets', params)
}
