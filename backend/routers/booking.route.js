const express = require("express");
const { bookTicket, getUserBookings, cancelBooking } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

import {
    bookTrainTicket, 
  getUserBookings,
   cancelBooking
} from "../controllers/booking.controllers.js"


router.post("/book-ticket", protect, bookTrainTicket);
router.get("/get-user-bookings", protect, getUserBookings);
router.delete("/cancelBooking", protect, cancelBooking);


export  default router;
