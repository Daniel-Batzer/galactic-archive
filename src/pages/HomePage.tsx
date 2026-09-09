import {
  CarFront,
  Clapperboard,
  Dna,
  Orbit,
  Rocket,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router'

import { Card, CardContent } from '@/components/ui/card'

type ResourceLink = {
  title: string
  description: string
  to: string
  icon: LucideIcon
}

const resources: ResourceLink[] = [
  {
    title: 'People',
    description: 'Explore characters from across the galaxy.',
    to: '/people',
    icon: UserRound,
  },
  {
    title: 'Planets',
    description: 'Discover worlds and their environments.',
    to: '/planets',
    icon: Orbit,
  },
  {
    title: 'Films',
    description: 'Browse stories from the Star Wars saga.',
    to: '/films',
    icon: Clapperboard,
  },
  {
    title: 'Starships',
    description: 'Explore vessels built for interstellar travel.',
    to: '/starships',
    icon: Rocket,
  },
  {
    title: 'Species',
    description: 'Discover life forms from across the galaxy.',
    to: '/species',
    icon: Dna,
  },
  {
    title: 'Vehicles',
    description: 'Browse vehicles used across countless worlds.',
    to: '/vehicles',
    icon: CarFront,
  },
]

export function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-2xl">
        <p className="text-muted-foreground text-sm font-medium">Galactic Archive</p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          Explore a galaxy far, far away.
        </h1>

        <p className="text-muted-foreground mt-4 text-lg leading-8">
          Browse characters, worlds, films, starships, species and vehicles from the Star Wars
          universe.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Archive categories">
        {resources.map(({ title, description, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Card className="h-full transition-shadow duration-200 hover:shadow-sm motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1">
              <CardContent className="flex h-full items-start gap-4">
                <span
                  className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full"
                  aria-hidden="true"
                >
                  <Icon className="size-6" />
                </span>

                <div>
                  <h2 className="text-lg font-semibold">{title}</h2>

                  <p className="text-muted-foreground mt-1 text-sm leading-6">{description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  )
}
