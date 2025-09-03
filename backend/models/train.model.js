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
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    availableSeats: {
      type: Number,
      default: 100,
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
        date: { type: Date, required: true }, // date + time in one field
      },
    ],
  },
  { timestamps: true }
);

export const Train = mongoose.model("Train", TrainSchema);



// const train = await Train.findOne();

// const departureTime = train.departureDate.toLocaleTimeString("en-IN", {
//   hour: "2-digit",
//   minute: "2-digit"
// });

// const arrivalTime = train.arrivalDate.toLocaleTimeString("en-IN", {
//   hour: "2-digit",
//   minute: "2-digit"
// });

// console.log("Departure:", departureTime); // "04:00 PM"
// console.log("Arrival:", arrivalTime);     // "08:00 AM"
