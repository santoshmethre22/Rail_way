import React, { useState } from "react";
import trainService from "../../server/trainService";

function AddTrain() {
  const [stations, setStations] = useState([{ name: "", date: "", time: "" }]);

  const [train, setTrain] = useState({
    name: "",
    number: "",
    source: "",
    destination: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    duration: "",
  });


  const handleTrainChange = (e) => {
    const { name, value } = e.target;
    setTrain({ ...train, [name]: value });
  };

  const handleStationChange = (index, field, value) => {
    const newStations = [...stations];
    newStations[index][field] = value;
    setStations(newStations);
  };


  const handleAddStation = () => {
    setStations([...stations, { name: "", date: "", time: "" }]);
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!train.departureDate || !train.departureTime || !train.arrivalDate || !train.arrivalTime) {
      alert("Please fill in all date and time fields.");
      return;
    }

    const departureDateTime = new Date(`${train.departureDate}T${train.departureTime}:00`);
    const arrivalDateTime = new Date(`${train.arrivalDate}T${train.arrivalTime}:00`);

    const payload = {
      name: train.name,
      number: train.number,
      source: train.source,
      destination: train.destination,
      departureDate: departureDateTime,
      arrivalDate: arrivalDateTime,
      duration: train.duration,
      stations: stations.map((s) => ({
      name: s.name,
      date: new Date(`${s.date}T${s.time}:00`),
      })),
    };

    const  data = await trainService.addTrain(payload);
    
    console.log("the data is ",data);
    if (!data) {
      throw new Error("Train not created");
    }

    alert("Train added successfully!");
    console.log("Response--->:", train);

  
    setTrain({
      name: "",
      number: "",
      source: "",
      destination: "",
      departureDate: "",
      departureTime: "",
      arrivalDate: "",
      arrivalTime: "",
      duration: "",
    });
    setStations([{ name: "", date: "", time: "" }]);
  } catch (error) {
    console.error("Error adding train:", error);
    alert("Failed to add train. Please try again.");
  }
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
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="number"
          value={train.number}
          onChange={handleTrainChange}
          placeholder="Train Number"
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="source"
          value={train.source}
          onChange={handleTrainChange}
          placeholder="Source"
          className="w-full px-3 py-2 border rounded-lg"
        />

      
        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            name="departureDate"
            value={train.departureDate}
            onChange={handleTrainChange}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="time"
            name="departureTime"
            value={train.departureTime}
            onChange={handleTrainChange}
            className="px-3 py-2 border rounded-lg"
          />
        </div>

        <input
          type="text"
          name="destination"
          value={train.destination}
          onChange={handleTrainChange}
          placeholder="Destination"
          className="w-full px-3 py-2 border rounded-lg"
        />

        {/* Arrival */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            name="arrivalDate"
            value={train.arrivalDate}
            onChange={handleTrainChange}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="time"
            name="arrivalTime"
            value={train.arrivalTime}
            onChange={handleTrainChange}
            className="px-3 py-2 border rounded-lg"
          />
        </div>

        <input
          type="text"
          name="duration"
          value={train.duration}
          onChange={handleTrainChange}
          placeholder="Duration"
          className="w-full px-3 py-2 border rounded-lg"
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
              className="px-3 py-2 border rounded-lg"
            />
            <input
              type="date"
              value={station.date}
              onChange={(e) =>
                handleStationChange(index, "date", e.target.value)
              }
              className="px-3 py-2 border rounded-lg"
            />
            <input
              type="time"
              value={station.time}
              onChange={(e) =>
                handleStationChange(index, "time", e.target.value)
              }
              className="px-3 py-2 border rounded-lg"
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
