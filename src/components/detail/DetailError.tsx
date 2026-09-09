import { Button } from '@/components/ui/button'

type DetailErrorProps = {
  resourceName: string
  message: string
  onRetry: () => void
}

export function DetailError({ resourceName, message, onRetry }: DetailErrorProps) {
  return (
    <div role="alert">
      <p className="font-medium">Something went wrong while loading this {resourceName}.</p>

      <p className="text-muted-foreground mt-1 text-sm">{message}</p>

      <Button className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}
