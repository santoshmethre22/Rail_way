import React, { useState } from "react";

function AddTrain() {
  const [stations, setStations] = useState([{ name: "", date: "", time: "" }]);
  const [train, setTrain] = useState({
    name: "",
    number: "",
    source: "",
    destination: "",
    departure: "",
    arrival: "",
    duration: "",
  });


   const payload = {
      ...train,
      stations: stations,
    };

  // Handle train input change
  const handleTrainChange = (e) => {
    const { name, value } = e.target;
    setTrain({ ...train, [name]: value });
  };

  // Handle station change
  const handleStationChange = (index, field, value) => {
    const newStations = [...stations];
    newStations[index][field] = value;
    setStations(newStations);
  };

  // Add new station input row
  const handleAddStation = () => {
    setStations([...stations, { name: "", date: "", time: "" }]);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Train:", train);
    console.log("Stations:", stations);
    alert(
      "Train: " +
        JSON.stringify(train) +
        "\nStations: " +
        JSON.stringify(stations)
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 border rounded-2xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Add Train</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Train inputs */}
        <input
          type="text"
          name="name"
          value={train.name}
          onChange={handleTrainChange}
          placeholder="Train Name"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input
          type="number"
          name="number"
          value={train.number}
          onChange={handleTrainChange}
          placeholder="Train Number"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input
          type="text"
          name="source"
          value={train.source}
          onChange={handleTrainChange}
          placeholder="Source"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input
          type="text"
          name="destination"
          value={train.destination}
          onChange={handleTrainChange}
          placeholder="Destination"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input
          type="time"
          name="departure"
          value={train.departure}
          onChange={handleTrainChange}
          placeholder="Departure"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input
          type="time"
          name="arrival"
          value={train.arrival}
          onChange={handleTrainChange}
          placeholder="Arrival"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input
          type="text"
          name="duration"
          value={train.duration}
          onChange={handleTrainChange}
          placeholder="Duration"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        />

        {/* Stations Section */}
        <h3 className="text-lg font-semibold mt-6">Stations</h3>
        {stations.map((station, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center"
          >
            <input
              type="text"
              value={station.name}
              onChange={(e) =>
                handleStationChange(index, "name", e.target.value)
              }
              placeholder={`Station ${index + 1}`}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
            <input
              type="date"
              value={station.date}
              onChange={(e) =>
                handleStationChange(index, "date", e.target.value)
              }
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
            <input
              type="time"
              value={station.time}
              onChange={(e) =>
                handleStationChange(index, "time", e.target.value)
              }
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddStation}
          className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          + Add Station
        </button>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddTrain;
