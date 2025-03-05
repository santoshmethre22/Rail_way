import { useState } from 'react'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Upload from './pages/upload/Upload.jsx'
import Profile from './pages/Profile/Profile.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
