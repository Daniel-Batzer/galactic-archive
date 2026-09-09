import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Rocket } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { getStarship } from '@/api/starships'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatMeasurement, formatNumber, formatValue } from '@/lib/formatters'
import { cn } from '@/lib/utils'

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
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/starships" className={cn(buttonVariants({ variant: 'ghost' }), 'mb-6 self-start')}>
        <ArrowLeft className="size-4" />
        Back to starships
      </Link>

      {isPending && <StarshipDetailSkeleton />}

      {isError && (
        <div role="alert">
          <p className="font-medium">Something went wrong while loading this starship.</p>

          <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>

          <Button className="mt-4" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      )}

      {starship && !isError && (
        <>
          <header className="mb-8 flex items-center gap-4">
            <div
              className="bg-muted flex size-16 shrink-0 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <Rocket className="size-8" />
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                {formatValue(starship.starship_class)}
              </p>

              <h1 className="text-3xl font-semibold tracking-tight">{starship.name}</h1>
            </div>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>

            <CardContent>
              <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DetailItem label="Model" value={formatValue(starship.model)} />

                <DetailItem label="Manufacturer" value={formatValue(starship.manufacturer)} />

                <DetailItem label="Class" value={formatValue(starship.starship_class)} />

                <DetailItem label="Cost" value={formatCredits(starship.cost_in_credits)} />

                <DetailItem label="Length" value={formatMeasurement(starship.length, 'm')} />

                <DetailItem
                  label="Maximum speed"
                  value={formatSpeed(starship.max_atmosphering_speed)}
                />

                <DetailItem label="Crew" value={formatNumber(starship.crew)} />

                <DetailItem label="Passengers" value={formatNumber(starship.passengers)} />

                <DetailItem label="Cargo capacity" value={formatMass(starship.cargo_capacity)} />

                <DetailItem label="Consumables" value={formatValue(starship.consumables)} />

                <DetailItem
                  label="Hyperdrive rating"
                  value={formatValue(starship.hyperdrive_rating)}
                />

                <DetailItem label="MGLT" value={formatMglt(starship.MGLT)} />
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

function StarshipDetailSkeleton() {
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
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>

      <output className="sr-only" aria-live="polite">
        Loading starship details...
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

function formatMglt(value: string) {
  const formattedValue = formatValue(value)

  return formattedValue === '—' ? formattedValue : `${formattedValue} MGLT`
}
