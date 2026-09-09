import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { getResourceId } from '@/lib/swapi'
import { cn } from '@/lib/utils'

type ResourceCardLinkProps = {
  url: string
  basePath: string
  children: ReactNode
  className?: string
}

export function ResourceCardLink({ url, basePath, children, className }: ResourceCardLinkProps) {
  const resourceId = getResourceId(url)

  if (!resourceId) {
    return <>{children}</>
  }

  return (
    <Link
      to={`${basePath}/${resourceId}`}
      className={cn(
        'block rounded-xl',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
    >
      {children}
    </Link>
  )
}
