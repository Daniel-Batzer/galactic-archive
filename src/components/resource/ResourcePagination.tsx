import { Button } from '@/components/ui/button'

type ResourcePaginationProps = {
  page: number
  hasPrevious: boolean
  hasNext: boolean
  isUpdating: boolean
  disabled?: boolean
  ariaLabel: string
  onPageChange: (page: number) => void
}

export function ResourcePagination({
  page,
  hasPrevious,
  hasNext,
  isUpdating,
  disabled = false,
  ariaLabel,
  onPageChange,
}: ResourcePaginationProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <p className="text-muted-foreground text-sm">Page {page}</p>

        {isUpdating && (
          <output className="text-muted-foreground text-sm" aria-live="polite">
            Updating...
          </output>
        )}
      </div>

      <nav className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto" aria-label={ariaLabel}>
        <Button
          variant="outline"
          className="min-h-11 w-full sm:w-auto"
          disabled={!hasPrevious || disabled}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          className="min-h-11 w-full sm:w-auto"
          disabled={!hasNext || disabled}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </nav>
    </div>
  )
}
