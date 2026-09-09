import { Link } from 'react-router'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function NotFoundPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <p className="text-muted-foreground text-sm font-medium">404</p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>

      <p className="text-muted-foreground mt-3 max-w-md">
        The page you are looking for does not exist or is not supported by the Galactic Archive.
      </p>

      <Link to="/" className={cn(buttonVariants({ variant: 'default' }), 'mt-6')}>
        Back to home
      </Link>
    </main>
  )
}
