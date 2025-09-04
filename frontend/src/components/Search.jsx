import React, { useState } from "react";
import { Input, Select } from "./index.js";
import { useNavigate } from "react-router-dom";
import trainService from "../server/trainService.js";

const RailwaySearch = () => {


  const navigate=useNavigate()
  const [name, setTrainName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [number, setTrainNumber] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [type, setType] = useState("source");

  const train=[];

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
      console.log("Search Payload:", payload);
      const data =await trainService.searchTrain(payload);
      
    if (!data ) {
      alert("No trains found");
      return;
    }
    navigate("/searched-train", { state: { train: data} });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="railway-search-container">
      <div className="search-header">
        <h1>Railway Ticket Booking</h1>
        <p>Book your train tickets in just a few clicks</p>
      </div>

      <Select
        label="Search Type"
        options={["source", "trainNumber", "trainName"]}
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <div>
        <form onSubmit={handleSubmit}>
          {type === "source" && (
            <div>
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

          <div>
            <Input
              label="Date"
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>

          <button type="submit">Search</button>

          <button type="button" onClick={resetForm}>
            Reset
          </button>
        </form>
      </div>

      {departureDate && (
        <div className="selected-date">
          <h3>Showing results for: {formatDate(departureDate)}</h3>
        </div>
      )}
    </div>
  );
};

export default RailwaySearch;
