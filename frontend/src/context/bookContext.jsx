import React ,{createContext, useContext} from "react";
import axios from "axios"

const bookContext=createContext();


export  const BookingContextProvider=({children})=>{

    const bookTicket=async(trainId,seat)=>{

       try {

        const token =localStorage.getItem("token");

         const response =await axios.post(
 
             "/api/booking/book-ticket"
             ,
             {
                 trainId,
                 seat
 
             }
             ,{
 
                 headers:{
 
                     "Authorization":`Brearer ${token}`
 
                 }
 
 
             }
 
         )
 
       } catch (error) {
        
       }



    }

    const getUserBooking =()=>{




    }


    const cancelBooking =()=>{




    }

    return (


        <bookContext.Provider
        
        value={{

            
        }}
        
        >





        </bookContext.Provider>



    )



}


export const BookingData=()=>useContext(bookContext)

