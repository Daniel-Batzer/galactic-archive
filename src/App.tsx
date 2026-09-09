import { Route, Routes } from 'react-router'

import { AppLayout } from '@/layout/AppLayout'
import { HomePage } from '@/pages/HomePage'
import { PeoplePage } from '@/pages/PeoplePage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
      </Route>
    </Routes>
  )
}

export default App
