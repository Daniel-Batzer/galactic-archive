import { CarFront } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatMeasurement, formatNumber, formatValue } from '@/lib/formatters'

import type { Vehicle } from '@/types/swapi'

type VehicleCardProps = {
  vehicle: Vehicle
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center gap-4">
        <div
          className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full"
          aria-hidden="true"
        >
          <CarFront className="size-6" />
        </div>

        <div className="min-w-0">
          <CardTitle>{vehicle.name}</CardTitle>

          <p className="text-muted-foreground mt-1 text-sm">{formatValue(vehicle.model)}</p>
        </div>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Class</dt>
            <dd>{formatValue(vehicle.vehicle_class)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Crew</dt>
            <dd>{formatNumber(vehicle.crew)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Passengers</dt>
            <dd>{formatNumber(vehicle.passengers)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground">Length</dt>
            <dd>{formatMeasurement(vehicle.length, 'm')}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
