import { useQuery } from '@tanstack/react-query'
import { Orbit } from 'lucide-react'
import { useParams } from 'react-router'

import { getPlanet } from '@/api/planets'
import { DetailCard } from '@/components/detail/DetailCard'
import { DetailError } from '@/components/detail/DetailError'
import { DetailHeader } from '@/components/detail/DetailHeader'
import { DetailPageLayout } from '@/components/detail/DetailPageLayout'
import { DetailPageSkeleton } from '@/components/detail/DetailPageSkeleton'
import { formatMeasurement, formatNumber, formatValue } from '@/lib/formatters'

export function PlanetDetailPage() {
  const { id } = useParams()

  const {
    data: planet,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['planets', 'detail', id],
    queryFn: ({ signal }) => getPlanet(id!, signal),
    enabled: Boolean(id),
  })

  return (
    <DetailPageLayout backTo="/planets" backLabel="planets">
      {isPending && <DetailPageSkeleton fieldCount={8} />}

      {isError && (
        <DetailError resourceName="planet" message={error.message} onRetry={() => void refetch()} />
      )}

      {planet && !isError && (
        <>
          <DetailHeader icon={Orbit} title={planet.name} subtitle="Galactic Archive" />

          <DetailCard
            fields={[
              {
                label: 'Climate',
                value: formatValue(planet.climate),
              },
              {
                label: 'Terrain',
                value: formatValue(planet.terrain),
              },
              {
                label: 'Population',
                value: formatNumber(planet.population),
              },
              {
                label: 'Diameter',
                value: formatMeasurement(planet.diameter, 'km'),
              },
              {
                label: 'Gravity',
                value: formatValue(planet.gravity),
              },
              {
                label: 'Surface water',
                value: formatPercentage(planet.surface_water),
              },
              {
                label: 'Rotation period',
                value: formatMeasurement(planet.rotation_period, 'hours'),
              },
              {
                label: 'Orbital period',
                value: formatMeasurement(planet.orbital_period, 'days'),
              },
            ]}
          />
        </>
      )}
    </DetailPageLayout>
  )
}

function formatPercentage(value: string) {
  const formattedValue = formatValue(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue}%`
}
