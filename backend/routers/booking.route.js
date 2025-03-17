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

BookingRouter.delete("/cancelBooking/:userId/:trainId/:seat", protect, cancelBooking);
BookingRouter.get("all-booking-of-train/:id",protect,BookingOftrain);
BookingRouter.get('/get-user-history/:id',protect,BookingHistory);


export  default BookingRouter;
