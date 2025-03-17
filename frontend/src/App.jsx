import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Upload from './pages/upload/Upload.jsx';
import Profile from './pages/Profile/Profile.jsx';
import AddTrain from './pages/Train/AddTrain/AddTrain.jsx';
import GetAllTrain from './pages/Train/GetAllTrain/GetAllTrain.jsx';
import SearchTrain from './pages/Train/SearchTrain/SearchTrain.jsx';
import UpdateTrain from './pages/Train/UpdateTrain/UpdateTrain.jsx';
import TrainSeat from './pages/Train/TrainSeat/TrainSeat.jsx';
import BookTicket from './pages/Booking/BookTicket/BookTicket.jsx';
import CancelTicket from './pages/Booking/Cancel/CancelTicket.jsx';
import Header from './pages/Header/Header.jsx';
import Footer from "./pages/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx"
import UserBookHistory from './pages/Booking/UserHistory/UserBookHistory.jsx';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
      
        <Route path="/" element={  <Home />} />
        {/* ✅ Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* ✅ Upload and Profile Routes */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        {/* ✅ Train Management Routes */}
        <Route path="/add-train" element={<AddTrain />} />
        <Route path="/get-all-trains" element={<GetAllTrain />} />
        <Route path="/search-train" element={<SearchTrain />} />
        <Route path="/update-train/:id" element={<UpdateTrain />} />
        <Route path="/get-train-booking/:id" element={<TrainSeat />} />
        {/* ✅ Booking Routes */}
        <Route path="/book-ticket/:trainId/:seat" element={<BookTicket />} />
        <Route path='/cancelBooking/:userId/:trainId/:seat' element={<CancelTicket />} />
        <Route path='/get-user-history/:id' element={<UserBookHistory />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
