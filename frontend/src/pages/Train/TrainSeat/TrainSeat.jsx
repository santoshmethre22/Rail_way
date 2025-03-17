import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TrainData } from '../../../context/trainContex.jsx';
import './TrainSeat.css'; // Import CSS file

function TrainSeat() {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Correct usage of useParams
  const { getTrainBooking } = TrainData();

  useEffect(() => {
    if (id) {
      getTrainBooking(id); // ✅ Pass id directly
    } else {
      console.error("Train ID is missing in TrainSeat");
    }
  }, [id]);

  const handleBooking = (seat) => {
    navigate(`/book-ticket/${id}/${seat}`);
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
