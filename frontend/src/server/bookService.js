import axios from "axios";

class BookingService {
  api;
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5000",
    });


    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async bookTicket({
    trainId,
    seat,
    name,
    age,
    phone,
    email,
    gender,
    className,
  }) {
    try {
      const res = await this.api.post(
        `/api/bookings/book-ticket/${trainId}/${seat}`,
        {
          name,
          age,
          phone,
          email,
          gender,
          className,
        }
      );
      return res.data.booking;
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      throw error;
    }
  }

  async cancelBooking({bookingId,reason}) {
    try {
    const res=await this.api.patch(`/api/bookings/cancel-booking/${bookingId}`,{
      reason
    });
    return res.data.ans;
      
    } catch (error) {

       console.error("Booking failed:", error.response?.data || error.message);
      throw error;

      
    }
   

  }

  async editBooking() {

  }

  async userBooking(){
    try {
      
          const res=await this.api.get(`/api/bookings/get-user-history`);
          return res.data.bookings

    } catch (error) {
      
    }
    

  }

}

const bookingService = new BookingService();

export default bookingService;