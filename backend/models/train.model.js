import mongoose from "mongoose";

const TrainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrival: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    availableSeats: {
      type: Number,
      default:100
    },
  
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    stations: [
      {
        name: { type: String, required: true, trim: true },
        date: { type: Date, required: true },
        time: { type: String, required: true }, // stored as string like "14:30"
      },
    ],
  },
  { timestamps: true }
);

export const Train = mongoose.model("Train", TrainSchema);
