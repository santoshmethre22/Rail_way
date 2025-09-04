import express from "express";

import { 
    addTrain, 
    getAllTrains, 
    searchTrains,
    updateTrain,
    deleteTrain,
    getAllbookings,
    getTrainBooking,
    
} from "../controllers/train.controllers.js";

import { protect } from "../middlewares/auth.middleware.js";
import adminAuth from "../middlewares/admin.middleware.js";

const trainRouter = express.Router();


trainRouter.post("/add-train", protect, addTrain); 

trainRouter.get("/get-all-trains", getAllTrains); 
trainRouter.post("/search-train", searchTrains); 
trainRouter.patch("/update-train/:id", protect,updateTrain); 
trainRouter.delete("/delete-train/:id", protect, adminAuth, deleteTrain);
trainRouter.get("/get-all-bookings", protect, adminAuth, getAllbookings);
trainRouter.get("/get-train-booking/:id", getTrainBooking);



// --- this router must be in admin section ---
export { trainRouter };
