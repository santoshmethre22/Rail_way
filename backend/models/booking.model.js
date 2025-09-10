import mongoose from "mongoose";


const BookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    }, 
    gender: {
      type: String,
      enum: ["Male", "Female","Other"]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", required: true
    },
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train", required: true
    },
    seats:
    {
      type: Number,
      required: true
    },
    totalFare: {
      type: Number,
      required: true


    },
    status: {
      type: String,
      enum: ["confirm", "book","cancel"],
      default: "book"

    },

    reason:{
      type:String,
    }

  },
  { timestamps: true }
);


BookingSchema.statics.isBooked = async function ({trainId,seat}) {
  const booking = await this.findOne({
    train: trainId,
    seats: seat,
    status: "confirm",
  });

  return !!booking;
};

export const Booking = mongoose.model("Booking", BookingSchema);
