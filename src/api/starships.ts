import type { Starship } from '@/types/swapi'
import type { GetResourceParams } from './resources'

import { getResourceList } from './resources'

export function getStarships(params?: GetResourceParams) {
  return getResourceList<Starship>('starships', params)
}
