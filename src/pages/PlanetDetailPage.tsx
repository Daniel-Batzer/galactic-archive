import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Orbit } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { getPlanet } from '@/api/planets'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatMeasurement, formatNumber, formatValue } from '@/lib/formatters'
import { cn } from '@/lib/utils'

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
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/planets" className={cn(buttonVariants({ variant: 'ghost' }), 'mb-6 self-start')}>
        <ArrowLeft className="size-4" />
        Back to planets
      </Link>

      {isPending && <PlanetDetailSkeleton />}

      {isError && (
        <div role="alert">
          <p className="font-medium">Something went wrong while loading this planet.</p>

          <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>

          <Button className="mt-4" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      )}

      {planet && !isError && (
        <>
          <header className="mb-8 flex items-center gap-4">
            <div
              className="bg-muted flex size-16 shrink-0 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <Orbit className="size-8" />
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Galactic Archive</p>

              <h1 className="text-3xl font-semibold tracking-tight">{planet.name}</h1>
            </div>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>

            <CardContent>
              <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DetailItem label="Climate" value={formatValue(planet.climate)} />

                <DetailItem label="Terrain" value={formatValue(planet.terrain)} />

                <DetailItem label="Population" value={formatNumber(planet.population)} />

                <DetailItem label="Diameter" value={formatMeasurement(planet.diameter, 'km')} />

                <DetailItem label="Gravity" value={formatValue(planet.gravity)} />

                <DetailItem label="Surface water" value={formatPercentage(planet.surface_water)} />

                <DetailItem
                  label="Rotation period"
                  value={formatMeasurement(planet.rotation_period, 'hours')}
                />

                <DetailItem
                  label="Orbital period"
                  value={formatMeasurement(planet.orbital_period, 'days')}
                />
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

function PlanetDetailSkeleton() {
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
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-28" />
            </div>
          ))}
        </CardContent>
      </Card>

      <output className="sr-only" aria-live="polite">
        Loading planet details...
      </output>
    </div>
  )
}

function formatPercentage(value: string) {
  const formattedValue = formatValue(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue}%`
}
