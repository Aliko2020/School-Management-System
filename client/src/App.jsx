import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'

function App() {
  return (
    <Router>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
      
        </Routes>
      </main>
    </Router>
  )
}

export default App
