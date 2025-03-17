import React from 'react';
import { Booking } from '../../../context/bookContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CancelTicket.css'; // Import the CSS file

function CancelTicket() {
  const navigate = useNavigate();
  const { trainId, userId, seat } = useParams();
  const { CancelTicket } = Booking();

  const handleSubmit = async () => {
    try {
      const response = await CancelTicket({ trainId, userId, seat });
      console.log('Ticket canceled:', response);
      navigate('/');
    } catch (error) {
      console.error('Error canceling ticket:', error.message);
    }
  };

  return (
    <div className="cancel-ticket-container">
      <button className="cancel-button" onClick={handleSubmit}>
        Cancel Ticket
      </button>
    </div>
  );
}

export default CancelTicket;
