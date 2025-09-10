import axios from "axios";

class AuthService {
  api;
  constructor() {
    this.api = axios.create({
      baseURL: "https://rail-way.onrender.com",
    });
  }

  async signup({ name, email, password,role }) {
    try {
      const { data } = await this.api.post("/api/user/register", {
        name,
        email,
        password,
        role
      });
      
      // Store token if received
      if (data.token) {
        localStorage.setItem("token", data.token);
        this.api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      }
      
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

async login({ email, password }) {
  try {
    const { data } = await this.api.post("/api/user/login", { email, password });

    if (data.token) {
      localStorage.setItem("token", data.token);
      this.api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }

    return data;
  } catch (error) {
    // Re-throw the original Axios error so it has response, status, etc.
    throw error;
  }
}



  // Initialize authentication token if exists
   initializeAuth() {
 const token = localStorage.getItem("token");
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  // Future methods
   async getCurrentUser() {
     
    const data =await this.api("/api/user/get-user")
    if(data) {
      console.log(data)

    }
    else{
      console.log("no data from the backend");
    }
    // radha radha

    return data;
   }
  async logout() {
    localStorage.removeItem("token");
    delete this.api.defaults.headers.common["Authorization"];
  }

  //TODO : to implement this method next 
   async updateProfile(data) {
  
    try {
        const res=await this.api.patch("/api/user/update-user",{data});
        const {message,user}=res?.data;
        
    } catch (error) {
        throw error;
    }

   }
   async uploadPhoto() {}
}

const authService = new AuthService();
// authService.initializeAuth(); // Initialize auth token on app start
export default authService;