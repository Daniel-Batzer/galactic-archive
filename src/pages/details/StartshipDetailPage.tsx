import { useQuery } from '@tanstack/react-query'
import { Rocket } from 'lucide-react'
import { useParams } from 'react-router'

import { getStarship } from '@/api/starships'
import { DetailCard } from '@/components/detail/DetailCard'
import { DetailError } from '@/components/detail/DetailError'
import { DetailHeader } from '@/components/detail/DetailHeader'
import { DetailPageLayout } from '@/components/detail/DetailPageLayout'
import { DetailPageSkeleton } from '@/components/detail/DetailPageSkeleton'
import {
  formatCredits,
  formatMass,
  formatMeasurement,
  formatNumber,
  formatSpeed,
  formatValue,
} from '@/lib/formatters'

export function StarshipDetailPage() {
  const { id } = useParams()

  const {
    data: starship,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['starships', 'detail', id],
    queryFn: ({ signal }) => getStarship(id!, signal),
    enabled: Boolean(id),
  })

  return (
    <DetailPageLayout backTo="/starships" backLabel="starships">
      {isPending && <DetailPageSkeleton fieldCount={12} />}

      {isError && (
        <DetailError
          resourceName="starship"
          message={error.message}
          onRetry={() => void refetch()}
        />
      )}

      {starship && !isError && (
        <>
          <DetailHeader
            icon={Rocket}
            title={starship.name}
            subtitle={formatValue(starship.starship_class)}
          />

          <DetailCard
            fields={[
              {
                label: 'Model',
                value: formatValue(starship.model),
              },
              {
                label: 'Manufacturer',
                value: formatValue(starship.manufacturer),
              },
              {
                label: 'Class',
                value: formatValue(starship.starship_class),
              },
              {
                label: 'Cost',
                value: formatCredits(starship.cost_in_credits),
              },
              {
                label: 'Length',
                value: formatMeasurement(starship.length, 'm'),
              },
              {
                label: 'Maximum speed',
                value: formatSpeed(starship.max_atmosphering_speed),
              },
              {
                label: 'Crew',
                value: formatNumber(starship.crew),
              },
              {
                label: 'Passengers',
                value: formatNumber(starship.passengers),
              },
              {
                label: 'Cargo capacity',
                value: formatMass(starship.cargo_capacity),
              },
              {
                label: 'Consumables',
                value: formatValue(starship.consumables),
              },
              {
                label: 'Hyperdrive rating',
                value: formatValue(starship.hyperdrive_rating),
              },
              {
                label: 'MGLT',
                value: formatMglt(starship.MGLT),
              },
            ]}
          />
        </>
      )}
    </DetailPageLayout>
  )
}

function formatMglt(value: string) {
  const formattedValue = formatValue(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue} MGLT`
}
