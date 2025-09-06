import axios from "axios";

class BookingService{

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

    async bookTikcet({trainId,seat}){
       try {
         const res=await this.api.post(`api/bookings/book-ticket/${trainId}/${seat}`,{
         },{ 
 
         })
 
         return res.data.book;
       } catch (error) {
        
       }

    }
    async cancelBooking(){

    }

    async editBooking(){

    }
    
}

const bookingService= new BookingService();

export default bookingService;