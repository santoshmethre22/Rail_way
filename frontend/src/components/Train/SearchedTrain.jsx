import React from 'react'
import { useLocation } from 'react-router-dom';
import {TrainCard} from "../index.js"


function SearchedTrain() {
  const location = useLocation();
  const { train } = location.state || {};

  if (!train || train.length === 0) {
    return <div>No train in this route</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-screen-xl mx-auto">
      {train.map((t) => (
        <TrainCard key={t._id} train={t} />
      ))}
    </div>
  );
}

export default SearchedTrain;

