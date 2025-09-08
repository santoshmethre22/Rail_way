import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TicketCard } from "../index.js";
import bookingService from "../../server/bookService.js";

function Profile() {
  const navigate = useNavigate();
  const { status, userData } = useSelector((state) => state.auth);

  const name = "sam";
  const email = "sam@gmail.com";
  const phone = "898903093";
  const image = "https://via.placeholder.com/150";
  const role = "Web Developer";

  const [history, setHistory] = useState([]);
  const [showBookings, setShowBookings] = useState(false);

  const handleBooking = async () => {
    try {
      const data = await bookingService.userBooking();
      setHistory(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    handleBooking();
  }, []);

  useEffect(() => {
    console.log("this is user data", userData);
  }, [userData]);

  const social = {
    facebook: "#",
    twitter: "#",
    instagram: "#",
  };

  const handleEdit = () => {
    navigate("/edit-profile", { state: { user: userData } });
  };

  const toggleBookings = () => {
    setShowBookings(!showBookings);
  };

  if (!status) {
    return <div>Kindly Login</div>;
  }

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-3xl flex flex-col md:flex-row">
        {/* Left side */}
        <div className="bg-gradient-to-b from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-6 md:w-1/3">
          <img
            src={image}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-md"
          />
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-sm mb-4">{role}</p>
          <button
            onClick={handleEdit}
            className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition"
          >
            Edit
          </button>
        </div>

        {/* Right side */}
        <div className="flex-1 p-6">
          <h3 className="text-lg font-semibold text-gray-700">Information</h3>
          <hr className="my-3" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Email</h4>
              <p className="text-gray-800">{email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Phone</h4>
              <p className="text-gray-800">{phone}</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6">Social</h3>
          <hr className="my-3" />

          <div className="flex space-x-4">
            <a
              href={social.facebook}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:scale-110 transition"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href={social.twitter}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:scale-110 transition"
            >
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a
              href={social.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-pink-500 hover:scale-110 transition"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Booking history */}
    
  <button
    onClick={toggleBookings}
    className="bg-gradient-to-r from-blue-500 to-indigo-600 
               text-white px-6 py-2 rounded-xl shadow-md 
               hover:from-blue-600 hover:to-indigo-700 
               focus:ring-2 focus:ring-blue-400 
               transition font-medium"
  >
    {showBookings ? "Hide History" : "Show History"}
  </button>
 <div className="w-full max-w-3xl mt-6 flex justify-center">
        {showBookings && (
          <div className="mt-4 space-y-4">
            {history.length > 0 ? (
              history.map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
              ))
            ) : (
              <p className="text-gray-500">No booking history found.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;
