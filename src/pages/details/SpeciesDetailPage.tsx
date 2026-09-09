import { useQuery } from '@tanstack/react-query'
import { Dna } from 'lucide-react'
import { useParams } from 'react-router'

import { getSpeciesById } from '@/api/species'
import { DetailCard } from '@/components/detail/DetailCard'
import { DetailError } from '@/components/detail/DetailError'
import { DetailHeader } from '@/components/detail/DetailHeader'
import { DetailPageLayout } from '@/components/detail/DetailPageLayout'
import { DetailPageSkeleton } from '@/components/detail/DetailPageSkeleton'
import { formatMeasurement, formatValue } from '@/lib/formatters'

export function SpeciesDetailPage() {
  const { id } = useParams()

  const {
    data: species,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['species', 'detail', id],
    queryFn: ({ signal }) => getSpeciesById(id!, signal),
    enabled: Boolean(id),
  })

  return (
    <DetailPageLayout backTo="/species" backLabel="species">
      {isPending && <DetailPageSkeleton fieldCount={8} />}

      {isError && (
        <DetailError resourceName="species" error={error} onRetry={() => void refetch()} />
      )}

      {species && !isError && (
        <>
          <DetailHeader icon={Dna} title={species.name} subtitle="Galactic Archive" />

          <DetailCard
            fields={[
              {
                label: 'Classification',
                value: formatValue(species.classification),
              },
              {
                label: 'Designation',
                value: formatValue(species.designation),
              },
              {
                label: 'Language',
                value: formatValue(species.language),
              },
              {
                label: 'Average height',
                value: formatMeasurement(species.average_height, 'cm'),
              },
              {
                label: 'Average lifespan',
                value: formatLifespan(species.average_lifespan),
              },
              {
                label: 'Skin colors',
                value: formatValue(species.skin_colors),
              },
              {
                label: 'Hair colors',
                value: formatValue(species.hair_colors),
              },
              {
                label: 'Eye colors',
                value: formatValue(species.eye_colors),
              },
            ]}
          />
        </>
      )}
    </DetailPageLayout>
  )
}

function formatLifespan(value: string) {
  const formattedValue = formatValue(value)

  if (formattedValue === '—' || Number.isNaN(Number(value))) {
    return formattedValue
  }

  return `${value} years`
}
