import { PeopleCard } from '@/components/people/PeopleCard'

import type { Person } from '@/types/swapi'

type PeopleListProps = {
  people: Person[]
  isUpdating?: boolean
}

export function PeopleList({ people, isUpdating = false }: PeopleListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy={isUpdating}>
      {people.map((person) => (
        <PeopleCard key={person.url} person={person} />
      ))}
    </div>
  )
}
