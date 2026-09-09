import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type DetailPageLayoutProps = {
  backTo: string
  backLabel: string
  children: ReactNode
}

export function DetailPageLayout({ backTo, backLabel, children }: DetailPageLayoutProps) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <Link to={backTo} className={cn(buttonVariants({ variant: 'ghost' }), 'mb-6 self-start')}>
        <ArrowLeft className="size-4" />
        Back to {backLabel}
      </Link>

      {children}
    </main>
  )
}
