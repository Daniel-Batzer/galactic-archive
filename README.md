# Galactic Archive

A Star Wars themed data explorer built with React and the SWAPI API.

The application provides searchable and paginated views for all major SWAPI resources, dedicated detail pages and navigation between related resources.

The project was developed as a time-boxed frontend coding challenge with a focus on pragmatic architecture, accessibility, responsive UX and maintainability.

**Live Demo:** [galactic-archive.vercel.app](https://galactic-archive.vercel.app)

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
- Total result counts on resource overviews
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
- Overlay-style mobile navigation without layout shifts
- Custom 404 page for unsupported routes
- Resource-specific `404 Not Found` handling for missing API resources
- Retry behavior for temporary API and network failures
- Keyboard accessible navigation and focus states
- Reduced-motion aware hover effects
- Subtle Star Wars inspired visual theming

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
- Vercel

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
- Typed HTTP errors for status-aware error handling

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

For development, `VITE_SIMULATE_API_ERROR` can be enabled to manually verify error states.

### Error Handling

HTTP failures are represented through a typed `ApiError` that preserves the response status code.

This allows the UI to distinguish between different failure types:

- `404 Not Found` responses render a resource-specific not-found state
- Other HTTP failures keep the standard error state with retry functionality
- Simulated or network-level failures also use the retryable error state

This keeps missing data separate from temporary technical failures.

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
- Resource result counts
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
- Semantic status output for non-critical not-found states
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

## Deployment

The application is deployed on Vercel.

Because the project uses client-side routing, Vercel is configured with a SPA rewrite so that directly opened detail routes such as:

```text
/people/1
/planets/1
```

resolve correctly even after a browser refresh.

## Technical Decisions

### React + Vite

A client-side React application was sufficient for the requirements of this project.

Vite keeps the setup lightweight and avoids introducing server-side rendering or additional framework functionality that is not required for this data explorer.

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

### Subtle Visual Theming

The application uses a restrained Star Wars inspired visual style rather than attempting to recreate the visual language of the films.

The home page uses a lightweight CSS-based starfield and subtle space-inspired styling while the resource views remain focused on readability and usability.

No additional animation or graphics library was required.

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
9. Lightweight visual polish
10. Deployment

Some possible features were intentionally left out.

### Favorites

Favorites would require additional persistent client state but would add relatively little value to the core API exploration use case.

They were therefore not prioritized within the timebox.

### Elaborate Star Wars Animations

A more heavily themed interface could include animated starfields, more complex transitions or a scrolling opening crawl.

These were intentionally deprioritized in favor of functionality, responsive behavior and accessibility.

The current motion is deliberately subtle and respects reduced-motion preferences.

### Offline / PWA Support

Persistent query caching or full Progressive Web App functionality could improve offline behavior.

This was considered outside the core scope of the challenge.

### Localization

The application UI could be localized, but SWAPI itself provides English resource data.

Localizing only the surrounding application labels while leaving the underlying API content untranslated was considered inconsistent for the current scope.

## Possible Future Improvements

Given additional development time, the next steps would focus on deeper resource relationships, navigation context, observability, testing and production-readiness.

### Richer Resource Relationships

The current application focuses most strongly on related resources in the person detail view.

The same relationship model could be expanded consistently across all detail pages. For example:

- Planets could link to residents and films
- Films could link to characters, planets, species, vehicles and starships
- Species could link to people, films and homeworlds
- Vehicles and starships could link to pilots and films

The existing shared related-resource components already provide a foundation for this.

### Context-Aware Navigation

Navigation could preserve the user's origin when moving between related resources.

For example:

```text
Luke Skywalker
→ Tatooine
→ Back to Luke Skywalker
```

Directly opened detail URLs would still fall back to the relevant resource overview.

### Additional Integration Testing

Further tests could cover:

- Pagination
- Error and retry flows
- URL synchronization for search and pagination
- Related resource loading
- Mobile navigation
- Direct detail-page navigation
- Empty search results
- Resource-specific 404 handling

### Observability and Product Metrics

For a production application, observability would be added to better understand both technical failures and how the application is actually used.

Possible additions include:

- Structured client-side logging
- Centralized error monitoring
- Performance monitoring and Web Vitals
- API request latency and failure metrics
- Privacy-conscious product analytics
- Feature usage metrics
- Monitoring of search and pagination usage
- Tracking related-resource navigation
- Monitoring retry and 404 frequency

These metrics could help identify technical issues, validate feature usage and guide future product decisions without relying only on assumptions.

### Production Hardening

For a production deployment, additional work could include:

- Automated accessibility checks
- Deployment previews
- Persistent query caching
- Runtime configuration
- Stronger monitoring and alerting
- Optional PWA support

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
- Deployment
- Documentation
