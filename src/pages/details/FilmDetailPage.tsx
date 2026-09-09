import { useQuery } from '@tanstack/react-query'
import { Clapperboard } from 'lucide-react'
import { useParams } from 'react-router'

import { getFilm } from '@/api/films'
import { DetailCard } from '@/components/detail/DetailCard'
import { DetailError } from '@/components/detail/DetailError'
import { DetailHeader } from '@/components/detail/DetailHeader'
import { DetailPageLayout } from '@/components/detail/DetailPageLayout'
import { DetailPageSkeleton } from '@/components/detail/DetailPageSkeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/lib/formatters'

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
    <DetailPageLayout backTo="/films" backLabel="films">
      {isPending && <FilmDetailSkeleton />}

      {isError && <DetailError resourceName="film" error={error} onRetry={() => void refetch()} />}

      {film && !isError && (
        <>
          <DetailHeader
            icon={Clapperboard}
            title={film.title}
            subtitle={`Episode ${film.episode_id}`}
          />

          <DetailCard
            fields={[
              {
                label: 'Director',
                value: film.director,
              },
              {
                label: 'Producer',
                value: film.producer,
              },
              {
                label: 'Released',
                value: formatDate(film.release_date),
              },
            ]}
          />

          <Card className="mt-6">
            <CardHeader className="text-center">
              <CardTitle>Opening crawl</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground mx-auto max-w-3xl whitespace-pre-line text-center leading-8">
                {film.opening_crawl}
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </DetailPageLayout>
  )
}

function FilmDetailSkeleton() {
  return (
    <>
      <DetailPageSkeleton fieldCount={3} />

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
    </>
  )
}
