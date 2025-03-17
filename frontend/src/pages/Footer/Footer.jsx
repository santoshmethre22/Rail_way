import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Train Booking. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
