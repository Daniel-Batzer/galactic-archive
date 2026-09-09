import { Route, Routes } from 'react-router'

import { AppLayout } from '@/layout/AppLayout'
import { HomePage } from '@/pages/HomePage'
import { PeoplePage } from '@/pages/PeoplePage'
import { PlanetsPage } from './pages/PlanetsPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/planets" element={<PlanetsPage />} />
      </Route>
    </Routes>
  )
}

export default App
