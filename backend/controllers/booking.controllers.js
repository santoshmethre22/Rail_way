import { Booking } from "../models/booking.model.js";
import { Train } from "../models/train.model.js";

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
    const isBooked = await Booking.isSeatBooked(trainId, seat);
    if (isBooked) {
      return res.status(400).json({ message: "This seat is already booked" });
    }

    const totalFare = train.fare;

    // Create a new booking
    const booking = new Booking({
      user: userId,
      train: trainId,
      seats,
      totalFare,
      status: "booked",
    });

    await booking.save();
        // Update available seats
        train.availableSeats -= seats;
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

    // Find the booking based on user, train, and seat number
    const booking = await Booking.findOne({ user: userId, train: trainId, seat});

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Ensure the user is authorized to cancel this booking
    

    // Update seat availability in the train
    const train = await Train.findById(trainId);
    if (!train) return res.status(404).json({ message: "Train not found" });

    train.availableSeats += 1; // Increase available seats count
    await train.save();

    // Cancel the booking
    booking.status = "notbooked";
    
    await booking.save();

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {
  bookTrainTicket, 
  getUserBookings,
   cancelBooking
}


