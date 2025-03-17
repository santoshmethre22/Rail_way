import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">Train Booking</Link>
        <nav>
          <Link to="/bookings">My Bookings</Link>
          <Link to="/login">Login</Link>
          <Link to ="/register">register</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
