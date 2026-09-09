import type { Species } from '@/types/swapi'

import { getResourceById, getResourceList, type GetResourceParams } from './resources'

export function getSpecies(params?: GetResourceParams) {
  return getResourceList<Species>('species', params)
}

export function getSpeciesById(id: string, signal?: AbortSignal) {
  return getResourceById<Species>('species', id, signal)
}
