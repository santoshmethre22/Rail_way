
import { Train } from "../models/train.model.js";
import { Booking } from "../models/booking.model.js";


const addTrain = async (req, res) => {
  try {
    const { 
       name,
        number,
        source,
        destination,
         departureDate,
    arrivalDate,
        duration,
        stations,
    } = req.body;

    
    const existingTrain = await Train.findOne({
      $or: [{ number }, { name }]
    });

    if (existingTrain) {
      return res.status(400).json({ message: "Train already exists" });
    }


    const train = new Train({
       name,
        number,
        source,
        destination,
         departureDate,
    arrivalDate,

        duration,
        stations,
    });

    await train.save();

    res.status(201).json({ message: "Train added successfully", train });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllTrains = async (req, res) => {
  try {
   const trains = await Train.find().select("-bookings -__v -createdAt -updatedAt");
    if(!trains) {
      return res.status(502).json({
        message:" no train available "
      })
    }
    return res.status(202).json({
      message:"data fetched successfully",
      trains
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const searchTrains = async (req, res) => {
  try {
    const {
      source,
      destination,
       name,
       number,
     departureDate,
      type
    } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Please provide search type" });
    }
    if (!departureDate) {
      return res.status(400).json({ message: "Travel date is required" });
    }
    let train = [];
    if (type === "source") {
      if (!source || !destination) {
        return res.status(400).json({ message: "Source and destination required" });
      }

      train = await Train.find({
        source: { $regex: new RegExp(source, "i") },
        destination: { $regex: new RegExp(destination, "i") },
        departureDate: departureDate
      });
    } 

    else if (type === "trainNumber") {
      if (!number) return res.status(400).json({ message: "Train number required" });
      train = await Train.find({
        number,
        departureDate
      });
    } 
    else if (type === "trainName") {
      if (!name) return res.status(400).json({ message: "Train name required" });
      train = await Train.find({
        name: { $regex: new RegExp(name, "i") },
        departureDate
      });
    } 
    else {
      return res.status(400).json({ message: "Invalid search type" });
    }

    if (!train || train.length === 0) {
      return res.status(404).json({ message: "No trains available for the given input" });
    }

    return res.status(200).json({
      message: "Trains found the ",
      train
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
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
// this method is not required
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
    const { id } = req.params; 
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
