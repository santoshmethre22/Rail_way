import express, { Router } from "express"

import { protect } from "../middlewares/auth.middleware.js";


import {
  bookTrainTicket, 

  cancelBooking,
  BookingOftrain,
  BookingHistory

} from "../controllers/booking.controllers.js"

const BookingRouter = Router();
BookingRouter.post("/book-ticket/:trainId/:seat", protect, bookTrainTicket);

BookingRouter.patch("/cancel-booking/:bookingId", protect, cancelBooking);
BookingRouter.get("all-booking-of-train/:id",protect,BookingOftrain);

// this for the user 
BookingRouter.get('/get-user-history',protect,BookingHistory);


export  default BookingRouter;
