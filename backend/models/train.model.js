
import mongoose from "mongoose"
const TrainSchema = new mongoose.Schema(
  {
    trainNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    fare: { type: Number, required: true },

    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }] 
  },
  { timestamps: true }
);


export const Train =mongoose.model("Train", TrainSchema);
