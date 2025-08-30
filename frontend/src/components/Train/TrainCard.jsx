import React from "react";
import {useNavigate} from "react-router-dom"
import {Button} from "../index.js"

function TrainCard({ train }) {

  const navigate=useNavigate()
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
      <h2 className="text-xl font-semibold text-blue-600 mb-2">
        {train?.name}
      </h2>
      <p className="text-gray-700 text-sm">
        <span className="font-medium">Train No:</span> {train.number}
      </p>
      <p className="text-gray-700 text-sm">
        <span className="font-medium">From:</span> {train.source} →{" "}
        <span className="font-medium">To:</span> {train.destination}
      </p>
      <p className="text-gray-700 text-sm">
        <span className="font-medium">Departure:</span> {train.departure} |{" "}
        <span className="font-medium">Arrival:</span> {train.arrival}
      </p>
      <p className="text-gray-700 text-sm">
        <span className="font-medium">Duration:</span> {train.duration}
      </p>
      <p className="text-gray-700 text-sm">
        <span className="font-medium">Classes:</span> {train.classes.join(", ")}
      </p>

      <div>
       <Button onClick={() => navigate("/booking",{state:{train}})}
       children="Book Now" />
  

      </div>
    </div>
  );
}

export default TrainCard;
