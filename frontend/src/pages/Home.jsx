import React from "react";
import { TrainDashboard, Search } from "../components/index.js";

function Home() {
  return (
    <div className="w-screen min-h-screen bg-gray-100 flex flex-col">
      {/* Search Section */}
      <div className="w-full bg-white shadow-md py-6 px-6 flex justify-center">
        <Search />
      </div>

      {/* Train Dashboard Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <TrainDashboard />
      </div>
    </div>
  );
}

export default Home;
