import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TrainData } from "../../../context/trainContex.jsx";

function UpdateTrain() {
  const { updateTrain, train } = TrainData();
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainData, setTrainData] = useState({});

  useEffect(() => {
    const selectedTrain = train.find((t) => t._id === id);
    if (selectedTrain) {
      setTrainData(selectedTrain);
    }
  }, [id, train]);

  const handleChange = (e) => {
    setTrainData({ ...trainData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTrain(id, trainData);
    
    // ✅ Navigate AFTER update
    navigate("/get-all-train");
  };

  return (
    <div className="container">
      <h2 className="title">Update Train</h2>
      <form onSubmit={handleSubmit} className="form">
        {Object.keys(trainData).map((key) => (
          <input
            key={key}
            type={key === "totalSeats" || key === "fare" ? "number" : "text"}
            name={key}
            value={trainData[key] || ""}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="input"
            required
          />
        ))}
        <button type="submit" className="button">Update Train</button>
      </form>
    </div>
  );
}

export default UpdateTrain;
