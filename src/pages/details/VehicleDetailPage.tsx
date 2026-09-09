import { useQuery } from '@tanstack/react-query'
import { CarFront } from 'lucide-react'
import { useParams } from 'react-router'

import { getVehicle } from '@/api/vehicles'
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

export function VehicleDetailPage() {
  const { id } = useParams()

  const {
    data: vehicle,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['vehicles', 'detail', id],
    queryFn: ({ signal }) => getVehicle(id!, signal),
    enabled: Boolean(id),
  })

  return (
    <DetailPageLayout backTo="/vehicles" backLabel="vehicles">
      {isPending && <DetailPageSkeleton fieldCount={10} />}

      {isError && (
        <DetailError resourceName="vehicle" error={error} onRetry={() => void refetch()} />
      )}

      {vehicle && !isError && (
        <>
          <DetailHeader
            icon={CarFront}
            title={vehicle.name}
            subtitle={formatValue(vehicle.vehicle_class)}
          />

          <DetailCard
            fields={[
              {
                label: 'Model',
                value: formatValue(vehicle.model),
              },
              {
                label: 'Manufacturer',
                value: formatValue(vehicle.manufacturer),
              },
              {
                label: 'Class',
                value: formatValue(vehicle.vehicle_class),
              },
              {
                label: 'Cost',
                value: formatCredits(vehicle.cost_in_credits),
              },
              {
                label: 'Length',
                value: formatMeasurement(vehicle.length, 'm'),
              },
              {
                label: 'Maximum speed',
                value: formatSpeed(vehicle.max_atmosphering_speed),
              },
              {
                label: 'Crew',
                value: formatNumber(vehicle.crew),
              },
              {
                label: 'Passengers',
                value: formatNumber(vehicle.passengers),
              },
              {
                label: 'Cargo capacity',
                value: formatMass(vehicle.cargo_capacity),
              },
              {
                label: 'Consumables',
                value: formatValue(vehicle.consumables),
              },
            ]}
          />
        </>
      )}
    </DetailPageLayout>
  )
}
