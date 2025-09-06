import React, { useState } from 'react';
import { Input, Select } from "../../components/index.js";
import bookingService from '../../server/bookService.js';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { bookTicket } from "../../store/bookingSlice.js"

function BookTicket({ className = "AC" }) {

  const { state } = useLocation();
  const seatNumber = state?.seatNumber || {};


  const user = useSelector((state) => (state.auth.userData));
  const train = useSelector((state) => state.train.trainData);


  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        trainId: train._id,
        seat: seatNumber,
        className,
        ...userData, 
      };

      console.log("the booking data",userData)
      const booking = await bookingService.bookTicket(payload);
      dispatch(bookTicket({ booking :{ ...booking, user:user, train:train }}));

      alert("Ticket booked successfully!");
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert("Failed to book ticket. Please try again.");
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Book Ticket - {train?.name || "Unknown Train"}
      </h2>
      <p className="mb-4">Seat: {seatNumber} | Class: {className}</p>

      <form onSubmit={handleSubmit}>
        <Input label="Name" name="name" type="text" value={userData.name} onChange={handleChange} placeholder="Enter Name" />
        <Input label="Email" name="email" type="email" value={userData.email} onChange={handleChange} placeholder="Enter Email" />
        <Input label="Phone" name="phone" type="tel" value={userData.phone} onChange={handleChange} placeholder="Enter Phone" />
        <Input label="Age" name="age" type="number" value={userData.age} onChange={handleChange} placeholder="Enter Age" />


        <Select
          options={["Male", "Female", "Other"]}
          label="Gender" name="gender"
          value={userData.gender}
          onChange={handleChange} />

        <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookTicket;
