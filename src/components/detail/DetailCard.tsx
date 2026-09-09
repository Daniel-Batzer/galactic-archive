import type { ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type DetailField = {
  label: string
  value: ReactNode
}

type DetailCardProps = {
  fields: DetailField[]
  children?: ReactNode
}

export function DetailCard({ fields, children }: DetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-muted-foreground text-sm">{label}</dt>

              <dd className="mt-1 font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        {children}
      </CardContent>
    </Card>
  )
}
