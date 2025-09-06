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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-screen-xl mx-auto">
      {allTrain.map((train) => (
        <TrainCard key={train._id} train={train} /> 
      ))}
    </div>
  );
}

export default TrainDashboard;
