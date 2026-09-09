import type { Film } from '@/types/swapi'

import { getResourceById, getResourceList, type GetResourceParams } from './resources'

export function getFilms(params?: GetResourceParams) {
  return getResourceList<Film>('films', params)
}

export function getFilm(id: string, signal?: AbortSignal) {
  return getResourceById<Film>('films', id, signal)
}
