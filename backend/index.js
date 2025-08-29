import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json()); // Body parser

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Import routes
import UserRouter from "./routers/user.route.js";
import { trainRouter } from "./routers/train.route.js";
import BookingRouter from "./routers/booking.route.js";
import UploadRouter from "./routers/upload.router.js";

// Use routes
app.use("/api/user", UserRouter);
app.use("/api/train", trainRouter);
app.use("/api/bookings", BookingRouter);
app.use("/api/uploads", UploadRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));