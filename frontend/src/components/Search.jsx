import React, { useState } from 'react';
import { Input, Select } from "./index.js";

const RailwaySearch = () => {
  const [trainName, setTrainName] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [selectType, setSelecttype] = useState(null);

  const resetForm = () => {
    setTrainName('');
    setSource('');
    setDestination('');
    setTrainNumber('');
    setTravelDate('');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not selected';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleSelect = (e) => {
    setSelecttype(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ trainName, trainNumber, source, destination, travelDate });
  };

  return (
    <div className="railway-search-container">
      <div className="search-header">
        <h1>Railway Ticket Booking</h1>
        <p>Book your train tickets in just a few clicks</p>
      </div>

      <Select
        label="Select type"
        options={["trainNumber", "trainName"]}
        value={selectType}
        onChange={handleSelect}
      />

      <div>
        <form onSubmit={handleSubmit}>
          {selectType && (
            <div>
              {selectType === "trainNumber" && (
                <Input
                  label="Train Number"
                  placeholder="Enter train number"
                  value={trainNumber}
                  onChange={(e) => setTrainNumber(e.target.value)}
                />
              )}

              {selectType === "trainName" && (
                <Input
                  label="Train Name"
                  placeholder="Enter Train Name"
                  value={trainName}
                  onChange={(e) => setTrainName(e.target.value)}
                />
              )}
            </div>
          )}

          {!selectType && (
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

          <div>
            <Input
              label="Date"
              placeholder="Select date"
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
            />
          </div>

          <button type="submit">Search</button>
        </form>
      </div>

      {travelDate && (
        <div className="selected-date">
          <h3>Showing results for: {formatDate(travelDate)}</h3>
        </div>
      )}
    </div>
  );
};

export default RailwaySearch;
