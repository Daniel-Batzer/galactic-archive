import { Route, Routes } from 'react-router'

import { AppLayout } from '@/layout/AppLayout'
import { HomePage } from '@/pages/HomePage'
import { PeoplePage } from '@/pages/PeoplePage'
import { PlanetsPage } from './pages/PlanetsPage'
import { StarshipsPage } from '@/pages/StarshipsPage'
import { FilmsPage } from './pages/FilmsPage'
import { FilmDetailPage } from '@/pages/details/FilmDetailPage'
import { SpeciesPage } from './pages/SpeciesPage'
import { VehiclesPage } from './pages/VehiclesPage'
import { PlanetDetailPage } from './pages/details/PlanetDetailPage'
import { SpeciesDetailPage } from './pages/details/SpeciesDetailPage'
import { VehicleDetailPage } from './pages/details/VehicleDetailPage'
import { StarshipDetailPage } from './pages/details/StartshipDetailPage'
import { PersonDetailPage } from './pages/details/PersonDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:id" element={<PersonDetailPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
        <Route path="/planets/:id" element={<PlanetDetailPage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/films/:id" element={<FilmDetailPage />} />
        <Route path="/species" element={<SpeciesPage />} />
        <Route path="/species/:id" element={<SpeciesDetailPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
        <Route path="/starships" element={<StarshipsPage />} />
        <Route path="/starships/:id" element={<StarshipDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
