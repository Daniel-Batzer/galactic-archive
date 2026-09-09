import type { UseQueryResult } from '@tanstack/react-query'
import type { LucideIcon } from 'lucide-react'

import { RelatedResource, RelatedResourceSkeleton } from '@/components/resource/RelatedResource'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type RelatedResourceSectionProps<T> = {
  title: string
  ids: string[]
  queries: UseQueryResult<T, Error>[]
  icon: LucideIcon
  getKey: (item: T) => string
  getLabel: (item: T) => string
  getName: (item: T) => string
  getTo?: (id: string, item: T) => string
  unavailableMessage: string
  partialErrorMessage: string
}

export function RelatedResourceSection<T>({
  title,
  ids,
  queries,
  icon,
  getKey,
  getLabel,
  getName,
  getTo,
  unavailableMessage,
  partialErrorMessage,
}: RelatedResourceSectionProps<T>) {
  if (ids.length === 0) {
    return null
  }

  const loadedItems = queries.flatMap((query) => (query.data ? [query.data] : []))

  const hasError = queries.some((query) => query.isError)

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {queries.map((query, index) => {
            const resourceId = ids[index]

            if (query.isPending) {
              return <RelatedResourceSkeleton key={resourceId} />
            }

            if (query.data) {
              return (
                <RelatedResource
                  key={getKey(query.data)}
                  icon={icon}
                  label={getLabel(query.data)}
                  name={getName(query.data)}
                  to={getTo ? getTo(resourceId, query.data) : undefined}
                />
              )
            }

            return null
          })}
        </div>

        {hasError && loadedItems.length === 0 && (
          <p className="text-muted-foreground text-sm">{unavailableMessage}</p>
        )}

        {hasError && loadedItems.length > 0 && (
          <p className="text-muted-foreground mt-3 text-sm">{partialErrorMessage}</p>
        )}
      </CardContent>
    </Card>
  )
}
