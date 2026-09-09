import { useEffect, useRef, useState } from 'react'

import { Input } from '@/components/ui/input'

type ResourceSearchProps = {
  id: string
  initialValue: string
  label: string
  placeholder: string
  onSearch: (value: string) => void
  debounceMs?: number
}

export function ResourceSearch({
  id,
  initialValue,
  label,
  placeholder,
  onSearch,
  debounceMs = 350,
}: ResourceSearchProps) {
  const [value, setValue] = useState(initialValue)

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

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
    }, debounceMs)
  }

  return (
    <div className="max-w-md">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <Input
        id={id}
        type="search"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
