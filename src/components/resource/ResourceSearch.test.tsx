import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ResourceSearch } from './ResourceSearch'

describe('ResourceSearch', () => {
  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('debounces search input by 350 ms', () => {
    vi.useFakeTimers()

    const onSearch = vi.fn()

    render(
      <ResourceSearch
        id="people-search"
        initialValue=""
        label="Search people"
        placeholder="Search people..."
        onSearch={onSearch}
      />,
    )

    const input = screen.getByRole('searchbox', {
      name: 'Search people',
    })

    fireEvent.change(input, {
      target: { value: 'Luke' },
    })

    expect(onSearch).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(349)
    })

    expect(onSearch).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith('Luke')
  })

  it('only searches for the latest value', () => {
    vi.useFakeTimers()

    const onSearch = vi.fn()

    render(
      <ResourceSearch
        id="people-search"
        initialValue=""
        label="Search people"
        placeholder="Search people..."
        onSearch={onSearch}
      />,
    )

    const input = screen.getByRole('searchbox', {
      name: 'Search people',
    })

    fireEvent.change(input, {
      target: { value: 'Lu' },
    })

    act(() => {
      vi.advanceTimersByTime(200)
    })

    fireEvent.change(input, {
      target: { value: 'Luke' },
    })

    act(() => {
      vi.advanceTimersByTime(149)
    })

    expect(onSearch).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(201)
    })

    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith('Luke')
  })

  it('clears the search immediately when the input is emptied', () => {
    vi.useFakeTimers()

    const onSearch = vi.fn()

    render(
      <ResourceSearch
        id="people-search"
        initialValue="Luke"
        label="Search people"
        placeholder="Search people..."
        onSearch={onSearch}
      />,
    )

    const input = screen.getByRole('searchbox', {
      name: 'Search people',
    })

    fireEvent.change(input, {
      target: { value: '' },
    })

    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith('')
  })
})
