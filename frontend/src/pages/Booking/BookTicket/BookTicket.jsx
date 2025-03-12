// import { useState } from "react";
// import { bookTicket } from "../services/bookingService"; // Import the bookTicket function
// const TicketBooking = ({ trainId, seat }) => {
//   const [loading, setLoading] = useState(false);
//  const [message, setMessage] = useState("");
//   const handleBooking = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     try {
//       const result = await bookTicket(trainId, seat);
//       setMessage(`Ticket booked successfully: ${result?.ticketId}`);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to book the ticket");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Book a Ticket</h2>
//       <form onSubmit={handleBooking} className="space-y-4">
//         {/* Train ID Display */}
//         <div>
//           <label className="block text-gray-700">Train ID:</label>
//           <input
//             type="text"
//             value={trainId}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         {/* Seat Number Display */}
//         <div>
//           <label className="block text-gray-700">Seat Number:</label>
//           <input
//             type="text"
//             value={seat}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Booking..." : "Book Ticket"}
//         </button>
//       </form>
//       {/* Message */}
//       {message && (
//         <p className={`mt-4 text-center ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };
// export default TicketBooking;


import React, { useState } from "react";
import { Booking } from "../../../context/bookContext.jsx";
import "./BookTicket.css";
import { useParams } from "react-router-dom";

function BookTicket() {
  const{ trainId, seat }=useParams();

  const { bookTicket } = Booking();


  const [details, setDetails] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    gender: "male",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await bookTicket(trainId, seat, details);
      setMessage(`Ticket booked successfully: ${result?.ticketId}`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to book the ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-ticket-container">
      <h2 className="book-ticket-title">Book a Ticket</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(details).map((key) => (
          <div key={key}>
            <input
              type={key === "age" ? "number" : key === "email" ? "email" : "text"}
              name={key}
              value={details[key]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="book-ticket-input"
              required
            />
          </div>
        ))}

        <select
          name="gender"
          value={details.gender}
          onChange={handleChange}
          className="book-ticket-select"
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="text"
          value={trainId}
          readOnly
          className="book-ticket-input"
        />

        <input
          type="text"
          value={seat}
          readOnly
          className="book-ticket-input"
        />

        <button
          type="submit"
          disabled={loading}
          className="book-ticket-button"
        >
          {loading ? "Booking..." : "Book Ticket"}
        </button>
      </form>

      {message && (
        <p className={`book-ticket-message ${message.includes("success") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default BookTicket;
