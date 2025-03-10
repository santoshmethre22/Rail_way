import React, { useEffect, useState } from "react";
import { TrainData } from "../../../context/trainContex";
import "./GetAllTrain.css";
import { useNavigate } from "react-router-dom";

function GetAllTrain() {
  const { train, fetchAllTrain } = TrainData();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        await fetchAllTrain(); // Ensure this updates the `train` context
      } catch (err) {
        setError(err.message || "An error occurred while fetching trains.");
      }
    };

    fetchTrains();
  }, []); // Run only once on mount

  return (
    <div className="container">
      <h2 className="title">All Trains</h2>
      {error && <p className="error">{error}</p>}
      <ul className="train-list">
        {train.length > 0 ? (
          train.map((train) => (
            <li key={train.trainNumber} className="train-item">
              <p><strong>Name:</strong> {train.name}</p>
              <p><strong>Train Number:</strong> {train.trainNumber}</p>
              <p><strong>Source:</strong> {train.source}</p>
              <p><strong>Destination:</strong> {train.destination}</p>
              <p><strong>Departure:</strong> {train.departureTime}</p>
              <p><strong>Arrival:</strong> {train.arrivalTime}</p>
              <p><strong>Seats Available:</strong> {train.availableSeats}</p>
              <p><strong>Fare:</strong> ${train.fare}</p>
              
              <button onClick={() => navigate(`/update-train/${train._id}`)}>
                Update Train
              </button>
            </li>
          ))
        ) : (
          <p className="no-trains">No trains available</p>
        )}
      </ul>
    </div>
  );
}

export default GetAllTrain;
