import { Link, Route, Routes } from 'react-router'

import { HomePage } from './pages/HomePage'
import { PeoplePage } from './pages/PeoplePage'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/people">People</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
      </Routes>
    </>
  )
}

export default App
