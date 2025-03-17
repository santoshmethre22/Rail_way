import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BookContext = createContext({});


export const BookingContextProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [trainBooking,setTrainBooking]=useState([]);

  // Helper function to get Auth Headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  // Book a ticket
  const bookTicket = async (trainId, seat, userDetails) => {
    try {
      const response = await axios.post(
        `/api/bookings/book-ticket/${trainId}/${seat}`,
        userDetails, // ✅ Pass userDetails object here
        { headers: getAuthHeaders() }
      );
  
      // Refresh bookings after booking a ticket
      fetchUserBookings();
      return response.data;
    } catch (error) {
      console.error("Error booking the ticket:", error.message);
      throw error;
    }
  };
  

  // Get user bookings
  const fetchUserBookings = async () => {
    try {
      const response = await axios.get("/api/book/get-user-bookings", {
        headers: getAuthHeaders(),
      });
      setBookings(response.data); // Store bookings in state
    } catch (error) {
      console.error("Error fetching user bookings:", error.message);
    }
  };

  // Cancel booking
  const cancelBooking = async (userId, trainId, seat) => {
    try {
      const response = await axios.delete(`/api/book/cancelBooking/${userId}/${trainId}/${seat}`, {
        headers: getAuthHeaders(),
         // Send data in the request body
      });
      // Refresh bookings after cancellation
      fetchUserBookings();
      return response.data;
    } catch (error) {
      console.error("Error canceling the booking:", error.message);
      throw error;
    }
  };

  // const getAllBooking=async(id)=>{

  //   const response=await axios.get("",)

  //   if(!response) return res .status(403).json("the response is not came");

  //   setTrainBooking(response.data);


  // }


  const getUserHistory=async({id})=>{

    try {
      const response =await axios.get(`api/book/get-user-history/:id`,{
          headers:getAuthHeaders(),
      })
  
      setBookings(response.data)
    } catch (error) {

      console.error("Error fetching booking history:", error.message)
      
    }


  }

  // Auto-fetch bookings when the provider mounts
  useEffect(() => {
    fetchUserBookings();
  }, []);

  return (
    <BookContext.Provider value={{ 
      bookTicket, 
      cancelBooking, 
      fetchUserBookings,
      getUserHistory
      }}>
      {children}
    </BookContext.Provider>
  );
};

// Custom Hook for consuming the context
export const Booking = () => useContext(BookContext);
