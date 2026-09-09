import type { ReactNode } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type DetailPageSkeletonProps = {
  fieldCount: number
  children?: ReactNode
  label?: string
}

export function DetailPageSkeleton({
  fieldCount,
  children,
  label = 'Loading details...',
}: DetailPageSkeletonProps) {
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

        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: fieldCount }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-32" />
              </div>
            ))}
          </div>

          {children}
        </CardContent>
      </Card>

      <output className="sr-only" aria-live="polite">
        {label}
      </output>
    </div>
  )
}
