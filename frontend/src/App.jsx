import { useState } from 'react'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Upload from './pages/upload/Upload.jsx'
import Profile from './pages/Profile/Profile.jsx'
import AddTrain from './pages/Train/AddTrain/AddTrain.jsx'
import GetAllTrain from './pages/Train/GetAllTrain/GetAllTrain.jsx'
import SearchTrain from './pages/Train/SearchTrain/SearchTrain.jsx'
import UpdateTrain from './pages/Train/UpdateTrain/UpdateTrain.jsx'
import TrainSeat from './pages/Train/TrainSeat/TrainSeat.jsx'
import BookTicket from './pages/Booking/BookTicket/BookTicket.jsx'

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
            <Route path='/Add-Train' element={<AddTrain />} />
            <Route path='/get-all-train' element={<GetAllTrain />} />
            <Route path='/search-Train' element={<SearchTrain />} />
            <Route path='/search-Train' element={<SearchTrain />} />
            <Route path="/update-train/:id" element={<UpdateTrain />} />
            <Route path='/train-seat/:id' element={<TrainSeat />} />
            <Route path ="/book/:id/:seat" element={<BookTicket />} />
          </Routes> 
      </Router>
    </>
  )
}

export default App
