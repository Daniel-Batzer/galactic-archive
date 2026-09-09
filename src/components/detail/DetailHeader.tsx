import type { LucideIcon } from 'lucide-react'

type DetailHeaderProps = {
  icon: LucideIcon
  title: string
  subtitle: string
}

export function DetailHeader({ icon: Icon, title, subtitle }: DetailHeaderProps) {
  return (
    <header className="mb-8 flex items-center gap-4">
      <div
        className="bg-muted flex size-16 shrink-0 items-center justify-center rounded-full"
        aria-hidden="true"
      >
        <Icon className="size-8" />
      </div>

      <div>
        <p className="text-muted-foreground text-sm">{subtitle}</p>

        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      </div>
    </header>
  )
}
