import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

    // bookings": [
    //     {
    //         "_id": "68b9ac0d036989d7df40d7f6",
    //         "name": "santosh",
    //         "age": 21,
    //         "phone": 910804175,
    //         "email": "santosh123@gmail.com",
    //         "gender": "male",
    //         "user": "68b7dcd498ef47b0ef494a13",
    //         "train": {
    //             "_id": "68b80fc8f29047e0d878537e",
    //             "name": "djaslf",
    //             "number": "12302",
    //             "source": "Mumbai",
    //             "destination": "Delhi",
    //             "departureDate": "2025-09-04T16:00:00.000Z",
    //             "arrivalDate": "2025-09-05T08:00:00.000Z",
    //             "duration": "16h",
    //             "availableSeats": 99
    //         },
    //         "seats": 84,
    //         "totalFare": 1000,
    //         "status": "confirm"
    //     },

function TicketCard({ ticket }) {
  const navigate=useNavigate();

  if (!ticket) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-5 text-center text-gray-500">
        No booking data available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 py-2">
      <h2 className="text-xl font-semibold text-blue-600 mb-2">
        {ticket?.train?.name}
      </h2>

      <p className="text-gray-700 text-sm">
        <span className="font-medium">Train No:</span> {ticket?.train?.number}
      </p>

      <p className="text-gray-700 text-sm">
        <span className="font-medium">Passenger:</span> {ticket?.name} (
        {ticket?.age}, {ticket?.gender})
      </p>

      <p className="text-gray-700 text-sm">
        <span className="font-medium">From:</span> {ticket?.train?.source} →{" "}
        <span className="font-medium">To:</span> {ticket?.train?.destination}
      </p>

      <p className="text-gray-700 text-sm">
        <span className="font-medium">Departure:</span>{" "}
        {new Date(ticket?.train?.departureDate).toLocaleString()} |{" "}
        <span className="font-medium">Arrival:</span>{" "}
        {new Date(ticket?.train?.arrivalDate).toLocaleString()}
      </p>

      <p className="text-gray-700 text-sm">
        <span className="font-medium">Duration:</span> {ticket?.train?.duration}
      </p>

      <p className="text-gray-700 text-sm">
        <span className="font-medium">Seat No:</span> {ticket?.seats}
      </p>

      <p className="text-gray-700 text-sm">
        <span className="font-medium">Fare:</span> ₹{ticket?.totalFare}
      </p>

      <p
        className={`text-sm font-semibold ${
          ticket?.status === "confirm" ? "text-green-600" : "text-red-600"
        }`}
      >
        Status: {ticket?.status}
      </p>
      <button onClick={()=>(navigate("/cancel-ticket",{state:{bookingId:ticket._id}}))} 
      className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
          Cancel
      </button>
    </div>
  );
}

export default TicketCard;

