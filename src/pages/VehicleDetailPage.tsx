import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, CarFront } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { getVehicle } from '@/api/vehicles'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatMeasurement, formatNumber, formatValue } from '@/lib/formatters'
import { cn } from '@/lib/utils'

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
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/vehicles" className={cn(buttonVariants({ variant: 'ghost' }), 'mb-6 self-start')}>
        <ArrowLeft className="size-4" />
        Back to vehicles
      </Link>

      {isPending && <VehicleDetailSkeleton />}

      {isError && (
        <div role="alert">
          <p className="font-medium">Something went wrong while loading this vehicle.</p>

          <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>

          <Button className="mt-4" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      )}

      {vehicle && !isError && (
        <>
          <header className="mb-8 flex items-center gap-4">
            <div
              className="bg-muted flex size-16 shrink-0 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <CarFront className="size-8" />
            </div>

            <div>
              <p className="text-muted-foreground text-sm">{formatValue(vehicle.vehicle_class)}</p>

              <h1 className="text-3xl font-semibold tracking-tight">{vehicle.name}</h1>
            </div>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>

            <CardContent>
              <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DetailItem label="Model" value={formatValue(vehicle.model)} />

                <DetailItem label="Manufacturer" value={formatValue(vehicle.manufacturer)} />

                <DetailItem label="Class" value={formatValue(vehicle.vehicle_class)} />

                <DetailItem label="Cost" value={formatCredits(vehicle.cost_in_credits)} />

                <DetailItem label="Length" value={formatMeasurement(vehicle.length, 'm')} />

                <DetailItem
                  label="Maximum speed"
                  value={formatSpeed(vehicle.max_atmosphering_speed)}
                />

                <DetailItem label="Crew" value={formatNumber(vehicle.crew)} />

                <DetailItem label="Passengers" value={formatNumber(vehicle.passengers)} />

                <DetailItem label="Cargo capacity" value={formatMass(vehicle.cargo_capacity)} />

                <DetailItem label="Consumables" value={formatValue(vehicle.consumables)} />
              </dl>
            </CardContent>
          </Card>
        </>
      )}
    </main>
  )
}

type DetailItemProps = {
  label: string
  value: string
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <dt className="text-muted-foreground text-sm">{label}</dt>

      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  )
}

function VehicleDetailSkeleton() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Skeleton className="size-16 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-52" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>

        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>

      <output className="sr-only" aria-live="polite">
        Loading vehicle details...
      </output>
    </div>
  )
}

function formatCredits(value: string) {
  const formattedValue = formatNumber(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue} credits`
}

function formatMass(value: string) {
  const formattedValue = formatNumber(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue} kg`
}

function formatSpeed(value: string) {
  const formattedValue = formatNumber(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue} km/h`
}
