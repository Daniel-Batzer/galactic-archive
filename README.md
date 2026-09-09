# Galactic Archive

A Star Wars themed data explorer built with React and the SWAPI API.

The application provides searchable and paginated views for all major SWAPI resources, dedicated detail pages and navigation between related resources.

The project was developed as a time-boxed frontend coding challenge with a focus on pragmatic architecture, accessibility, responsive UX and maintainability.

## Features

- Browse all six main SWAPI resource categories:
  - People
  - Planets
  - Films
  - Starships
  - Species
  - Vehicles
- Search resources using the SWAPI search endpoint
- Paginated resource lists
- Dedicated detail pages for all resource types
- Navigation between related resources
- Person details resolve related:
  - Homeworld
  - Species
  - Vehicles
  - Starships
  - Films
- Loading skeletons
- Error and empty states
- Responsive desktop and mobile navigation
- Custom 404 page for unsupported routes
- Keyboard accessible navigation and focus states
- Reduced-motion aware hover effects

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Base UI
- Lucide Icons
- Vitest
- React Testing Library
- Oxlint
- Prettier
- GitHub Actions

## Getting Started

### Requirements

- Node.js 24
- npm

### Installation

Install dependencies:

```bash
npm install
```

Create a local `.env` file:

```env
VITE_SWAPI_BASE_URL=https://swapi.py4e.com/api
VITE_SIMULATE_API_ERROR=false
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Build

```bash
npm run build
```

Runs the TypeScript build and creates a production bundle.

### Lint

```bash
npm run lint
```

Runs Oxlint.

### Format

```bash
npm run format
```

Formats the project using Prettier.

### Check Formatting

```bash
npm run format:check
```

Checks formatting without modifying files.

### Tests

```bash
npm test
```

Runs the Vitest test suite once.

```bash
npm run test:watch
```

Runs Vitest in watch mode.

## Architecture

The application intentionally keeps the architecture small and explicit.

### API Layer

API access is separated from the UI.

Shared resource helpers handle common SWAPI request patterns:

- Paginated resource collections
- Individual resources by ID
- Search parameters
- AbortSignal support for request cancellation

Resource-specific API modules provide a readable domain-facing interface such as:

```ts
getPeople()
getPerson()
getPlanets()
getPlanet()
getFilms()
getFilm()
```

The application currently uses the following SWAPI instance by default:

```text
https://swapi.py4e.com/api
```

The API base URL can be changed through `VITE_SWAPI_BASE_URL`.

### Server State

TanStack Query is used for remote server state.

Query keys separate resources and request parameters, for example:

```ts
;['people', { page, search }][('people', 'detail', id)][('planets', 'detail', id)]
```

This provides caching, request lifecycle state and reusable resource data without introducing a separate global state store.

The person detail page also demonstrates:

- A dependent query for the person's homeworld
- Parallel queries for films, species, vehicles and starships
- Partial rendering while related resources are still loading
- Independent caching of related resources

### URL State

Search terms and pagination are stored in the URL through React Router.

Example:

```text
/people?page=2&search=luke
```

This keeps browsing state shareable and allows search and pagination to remain separate from transient local component state.

### Local State

Local React state is used only for transient UI state such as:

- Search input before the debounced request
- Mobile navigation state

No global client-state library is used because the application does not currently have client state complex enough to justify one.

## Shared UI

Common patterns were extracted only after multiple real use cases appeared.

Examples include:

- Resource grids
- Resource grid skeletons
- Search
- Pagination
- Resource card navigation
- Detail page layout
- Detail headers
- Detail cards
- Detail error states
- Detail page skeletons
- Related resource cards
- Related resource sections

This was intentional.

The project avoids introducing highly generic components before their shared requirements are known. Reusable abstractions were added after duplication appeared across multiple resource types.

## Accessibility

Accessibility was treated as part of the implementation rather than as a separate enhancement.

Examples include:

- Semantic headings
- Definition lists for resource properties
- Accessible labels for search inputs
- Accessible navigation labels
- Keyboard accessible links and controls
- Visible focus states
- Decorative icons hidden from assistive technologies
- Live loading messages
- Semantic error alerts
- Touch-friendly navigation controls
- Reduced-motion aware hover effects

## Testing

The project uses Vitest and React Testing Library.

The tests intentionally focus on shared logic and important user-facing behavior rather than maximizing coverage.

Current tests cover areas such as:

- SWAPI resource ID extraction
- Value formatting
- Number formatting
- Measurement formatting
- Resource card link generation
- Resource card fallback behavior
- Search debouncing
- Immediate search reset when clearing an input
- Router parameter handling
- TanStack Query loading states
- Rendering resolved API data on a detail page

The component tests run in a `jsdom` environment.

Tests are isolated through React Testing Library cleanup after each test.

## Continuous Integration

GitHub Actions runs the following checks on pushes and pull requests:

```text
Install dependencies
        ↓
