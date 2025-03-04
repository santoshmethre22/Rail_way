import { useState } from 'react'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Router>

          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>

      </Router>

 
    </>
  )
}

export default App
