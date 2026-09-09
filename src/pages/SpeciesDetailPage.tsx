import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Dna } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { getSpeciesById } from '@/api/species'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatMeasurement, formatValue } from '@/lib/formatters'
import { cn } from '@/lib/utils'

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
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/species" className={cn(buttonVariants({ variant: 'ghost' }), 'mb-6 self-start')}>
        <ArrowLeft className="size-4" />
        Back to species
      </Link>

      {isPending && <SpeciesDetailSkeleton />}

      {isError && (
        <div role="alert">
          <p className="font-medium">Something went wrong while loading this species.</p>

          <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>

          <Button className="mt-4" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      )}

      {species && !isError && (
        <>
          <header className="mb-8 flex items-center gap-4">
            <div
              className="bg-muted flex size-16 shrink-0 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <Dna className="size-8" />
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Galactic Archive</p>

              <h1 className="text-3xl font-semibold tracking-tight">{species.name}</h1>
            </div>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>

            <CardContent>
              <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DetailItem label="Classification" value={formatValue(species.classification)} />

                <DetailItem label="Designation" value={formatValue(species.designation)} />

                <DetailItem label="Language" value={formatValue(species.language)} />

                <DetailItem
                  label="Average height"
                  value={formatMeasurement(species.average_height, 'cm')}
                />

                <DetailItem
                  label="Average lifespan"
                  value={formatLifespan(species.average_lifespan)}
                />

                <DetailItem label="Skin colors" value={formatValue(species.skin_colors)} />

                <DetailItem label="Hair colors" value={formatValue(species.hair_colors)} />

                <DetailItem label="Eye colors" value={formatValue(species.eye_colors)} />
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

function SpeciesDetailSkeleton() {
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
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-28" />
            </div>
          ))}
        </CardContent>
      </Card>

      <output className="sr-only" aria-live="polite">
        Loading species details...
      </output>
    </div>
  )
}

function formatLifespan(value: string) {
  const formattedValue = formatValue(value)

  if (formattedValue === '—' || Number.isNaN(Number(value))) {
    return formattedValue
  }

  return `${value} years`
}
