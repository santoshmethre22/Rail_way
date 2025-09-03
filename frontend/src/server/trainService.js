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
    arrivalTime,
    departureTime,
    duration,
    stations,
  }) {
    try {
      const { data } = await this.api.post("/api/train/add-train", {
        name,
        number,
        source,
        destination,
         departureDate,
        arrivalDate,
        arrivalTime,
        departureTime,
        duration,
        stations,
      });

      return data;
    } catch (error) {
     
      throw new Error(
        error.response?.data?.message || "Failed to add train"
      );
    }
  }


  
}


const trainService=new TrainService();
export default trainService;
