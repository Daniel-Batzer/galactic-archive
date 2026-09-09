import type { ReactNode } from 'react'

type ResourceGridProps<T> = {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
  isUpdating?: boolean
}

export function ResourceGrid<T>({
  items,
  getKey,
  renderItem,
  isUpdating = false,
}: ResourceGridProps<T>) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy={isUpdating}>
      {items.map((item) => (
        <div key={getKey(item)}>{renderItem(item)}</div>
      ))}
    </div>
  )
}
