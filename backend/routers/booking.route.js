import express, { Router } from "express"

import { protect } from "../middlewares/auth.middleware.js";


import {
  bookTrainTicket, 
  getUserBookings,
  cancelBooking
} from "../controllers/booking.controllers.js"

const BookingRouter = Router();

BookingRouter.post("/book-ticket", protect, bookTrainTicket);
BookingRouter.get("/get-user-bookings", protect, getUserBookings);
BookingRouter.delete("/cancelBooking/:userId/:trainId/:seat", protect, cancelBooking);


export  default BookingRouter;
