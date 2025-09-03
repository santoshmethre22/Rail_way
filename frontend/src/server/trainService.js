import axios from "axios";

class TrainService {
  api;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5000",
    });

    const token = localStorage.getItem("token");
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

 async addTrain({
      name,
      number,
      source,
      destination,
      departureDate,
      arrivalDate,
      duration,
      stations,
}) {
  try {
    const response = await this.api.post("/api/train/add-train", {
      name,
      number,
      source,
      destination,
      departureDate,
      arrivalDate,
      duration,
      stations,
    });

    console.log(" the message ", response.data.message);
    console.log(" the train", response.data.train);

    // return train object
    return response.data.train;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add train");
  }
}


  async getAllTrain(){
    try {
        const res=this.api.get("/api/train/get-all-trains");
        console.log("the res ",res)
    } catch (error) {
        throw new Error(error.res?.data?.message || "Failed to add train");
    }

  }

  async searchTrain({
      source,
      destination,
      name,
      number,
      departureDate  ,
      selectType: type
  }){
    try {
    const res=await this.api.get("/api/tain/search-train",{
      source,
      destination,
      name,
      number,
      departureDate,
      type
    })


    //if()
  
    return res.data.trains;
      
    } catch (error) {
      
    }

  }

  

  
}


const trainService=new TrainService();
export default trainService;
