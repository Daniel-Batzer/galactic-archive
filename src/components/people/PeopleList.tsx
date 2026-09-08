import { Skeleton } from '@/components/ui/skeleton'

export function PeopleListSkeleton() {
  return (
    <div className="mt-6 space-y-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-6 w-48" />
      ))}

      <output className="sr-only" aria-live="polite">
        Loading people...
      </output>
    </div>
  )
}
