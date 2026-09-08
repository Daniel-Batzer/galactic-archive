const API_BASE_URL = import.meta.env.VITE_SWAPI_BASE_URL ?? 'https://swapi.py4e.com/api'

export async function apiClient<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    signal,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}
