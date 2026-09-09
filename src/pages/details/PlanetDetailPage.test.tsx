import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { getPlanet } from '@/api/planets'
import type { Planet } from '@/types/swapi'

import { PlanetDetailPage } from './PlanetDetailPage'

vi.mock('@/api/planets', () => ({
  getPlanet: vi.fn(),
}))

const tatooine: Planet = {
  name: 'Tatooine',
  rotation_period: '23',
  orbital_period: '304',
  diameter: '10465',
  climate: 'arid',
  gravity: '1 standard',
  terrain: 'desert',
  surface_water: '1',
  population: '200000',
  residents: [],
  films: [],
  created: '2014-12-09T13:50:49.641000Z',
  edited: '2014-12-20T20:58:18.411000Z',
  url: 'https://swapi.py4e.com/api/planets/1/',
}

describe('PlanetDetailPage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('shows a loading state and then renders the planet details', async () => {
    let resolvePlanet!: (planet: Planet) => void

    const planetPromise = new Promise<Planet>((resolve) => {
      resolvePlanet = resolve
    })

    vi.mocked(getPlanet).mockReturnValue(planetPromise)

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/planets/1']}>
          <Routes>
            <Route path="/planets/:id" element={<PlanetDetailPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    )

    expect(screen.getByText('Loading details...')).toBeInTheDocument()

    expect(getPlanet).toHaveBeenCalledWith('1', expect.any(AbortSignal))

    await act(async () => {
      resolvePlanet(tatooine)
    })

    expect(
      await screen.findByRole('heading', {
        name: 'Tatooine',
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('arid')).toBeInTheDocument()
    expect(screen.getByText('desert')).toBeInTheDocument()
    expect(screen.getByText('200,000')).toBeInTheDocument()
    expect(screen.getByText('10,465 km')).toBeInTheDocument()
  })
})
