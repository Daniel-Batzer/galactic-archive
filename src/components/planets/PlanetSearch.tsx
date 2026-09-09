import { useRef, useState } from 'react'

import { Input } from '@/components/ui/input'

type PlanetSearchProps = {
  initialValue: string
  onSearch: (value: string) => void
}

export function PlanetSearch({ initialValue, onSearch }: PlanetSearchProps) {
  const [value, setValue] = useState(initialValue)

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = (nextValue: string) => {
    setValue(nextValue)

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    const normalizedValue = nextValue.trim()

    if (!normalizedValue) {
      onSearch('')
      return
    }

    debounceTimer.current = setTimeout(() => {
      onSearch(normalizedValue)
    }, 350)
  }

  return (
    <div className="max-w-md">
      <label htmlFor="planet-search" className="sr-only">
        Search planets
      </label>

      <Input
        id="planet-search"
        type="search"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Search planets..."
      />
    </div>
  )
}
