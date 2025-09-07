import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mytrain } from "../../store/trainSlice.js";

function TrainCard({ train }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(mytrain({ train }));
    navigate("/seat-select");
  };

  const departureDate = new Date(train.departureDate).toLocaleDateString();
  const arrivalDate = new Date(train.arrivalDate).toLocaleDateString();

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 flex flex-col justify-between">
      {/* Train Name */}
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        {train?.name}
      </h2>

      {/* Train Info */}
      <div className="space-y-2 text-gray-700 text-sm flex-1">
        <p>
          <span className="font-medium">Train No:</span> {train.number}
        </p>
        <p>
          <span className="font-medium">From:</span> {train.source} →{" "}
          <span className="font-medium">To:</span> {train.destination}
        </p>
        <p>
          <span className="font-medium">Departure:</span> {departureDate} |{" "}
          <span className="font-medium">Arrival:</span> {arrivalDate}
        </p>
        <p>
          <span className="font-medium">Duration:</span> {train.duration}
        </p>
      </div>

      {/* Book Now Button */}
       <button
        onClick={handleClick}
        style={{ backgroundColor: "#2563EB" }} // Tailwind blue-600 hex
        className="mt-4 w-full text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
      >
        Book Now
      </button>
    </div>
  );
}

export default TrainCard;
