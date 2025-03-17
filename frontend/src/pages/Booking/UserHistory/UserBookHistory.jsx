import React, { useEffect } from "react";
import { Booking } from "../../../context/bookContext.jsx";
import "./UserBookHistory.css"; // Import the CSS file



function UserBookHistory() {
  const {booking,getUserHistory}=Booking();
    const userId=req.params 
  useEffect(() => {

    getUserHistory(id);

  }, []);



  
  return (
    <div className="booking-history-container">
      <h2 className="booking-history-title">Booking History</h2>


      {booking.length > 0 ? (


        <ul className="booking-list">
          {booking.map((booking) => (
            <li key={booking._id} className="booking-item">
              <p className="booking-info">
                
                <strong>Train:</strong> {booking.train.name} ({booking.train.trainNumber})
                {/* <strong>from </strong>{}
                <strong>to</strong>{} */}


              </p>
              <p className="booking-info">
                <strong>Seat:</strong> {booking.seat}
              </p>
              <p className="booking-info">
                <strong>Status:</strong> {booking.status}
              </p>
              <p className="booking-info">
                <strong>Booked on:</strong> {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-booking">No booking history available.</p>
      )}
    </div>
  );
}

export default UserBookHistory;
