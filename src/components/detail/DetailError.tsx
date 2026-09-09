import { ApiError } from '@/api/client'
import { Button } from '@/components/ui/button'

type DetailErrorProps = {
  resourceName: string
  error: Error
  onRetry: () => void
}

export function DetailError({ resourceName, error, onRetry }: DetailErrorProps) {
  if (error instanceof ApiError && error.status === 404) {
    return (
      <output className="block">
        <p className="font-medium">{capitalize(resourceName)} not found.</p>

        <p className="text-muted-foreground mt-1 text-sm">
          The requested {resourceName} does not exist in the Galactic Archive.
        </p>
      </output>
    )
  }

  return (
    <div role="alert">
      <p className="font-medium">Something went wrong while loading this {resourceName}.</p>

      <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>

      <Button className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
