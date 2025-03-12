import express, { Router } from "express"

import { protect } from "../middlewares/auth.middleware.js";


import {
  bookTrainTicket, 
  getUserBookings,
  cancelBooking,
  BookingOftrain
} from "../controllers/booking.controllers.js"

const BookingRouter = Router();

BookingRouter.post("/book-ticket/:trainId/:seat", protect, bookTrainTicket);
BookingRouter.get("/get-user-bookings", protect, getUserBookings);
BookingRouter.delete("/cancelBooking/:userId/:trainId/:seat", protect, cancelBooking);
BookingRouter.get("all-booking-of-train/:id",protect,BookingOftrain);


export  default BookingRouter;