Formatting check
        ↓
Lint
        ↓
Tests
        ↓
Production build
```

This ensures the repository remains buildable and the basic quality checks remain green.

## Technical Decisions

### React + Vite Instead of Next.js

Although Next.js would also work well for this project, the assignment specifically requested a React application.

Vite keeps the solution lightweight and avoids adding framework functionality that is not required for this client-side data explorer.

### TanStack Query

SWAPI data is server state rather than application-owned client state.

TanStack Query provides:

- Caching
- Loading states
- Error states
- Request cancellation
- Independent resource queries
- Reuse of previously fetched resource data

It also allows related resources to remain independently cached instead of combining multiple API requests into one large request state.

### Native `fetch` Instead of Axios

The application only needs a relatively small read-only HTTP layer.

Native `fetch` provides everything required here, including AbortSignal support, without introducing another dependency.

### No Global State Library

Redux, Zustand or similar libraries were intentionally not added.

Current state fits naturally into:

- TanStack Query for server state
- React Router for URL state
- `useState` for local UI state

Adding another state layer would increase complexity without providing meaningful value for the current scope.

### API-Native Field Names

SWAPI responses use snake_case.

The application keeps these API field names instead of introducing a separate transformation layer because the additional mapping would provide little value for the current application size.

### Shared Components After Proven Duplication

Reusable components were not created preemptively.

For example, resource card navigation and detail page building blocks were extracted only after the same patterns appeared across multiple resource types.

This keeps abstractions small and based on actual requirements rather than predicted future requirements.

## Scope and Trade-offs

The challenge suggested a development time of approximately 4–8 hours.

Within that timebox, priority was given to:

1. Functional API integration
2. Clear application architecture
3. Reusable UI patterns
4. Loading and error handling
5. Responsive behavior
6. Accessibility
7. Focused automated tests
8. Continuous integration

Some possible features were intentionally left out.

### Favorites

Favorites would require additional persistent client state but would add relatively little value to the core API exploration use case.

They were therefore not prioritized within the timebox.

### Elaborate Star Wars Animations

A more heavily themed interface could include:

- Animated stars
- Background effects
- Scrolling opening crawls
- More resource-specific animations

These were intentionally deprioritized in favor of functionality, responsive behavior and accessibility.

The current motion is deliberately subtle and respects reduced-motion preferences.

### Offline / PWA Support

Persistent TanStack Query caching or full PWA functionality could improve offline behavior.

This was considered outside the core scope of the challenge.

### Localization

The application UI could be localized, but SWAPI itself provides English resource data.

Localizing only the application labels while leaving the underlying content untranslated was considered inconsistent for the current scope.

### Context-Aware Back Navigation

Detail pages currently provide predictable links back to their resource overview.

A possible future improvement would preserve the exact navigation origin.

For example:

```text
Luke Skywalker
→ Tatooine
→ Back to Luke Skywalker
```

while still falling back to the planets overview when a detail page is opened directly.

### Resource-Specific 404 States

Unsupported application routes have a dedicated 404 page.

Individual missing SWAPI resources currently use the standard API error state.

A future improvement could expose HTTP status codes through the API client and provide resource-specific `not found` states.

## Possible Future Improvements

Given additional development time, possible next steps would include:

- Context-aware back navigation
- Resource result counts in overview pages
- Persisted TanStack Query caching
- Additional integration tests
- More detailed visual theming
- Resource-specific 404 handling
- Optional deployment as a PWA
- Additional relationship navigation between resource detail pages

## Time Spent

Approximately **7 hours** of implementation time, including:

- Project setup
- Architecture
- API integration
- UI implementation
- Responsive navigation
- Accessibility improvements
- Refactoring
- Automated testing
- CI configuration
- Documentation
