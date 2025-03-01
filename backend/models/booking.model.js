import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    train: { type: mongoose.Schema.Types.ObjectId, ref: "Train", required: true },

    seats: { type: Number, required: true },

    totalFare: { type: Number, required: true },

    status: { type: String, enum: ["booked", "notbooked"], default: "notbooked" }, // Fixed typo
  },
  { timestamps: true }
);

// Static method to check if a seat is booked
BookingSchema.statics.isBooked = async function (trainId, seats) {
  const booking = await this.findOne({ train: trainId, seats });

  if (booking && booking.status === "booked") return true;
  return false;
};




export const Booking = mongoose.model("Booking", BookingSchema);
