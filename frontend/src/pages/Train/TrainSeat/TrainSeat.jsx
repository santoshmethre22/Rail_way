import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TrainData } from '../../../context/trainContex.jsx';
import './TrainSeat.css'; // Import CSS file

function TrainSeat() {
  const navigate = useNavigate();

  const {id}=useParams
  const { getTrainBooking } = TrainData();

  useEffect(() => {
    getTrainBooking({ id });
  }, [id, getTrainBooking]);

  const handleBooking = (seat) => {
    navigate(`/book/${id}/${seat}`);
  };

  return (
    <div className="train-seat-container">
      {Array.from({ length: 100 }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handleBooking(i + 1)}
          className="seat-button"
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default TrainSeat;
