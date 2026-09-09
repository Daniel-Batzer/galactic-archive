import { PlanetCard } from '@/components/planets/PlanetCard'

import type { Planet } from '@/types/swapi'

type PlanetListProps = {
  planets: Planet[]
  isUpdating?: boolean
}

export function PlanetList({ planets, isUpdating = false }: PlanetListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy={isUpdating}>
      {planets.map((planet) => (
        <PlanetCard key={planet.url} planet={planet} />
      ))}
    </div>
  )
}
