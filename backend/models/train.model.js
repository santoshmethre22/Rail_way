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
    departure: {
      type: Date,
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
      required: true,
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
