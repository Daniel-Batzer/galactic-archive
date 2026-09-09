import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getVehicles } from '@/api/vehicles'
import { ResourceGrid } from '@/components/resource/ResourceGrid'
import { ResourceGridSkeleton } from '@/components/resource/ResourceGridSkeleton'
import { ResourcePagination } from '@/components/resource/ResourcePagination'
import { ResourceSearch } from '@/components/resource/ResourceSearch'
import { Button } from '@/components/ui/button'
import { VehicleCard } from '@/components/vehicles/VehicleCard'
import { useResourceSearchParams } from '@/hooks/useResourceSearchParams'
import { ResourceCount } from '@/components/resource/ResourceCount'

export function VehiclesPage() {
  const { page, search, handleSearch, handlePageChange } = useResourceSearchParams()

  const { data, isPending, isError, error, isFetching, isPlaceholderData, refetch } = useQuery({
    queryKey: ['vehicles', { page, search }],
    queryFn: ({ signal }) =>
      getVehicles({
        signal,
        page,
        search,
      }),
    placeholderData: keepPreviousData,
  })

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Vehicles</h1>

        <p className="text-muted-foreground mt-2">Explore vehicles from across the galaxy.</p>
      </header>

      <ResourceSearch
        id="vehicle-search"
        initialValue={search}
        label="Search vehicles"
        placeholder="Search vehicles..."
        onSearch={handleSearch}
      />

      <section className="mt-8 flex flex-1 flex-col" aria-label="Vehicle results">
        {data && <ResourceCount count={data.count} label="vehicle" />}
        <div className="flex-1">
          {isPending && <ResourceGridSkeleton label="Loading vehicles..." />}

          {isError && (
            <div role="alert">
              <p className="font-medium">Something went wrong while loading vehicles.</p>

              <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>

              <Button className="mt-4" onClick={() => void refetch()}>
                Try again
              </Button>
            </div>
          )}

          {data && !isError && (
            <>
              {data.results.length > 0 ? (
                <ResourceGrid
                  items={data.results}
                  getKey={(vehicle) => vehicle.url}
                  renderItem={(vehicle) => <VehicleCard vehicle={vehicle} />}
                  isUpdating={isFetching}
                />
              ) : (
                <p className="text-muted-foreground">No vehicles found.</p>
              )}
            </>
          )}
        </div>

        {data && !isError && (data.previous || data.next) && (
          <ResourcePagination
            page={page}
            hasPrevious={Boolean(data.previous)}
            hasNext={Boolean(data.next)}
            isUpdating={isFetching && !isPending}
            disabled={isPlaceholderData}
            ariaLabel="Vehicle pagination"
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  )
}
