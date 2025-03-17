
import { Train } from "../models/train.model.js";

import { User } from "../models/user.model.js";

import { Booking } from "../models/booking.model.js";


// @desc    Add a new train (Admin Only)
// @route   POST /api/trains
const addTrain = async (req, res) => {
  try {
    const { trainNumber, name, source, destination, departureTime, arrivalTime, totalSeats, fare } = req.body;

    // Check if train already exists
  
    if (await Train.findOne({ trainNumber })) return res.status(400).json({ message: "Train already exists" });

   const  train = new Train({ trainNumber, name, source, destination, departureTime, arrivalTime, totalSeats, availableSeats: totalSeats, fare });

    await train.save();

    res.status(201).json({ message: "Train added successfully", train });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all trains
// @route   GET /api/trains
const getAllTrains = async (req, res) => {
  try {

    // find method ---mongoose---
    const trains = await Train.find();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search for trains
// @route   GET /api/trains/search
const searchTrains = async (req, res) => {
  try {
    const { source, destination } = req.query;

    if (!source || !destination) {
      return res.status(400).json({ message: "Source and destination are required" });
    }

    const trains = await Train.find({
      source: { $regex: new RegExp(source, "i") }, // Allows partial matches (case-insensitive)
      destination: { $regex: new RegExp(destination, "i") }
    });

    if (trains.length === 0) {
      return res.status(404).json({ message: "No trains available for the given route" });
    }

    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};



const updateTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!train) {
      return res.status(404).json({ message: "The train with that ID is not found" });
    }

    res.json({ message: "Train updated successfully", train });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const deleteTrain=async (req,res)=>{
  try {
    
    const train =await Train.findById(req.param.id);

    if(!train) {

      res.status(404).json({
        message:" the train is not found ---!"
      })

      await train.deleteOne();

      res.json({
        message:"Train is deleted successfully ......!"
      })

    }


  } catch (error) {

    res.status(500).json({ message: error.message });
    
  }
};


const getAllbookings =async(req,res)=>{

  try {


    const booking =await Booking.find().populate("user train");

    if (!booking ){

      res.status(404).json({message:"the booking is not found "})
    }

    res.status(500).json(booking);   

  } catch (error) {
    
  }

}


const getTrainBooking = async (req, res) => {
  try {
    const { id } = req.params; // Destructure the ID

    if (!id) {
      return res.status(400).json({ message: "Train ID is required" });
    }

    const train = await Train.findById(id).populate("bookings");

    if (!train) {
      return res.status(404).json({ message: "The train is not found" });
    }

    return res.status(200).json(train);
  } catch (error) {
    console.error("Error fetching train booking:", error.message);
    return res.status(500).json({ message: error.message });
  }
};





export { 
  addTrain,
   getAllTrains, 
   searchTrains,
   updateTrain,
   deleteTrain,
  getAllbookings,
  getTrainBooking
   
   };
