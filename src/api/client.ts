const API_BASE_URL = import.meta.env.VITE_SWAPI_BASE_URL ?? 'https://swapi.py4e.com/api'

const SIMULATE_API_ERROR = import.meta.env.DEV && import.meta.env.VITE_SIMULATE_API_ERROR === 'true'

export async function apiClient<T>(path: string, signal?: AbortSignal): Promise<T> {
  if (SIMULATE_API_ERROR) {
    throw new Error('Simulated API failure')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    signal,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}
