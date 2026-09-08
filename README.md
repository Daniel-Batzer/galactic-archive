# Galactic Archive

A Star Wars themed data explorer built with React and the SWAPI API.

This project was created as part of a coding assignment with a recommended
development time of 4–8 hours.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Base UI
- Oxlint
- Prettier

## Technical Decisions

### React + Vite

The assignment explicitly requested a React application. Vite was chosen
to keep the project lightweight and avoid introducing framework features
that are not required for this application.

### TanStack Query

Remote API data is treated as server state and will be handled through
TanStack Query for fetching, caching and synchronization.

### No global state library

The application currently has no requirement for a dedicated global client
state solution such as Redux or Zustand.

Server state is handled by TanStack Query, navigation and URL state by
React Router, and component-specific state remains local.

### Native Fetch API

The application consumes a simple read-only REST API. Native `fetch` provides
all required functionality, so an additional HTTP dependency such as Axios
would not provide meaningful value for the current scope.

### No internationalization

SWAPI does not provide localized resource data. Translating only the interface
while keeping the underlying data in English would create an inconsistent
experience with limited benefit within the project's timebox.

### Accessibility

Accessibility is treated as a core requirement rather than an additional
feature. The application will prioritize semantic HTML, keyboard navigation,
visible focus states, sufficient contrast and reduced-motion preferences.

### Offline support

Previously fetched data may be persisted locally to provide useful fallback
content during connectivity interruptions.

Full PWA/offline application support is intentionally outside the current
scope.

## Scope

Development is intentionally limited to the recommended 4–8 hour timebox.

Features and technical decisions are prioritized based on user value,
maintainability and their relevance to the assignment rather than attempting
to maximize the number of implemented features.
