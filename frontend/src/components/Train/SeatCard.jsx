import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SeatCard() {
  const navigate = useNavigate();
  const [val, setVal] = useState();

  const n = 100;
  const seats = Array.from({ length: n }, (_, i) => i + 1);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6">Select Your Seat</h2>

      <div className="grid grid-cols-10 gap-3">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => {
              setVal(seat);
              navigate("/booking", { state: { seatNumber: seat } });
            }}
            className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 transition"
          >
          Seat  {seat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SeatCard;
