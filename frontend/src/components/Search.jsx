import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TrainSearch({ onSearch }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!source || !destination || !date) {
      alert("Please fill all fields!");
      return;
    }
    onSearch({ source, destination, date });
  };

  return (
    <Card className="max-w-xl mx-auto mt-8 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Search Trains</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Source */}
          <div>
            <label className="block text-sm font-medium mb-1">Source</label>
            <input
              type="text"
              placeholder="Enter source station"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium mb-1">Destination</label>
            <input
              type="text"
              placeholder="Enter destination station"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Button */}
          <Button type="submit" className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
