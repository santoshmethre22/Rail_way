import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bookingService from "../../server/bookService";

function CancelPage() {
    const location =useLocation();
    const { bookingId }= location.state;
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const navigate = useNavigate();

  const reasons = [
    "Change of travel plans",
    "Booked wrong train",
    "Found cheaper option",
    "Medical emergency",
    "Other",
  ];

  const handleCancel = async () => {
    try {
      const finalReason = reason === "Other" ? otherReason : reason;

      if (!finalReason.trim()) {
        alert("Please select or enter a reason before cancelling.");
        return;
      }

      await bookingService.cancelBooking({ reason: finalReason, bookingId });

      alert("Your booking has been cancelled successfully.");
      navigate("/"); 
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Cancel Ticket
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Please select a reason for cancellation:
        </p>

        <div className="space-y-3">
          {reasons.map((r, idx) => (
            <label
              key={idx}
              className="flex items-center gap-2 p-2 rounded-lg border cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="reason"
                value={r}
                checked={reason === r}
                onChange={(e) => setReason(e.target.value)}
              />
              <span className="text-gray-700">{r}</span>
            </label>
          ))}

          {reason === "Other" && (
            <textarea
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Please specify your reason"
              rows="3"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
            />
          )}
        </div>

        <button
          onClick={handleCancel}
          className="w-full mt-6 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Confirm Cancellation
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default CancelPage;
