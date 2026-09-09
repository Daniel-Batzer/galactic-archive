import { Link, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b">
        <nav
          className="mx-auto flex w-full max-w-7xl gap-4 px-4 py-3 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link to="/">Home</Link>
          <Link to="/people">People</Link>
        </nav>
      </header>

      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  )
}
