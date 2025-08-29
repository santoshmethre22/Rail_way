import axios from "axios";

class AuthService {
  api;
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5000",
    });
  }

  async signup({ name, email, password }) {
    try {
      const { data } = await this.api.post("/api/user/register", {
        name,
        email,
        password,
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
      const { data } = await this.api.post("/api/user/login", {
        email,
        password,
      });
      
      // Store token if received
      // if (data.token) {
      //   localStorage.setItem("token", data.token);
      //   this.api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      // }
      
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Initialize authentication token if exists
  // initializeAuth() {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   }
  // }

  // Future methods
  // async getCurrentUser() {}
  // async logout() {}
  // async editProfile() {}
  // async uploadPhoto() {}
}

const authService = new AuthService();
// authService.initializeAuth(); // Initialize auth token on app start
export default authService;