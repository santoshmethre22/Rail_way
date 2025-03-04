import axios from "axios";
import {createContext, useContext, useState} from "react";

const userContext=createContext();


export const UserContextProvider = ({ children }) => {
    const [user,setUser]=useState([]);
    const [isAuth,setIsAuth]=useState(false);



async function loginUser(email, password, navigate) {

    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });

      
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
     
      navigate("/");
     
    } catch (error) {
  
   
        setIsAuth(false);
        console.log(error);
        alert(error.response?.data?.message || "Login failed"); 
      
      
     
    }
  }




  async function registerUser(name, email, password, navigate) {

    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

     // localStorage.setItem("activationToken", data.activationToken);
    navigate("/login");
      //navigate("/verify");
    } catch (error) {
     // setBtnLoading(false);
     // toast.error(error.response.data.message);
     console.log(error);
    }
  }


//   async function verifyOtp(otp, navigate) {
//     setBtnLoading(true);
//     const activationToken = localStorage.getItem("activationToken");
//     try {
//       const { data } = await axios.post(`${server}/api/user/verify`, {
//         otp,
//         activationToken,
//       });

//       toast.success(data.message);
//       navigate("/login");
//       localStorage.clear();
//       setBtnLoading(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setBtnLoading(false);
//     }
//   }


//   async function fetchUser() {
//     try {
//       const { data } = await axios.get(`${server}/api/user/me`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });

//       setIsAuth(true);
//       setUser(data.user);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }




  return (

    <userContext.Provider

        value={{
            user,
            setUser,
            setIsAuth,
            isAuth,
            loginUser,
            registerUser,


        }}  


    >

        {children}

    </userContext.Provider>
  )


}


export const userData =()=>useContext(userContext);