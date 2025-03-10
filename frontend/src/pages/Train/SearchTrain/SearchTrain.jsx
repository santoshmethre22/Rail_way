import React, { useState } from "react";
import { TrainData } from "../../../context/trainContex.jsx";
import "./SearchTrain.css";

function SearchTrain() {
  const { searchTrain } = TrainData();
  const [trains, setTrains] = useState([]);
  const [source, setSource] = useState("");
  const [desti, setDesti] = useState("");
  const [error, setError] = useState(""); // State to store errors
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    if (source && desti) {
      const { trains, error } = await searchTrain(source, desti);
      setTrains(trains);
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div className="train-search-container">
      <h2>Search Trains</h2>

      <form className="train-search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="train-search-input"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          className="train-search-input"
          placeholder="Destination"
          value={desti}
          onChange={(e) => setDesti(e.target.value)}
        />
        <button type="submit" className="train-search-button">
          Search
        </button>
      </form>

      {/* Show loading message */}
      {loading && <p className="loading-message">Loading...</p>}

      {/* Show error message */}
      {error && <p className="error-message">{error}</p>}

      <ul className="train-list">
        {trains.length > 0 ? (
          trains.map((train) => (
            <li key={train._id} className="train-item">
              {train.name} - {train.source} to {train.destination}
              <button>Book</button>
            </li>
          ))
        ) : (
          !loading && !error && <p>No trains found</p>
        )}
      </ul>
    </div>
  );
}

export default SearchTrain;
