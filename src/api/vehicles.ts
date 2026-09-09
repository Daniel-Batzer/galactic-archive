import type { Vehicle } from '@/types/swapi'

import { getResourceById, getResourceList, type GetResourceParams } from './resources'

export function getVehicles(params?: GetResourceParams) {
  return getResourceList<Vehicle>('vehicles', params)
}

export function getVehicle(id: string, signal?: AbortSignal) {
  return getResourceById<Vehicle>('vehicles', id, signal)
}
