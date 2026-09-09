import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type ResourceGridSkeletonProps = {
  count?: number
  label: string
}

export function ResourceGridSkeleton({ count = 10, label }: ResourceGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} aria-hidden="true">
          <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-6 w-36" />
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </CardContent>
        </Card>
      ))}

      <output className="sr-only" aria-live="polite">
        {label}
      </output>
    </div>
  )
}
