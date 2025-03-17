import React, { useState } from "react";
import { Booking } from "../../../context/bookContext.jsx";
import "./BookTicket.css";
import { useParams } from "react-router-dom";

function BookTicket() {
  const { trainId, seat } = useParams();
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
    setDetails((prev) => ({
      ...prev,
      [name]: name === "age" || name === "phone" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await bookTicket(trainId, seat, details);
      setMessage(`Ticket booked successfully: ${result?.booking?._id}`);
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
              type={
                key === "age"
                  ? "number"
                  : key === "email"
                  ? "email"
                  : "text"
              }
              name={key}
              value={details[key] || ""} // ✅ Fallback for controlled input
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="book-ticket-input"
              required
            />
          </div>
        ))}

        {/* Gender Select */}
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

        {/* Train ID */}
        <input
          type="text"
          value={trainId}
          readOnly
          className="book-ticket-input"
        />

        {/* Seat Number */}
        <input
          type="text"
          value={seat}
          readOnly
          className="book-ticket-input"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="book-ticket-button"
        >
          {loading ? "Booking..." : "Book Ticket"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`book-ticket-message ${
            message.includes("success") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default BookTicket;
