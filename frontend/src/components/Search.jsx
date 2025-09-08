import React, { useState } from "react";
import { Input, Select } from "./index.js";
import { useNavigate } from "react-router-dom";
import trainService from "../server/trainService.js";

const RailwaySearch = () => {
  const navigate = useNavigate();
  const [name, setTrainName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [number, setTrainNumber] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [type, setType] = useState("source");

  const resetForm = () => {
    setTrainName("");
    setSource("");
    setDestination("");
    setTrainNumber("");
    setDepartureDate("");
    setType("source");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not selected";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, source, destination, number, departureDate, type };
      const data = await trainService.searchTrain(payload);

      if (!data) {
        alert("No trains found");
        return;
      }
      navigate("/searched-train", { state: { train: data } });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start bg-gray-50  py-5 pb-0 my-0">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Railway Ticket Booking</h1>
      </div>

      {/* Search Form */}
      <div className="w-full max-w-lg  rounded-2xl shadow-md p-6">
        <Select
          label="Search Type"
          options={["source", "trainNumber", "trainName"]}
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {type === "source" && (
            <div className="space-y-2">
              <Input
                label="From"
                placeholder="Enter source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
              <Input
                label="To"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          )}

          {type === "trainNumber" && (
            <Input
              label="Train Number"
              placeholder="Enter train number"
              value={number}
              onChange={(e) => setTrainNumber(e.target.value)}
            />
          )}

          {type === "trainName" && (
            <Input
              label="Train Name"
              placeholder="Enter train name"
              value={name}
              onChange={(e) => setTrainName(e.target.value)}
            />
          )}

          <Input
            label="Date"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />


          <div className="flex space-x-4 pt-2">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 transition"
            >
              Search
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 transition"
            >
              Reset
            </button>
          </div>

        </form>
      </div>

      {departureDate && (
        <div className="mt-6 text-gray-700">
          <h3 className="text-lg font-medium">
            Showing results for: {formatDate(departureDate)}
          </h3>
        </div>
      )}
    </div>
  );
};

export default RailwaySearch;
