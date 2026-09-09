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
      <section className="galaxy-hero relative overflow-hidden rounded-2xl border border-white/10 px-6 py-12 text-white shadow-sm sm:px-10 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-transparent to-black/40"
          aria-hidden="true"
        />

        <div className="relative max-w-2xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-zinc-400 uppercase">
            Galactic Archive
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Explore a galaxy
            <span className="block text-zinc-300">far, far away.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            Browse characters, worlds, films, starships, species and vehicles from across the Star
            Wars universe.
          </p>
        </div>
      </section>

      <section
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Archive categories"
      >
        {resources.map(({ title, description, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Card className="h-full transition-shadow duration-200 hover:shadow-sm motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1">
              <CardContent className="flex h-full items-start gap-4">
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5" aria-hidden="true" />
                </div>

                <div>
                  <h2 className="font-semibold tracking-tight">{title}</h2>

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
