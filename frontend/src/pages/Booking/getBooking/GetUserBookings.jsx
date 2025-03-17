import React, { useEffect } from 'react';
import { Booking } from '../../../context/bookContext.jsx';

import CancelTicket from '../Cancel/CancelTicket.jsx';
import { useNavigate } from 'react-router-dom';

function GetUserBookings() {
  const { bookings, fetchUserBookings, cancelTicket } = Booking(); // Use context correctly

  const navigate=useNavigate()

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const handleCancel = (trainid,userId,seat)=>{

        navigate("/cancelBooking/:userId/:trainId/:seat")
  }


  return (
    <div>
      {bookings && bookings.length > 0 ? (
        bookings.map((data) => (
          <div key={data._id} className="booking-item">
            <h2>
              Train: {data.train.name} | Seat: {data.seat}
            </h2>
            <button onClick={() => handleCancel(data._id,data.seat,data.userId,data.trainId)}>Cancel Ticket</button>
          </div>
        ))
      ) : (
        <p>No bookings available</p>
      )}
    </div>
  );
}

export default GetUserBookings;
