import React, { useState } from "react";
import {TrainDashboard} from "../components/index.js";
import { Search } from "../components/index.js";

function Home() {
  

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Search Section */}
      <div className="flex justify-center mb-6 px-6">
        <Search />
        <TrainDashboard />
      </div>

      {/* Train Cards */}
     
    </div>
  );
}

export default Home;
