import React, { useState } from 'react'
import { TrainData } from '../../../context/trainContex.jsx'
import "./AddTrain.css"

function AddTrain({trainId,seat}) {


  const {train,addTrain}=TrainData();

  const [message,setMessage]=useState("");
  const [trainData,setTrainData]=useState({

    trainNumber: "",
    name: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    totalSeats: "",
    fare: "",


  })


  const handleChange=(e)=>{
    setTrainData({...trainData,[e.target.name]:e.target.value})
  }


  const handleSubmit=async(e)=>{
     try {
       e.preventDefault();
      const response= await addTrain(trainData);
 
       setTrainData({
         trainNumber: "",
         name: "",
         source: "",
         destination: "",
         departureTime: "",
         arrivalTime: "",
         totalSeats: "",
         fare: "",
       });
     } catch (error) {
      setMessage(error.response?.data?.message || "Error adding train");
     }
  }

  return (
    <div className="container">
      <h2 className="title">Add Train</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="form">
        {Object.keys(trainData).map((key) => (
          <input
            key={key}
            type={key === "totalSeats" || key === "fare" ? "number" : "text"}
            name={key}
            value={trainData[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="input"
            required
          />
        ))}
        <button type="submit" className="button">Add Train</button>
      </form>
    </div>
  );
};

export default AddTrain;