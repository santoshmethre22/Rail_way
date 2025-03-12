import express from "express";

import { 
    addTrain, 
    getAllTrains, 
    searchTrains,
    updateTrain,
    deleteTrain,
    getAllbookings,
    getTrainBooking
} from "../controllers/train.controllers.js";

import { protect } from "../middlewares/auth.middleware.js";
import adminAuth from "../middlewares/admin.middleware.js";

const trainRouter = express.Router();

// ✅ No need for `/api/train/` prefix inside this file. This should be set in the main server file.
trainRouter.post("/add-train", protect, addTrain); // this functionlity doesnt work here 
// the error is coming so chech once -------------------- Only Admins can add trains
trainRouter.get("/get-all-trains", getAllTrains); // Get all trains
trainRouter.get("/search-trains", searchTrains); // Search trains by source & destination
trainRouter.patch("/update-train/:id", protect,updateTrain); // ✅ Fixed typo from "trian"
trainRouter.delete("/delete-train/:id", protect, adminAuth, deleteTrain);
trainRouter.get("/get-all-bookings", protect, adminAuth, getAllbookings);

trainRouter.get("get-train-booking",getTrainBooking);


// --- this router must be in admin section ---
export { trainRouter };
