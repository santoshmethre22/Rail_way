import { Booking } from "../models/booking.model.js";
import { Train } from "../models/train.model.js";
import mongoose from "mongoose";
// @desc    Book a ticket
// @route   POST /api/bookings


const bookTrainTicket = async (req, res) => {
  try {
    const {trainId, seat} = req.body;
    const userId = req.user.id;
    if (!userId || !trainId || !seat ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const train = await Train.findById(trainId);
    if (!train) return res.status(404).json({ message: "Train not found" });
    // Validate request
    // Check if the seat is already booked
    const isBooked = await Booking.isBooked(trainId, seat);
    if (isBooked) {
      return res.status(400).json({ message: "This seat is already booked" });
    }

    const totalFare = train.fare;

    // Create a new booking
    const booking = new Booking({
      user: userId,
      train: trainId,
      seats:seat,
      totalFare,
      status: "booked",
    });

    await booking.save();
        // Update available seats
        train.availableSeats --;
        await train.save();    

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- i have todo in the above to book it correctly -------------->


// @desc    Get user's bookings
// @route   GET /api/bookings

//
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("train");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id

//------------------------------------->

const cancelBooking = async (req, res) => {
  try {
    const { userId, trainId, seat } = req.params;

    // Convert trainId and userId to ObjectId if necessary
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(trainId)) {
      return res.status(400).json({ message: "Invalid userId or trainId" });
    }

    const seatNumber = Number(seat); // Convert seat to number if needed

    // Find the booking based on user, train, and seat number
    const booking = await Booking.findOne({ 
      user: new mongoose.Types.ObjectId(userId), 
      train: new mongoose.Types.ObjectId(trainId), 
      seats: Number(seat) 
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Authorization Check (Ensure the user is canceling their own booking)
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized: You can only cancel your own booking" });
    }

    // Find the train
    const train = await Train.findById(trainId);
    if (!train) return res.status(404).json({ message: "Train not found" });

    // Update seat availability only if it doesn't exceed total seats
    if (train.availableSeats < train.totalSeats) {
      train.availableSeats += 1;
      await train.save();
    }

    // Cancel the booking
    booking.status = "notbooked";
    await booking.save();

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export {
  bookTrainTicket, 
  getUserBookings,
   cancelBooking
}


