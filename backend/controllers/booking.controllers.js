import { Booking } from "../models/booking.model.js";
import { Train } from "../models/train.model.js";
import mongoose from "mongoose";

const bookTrainTicket = async (req, res) => {
  try {
    const {trainId, seat} = req.params;   
    const {name,age,phone,email,gender}=req.body;  
    const userId = req.user.id;
    if (!userId || !trainId || !seat ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const train = await Train.findById(trainId);
    if (!train) return res.status(404).json({ message: "Train not found" });
    const isBooked = await Booking.isBooked(trainId, seat);
    if (isBooked) {
      return res.status(400).json({ message: "This seat is already booked" });
    }

    const totalFare = 1000;
    const booking = new Booking({
      name,
      age,
      phone,
      email,
      gender,
      user: userId,
      train: trainId,
      seats:seat,
      totalFare,
      status: "confirm",
    });
    await booking.save();
        train.availableSeats --;
        await train.save();    
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// dont implement this functionality
const BookingOftrain = async (req, res) => {
  try {
    const bookings = await Booking.find({ train: req.params.id }).populate("user");

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this train" });
    }

    console.log(bookings);

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;
    const { reason } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Please login" });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancel";
    booking.reason = reason;
    // todo remove this line
    
    booking.gender="Male";
    const trainId = booking.train;
    const train = await Train.findById(trainId);

    if (train) {
      train.availableSeats++;
      await train.save();
    }

    await booking.save();

    res.json({ message: "Booking cancelled successfully", ans: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};



const BookingHistory = async (req, res) => {
  try {

    const userId=req.user.id;
    if(!userId){
      return res.status(400).json({
          message:"please login "
      })
    }
     const userBooking = await Booking.find({ user: userId })
  .populate({
    path: "train",
    select: "-bookings -stations -__v -createdAt -updatedAt"
  })
  .select("-__v -createdAt -updatedAt"); 

      return res.status(200).json({
        message:"the data fetched successfull",
        bookings:userBooking
      });
  } catch (error) {
      console.error("Error fetching booking history:", error);
      return res.status(500).json({ message: "Internal server error." });
  }
};
    
export {
  bookTrainTicket, 
   cancelBooking,
   BookingOftrain,
   BookingHistory
}


