import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Clapperboard } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { getFilm } from '@/api/films'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/lib/formatters'
import { cn } from '@/lib/utils'

export function FilmDetailPage() {
  const { id } = useParams()

  const {
    data: film,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['films', 'detail', id],
    queryFn: ({ signal }) => getFilm(id!, signal),
    enabled: Boolean(id),
  })

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/films" className={cn(buttonVariants({ variant: 'ghost' }), 'mb-6 self-start')}>
        <ArrowLeft className="size-4" />
        Back to films
      </Link>

      {isPending && <FilmDetailSkeleton />}

      {isError && (
        <div role="alert">
          <p className="font-medium">Something went wrong while loading this film.</p>

          <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>

          <Button className="mt-4" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      )}

      {film && !isError && (
        <>
          <header className="mb-8 flex items-center gap-4">
            <div
              className="bg-muted flex size-16 shrink-0 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <Clapperboard className="size-8" />
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Episode {film.episode_id}</p>

              <h1 className="text-3xl font-semibold tracking-tight">{film.title}</h1>
            </div>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>

            <CardContent>
              <dl className="grid gap-6 sm:grid-cols-3">
                <DetailItem label="Director" value={film.director} />

                <DetailItem label="Producer" value={film.producer} />

                <DetailItem label="Released" value={formatDate(film.release_date)} />
              </dl>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Opening crawl</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex justify-center py-4">
                <p className="text-muted-foreground whitespace-pre-line text-center font-medium leading-8 tracking-wide">
                  {film.opening_crawl}
                </p>
              </div>
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

function FilmDetailSkeleton() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Skeleton className="size-16 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-60" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>

        <CardContent className="grid gap-6 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>

        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </CardContent>
      </Card>

      <output className="sr-only" aria-live="polite">
        Loading film details...
      </output>
    </div>
  )
}
