import React, { useEffect, useState } from 'react';
import { TrainCard } from "../index.js";
import trainService from '../../server/trainService.js';

function TrainDashboard() {
  const [allTrain, setAllTrain] = useState([]);

  const getTrain = async () => {
    try {
      const trains = await trainService.getAllTrain(); 
      setAllTrain(trains);    
    } catch (error) {
      console.error("Error fetching trains:", error);
    }
  };

  useEffect(() => {
    getTrain();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full">
        {allTrain.map((train) => (
          <TrainCard key={train._id} train={train} /> 
        ))}
      </div>
    </div>
  );
}

export default TrainDashboard;
