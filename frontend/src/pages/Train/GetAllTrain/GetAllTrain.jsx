import React, { useEffect, useState } from "react";
import { TrainData } from "../../../context/trainContex";
import "./GetAllTrain.css"

function GetAllTrain() {
  const { train, fetchAllTrain } = TrainData();
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetchAllTrain();
        if (response?.error) {
          setError(response.error.message);
        } else {
          setTrains(train);
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching trains.");
      }
    };

    fetchTrains();
  }, [train]);

  return (
    <div className="container">
      <h2 className="title">All Trains</h2>
      {error && <p className="error">{error}</p>}
      <ul className="train-list">
        {trains.length > 0 ? (
          trains.map((train) => (
            <li key={train.trainNumber} className="train-item">
              <p><strong>Name:</strong> {train.name}</p>
              <p><strong>Train Number:</strong> {train.trainNumber}</p>
              <p><strong>Source:</strong> {train.source}</p>
              <p><strong>Destination:</strong> {train.destination}</p>
              <p><strong>Departure:</strong> {train.departureTime}</p>
              <p><strong>Arrival:</strong> {train.arrivalTime}</p>
              <p><strong>Seats Available:</strong> {train.availableSeats}</p>
              <p><strong>Fare:</strong> ${train.fare}</p>
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
