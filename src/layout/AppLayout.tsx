import { Menu, Orbit, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router'

import { cn } from '@/lib/utils'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'People', to: '/people' },
  { label: 'Planets', to: '/planets' },
  { label: 'Starships', to: '/starships' },
  { label: 'Films', to: '/films' },
  { label: 'Species', to: '/species' },
  { label: 'Vehicles', to: '/vehicles' },
]

export function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex min-h-svh flex-col">
      <header className="bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            className="flex items-center gap-2 font-semibold"
            onClick={() => setIsMenuOpen(false)}
          >
            <span
              className="bg-muted flex size-8 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <Orbit className="size-4" />
            </span>

            <span>Galactic Archive</span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <NavigationLink key={item.to} to={item.to} label={item.label} />
            ))}
          </nav>

          <button
            type="button"
            className="hover:bg-muted focus-visible:ring-ring flex size-10 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 md:hidden"
            aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            className="border-t px-4 py-3 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto grid w-full max-w-7xl gap-1">
              {navigation.map((item) => (
                <NavigationLink
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  onClick={() => setIsMenuOpen(false)}
                  mobile
                />
              ))}
            </div>
          </nav>
        )}
      </header>

      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  )
}

type NavigationLinkProps = {
  to: string
  label: string
  mobile?: boolean
  onClick?: () => void
}

function NavigationLink({ to, label, mobile = false, onClick }: NavigationLinkProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'rounded-md text-sm transition-colors',
          'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2',
          mobile ? 'px-3 py-2.5' : 'px-3 py-2',
          isActive
            ? 'bg-muted font-medium'
            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
        )
      }
    >
      {label}
    </NavLink>
  )
}
