import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { ResourceCardLink } from './ResourceCardLink'

describe('ResourceCardLink', () => {
  it('creates a detail link from a SWAPI resource URL', () => {
    render(
      <MemoryRouter>
        <ResourceCardLink url="https://swapi.py4e.com/api/people/1/" basePath="/people">
          Luke Skywalker
        </ResourceCardLink>
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', {
        name: 'Luke Skywalker',
      }),
    ).toHaveAttribute('href', '/people/1')
  })

  it('renders the content without a link when no resource id can be extracted', () => {
    render(
      <MemoryRouter>
        <ResourceCardLink url="" basePath="/people">
          Unknown person
        </ResourceCardLink>
      </MemoryRouter>,
    )

    expect(screen.getByText('Unknown person')).toBeInTheDocument()

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
