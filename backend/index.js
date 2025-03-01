import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js";


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});


/////////////////////////////////////////////////////

//--------------------------------------------------------------

// const authRoutes = require("./routes/authRoutes");

// app.use("/api/auth", authRoutes);


// const trainRoutes = require("./routes/trainRoutes");

// app.use("/api/trains", trainRoutes);


// const bookingRoutes = require("./routes/bookingRoutes");

// app.use("/api/bookings", bookingRoutes);


import UserRouter from "./routers/user.route.js";
import  {trainRouter} from "./routers/train.route.js";
import BookingRouter from "./routers/booking.route.js"

app.use("/api/user",UserRouter);
app.use("/api/train",trainRouter);

app.use("/api/bookings/",BookingRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
