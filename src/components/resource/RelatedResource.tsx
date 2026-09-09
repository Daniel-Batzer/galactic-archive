import type { LucideIcon } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const relatedResourceClassName =
  'flex min-h-14 min-w-32 items-center gap-3 rounded-lg border px-3 py-2'

type RelatedResourceProps = {
  icon: LucideIcon
  label: string
  name: string
  className?: string
}

export function RelatedResource({ icon: Icon, label, name, className }: RelatedResourceProps) {
  return (
    <div className={cn('bg-muted/50', relatedResourceClassName, className)}>
      <span
        className="bg-background flex size-8 shrink-0 items-center justify-center rounded-full"
        aria-hidden="true"
      >
        <Icon className="size-4" />
      </span>

      <div className="min-w-0">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="font-medium">{name}</p>
      </div>
    </div>
  )
}

type RelatedResourceSkeletonProps = {
  className?: string
}

export function RelatedResourceSkeleton({ className }: RelatedResourceSkeletonProps) {
  return (
    <div className={cn(relatedResourceClassName, className)} aria-hidden="true">
      <Skeleton className="size-8 shrink-0 rounded-full" />

      <div className="space-y-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}
