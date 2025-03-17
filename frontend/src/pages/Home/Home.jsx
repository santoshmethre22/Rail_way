import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/bookings');
  };

  return (
    <div className="home">
      <h1>Welcome to Train Booking System</h1>
      <p>Book your tickets quickly and securely.</p>
      <button onClick={handleBooking}>Book a Ticket</button>
    </div>
  );
}

export default Home;

