import React, { useState } from "react";
import {TrainCard} from "../components/index.js";
import { Search } from "../components/index.js";

function Home() {
  const [allTrain, setAllTrain] = useState([
    {
      id: 1,
      name: "Rajdhani Express",
      number: "12301",
      source: "Mumbai",
      destination: "Delhi",
      departure: "16:00",
      arrival: "08:00",
      duration: "16h",
      classes: ["1A", "2A", "3A"],
    },
    {
      id: 2,
      name: "Shatabdi Express",
      number: "12001",
      source: "Delhi",
      destination: "Bhopal",
      departure: "06:00",
      arrival: "14:00",
      duration: "8h",
      classes: ["CC", "EC"],
    },
    {
      id: 3,
      name: "Duronto Express",
      number: "12245",
      source: "Howrah",
      destination: "New Delhi",
      departure: "12:05",
      arrival: "08:00",
      duration: "19h 55m",
      classes: ["2A", "3A", "SL"],
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Search Section */}
      <div className="flex justify-center mb-6 px-6">
        <Search />
      </div>

      {/* Train Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-screen-xl mx-auto">
        {allTrain.map((train) => (
          <TrainCard key={train.id} train={train} />
        ))}
      </div>
    </div>
  );
}

export default Home;
