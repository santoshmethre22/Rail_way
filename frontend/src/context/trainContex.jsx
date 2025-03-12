import { createContext, useContext, useState } from "react";
import axios from "axios";


const TrainContext=createContext();

export const TrainContextProvider=({children})=>{

    const [train,setTrains]=useState([]);

    const addTrain = async (Data) => {
        try {
            const token = localStorage.getItem("token");
    
            if (!token) {
                throw new Error("No authentication token found");
            }
    
            const response = await axios.post("/api/train/add-train", Data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            // Ensure response contains the added train data before updating state
            if (response.data) {
                setTrains((prev) => [...prev, response.data]);
            }
    
        } catch (error) {
            console.error("Error while adding the train:", error.response?.data?.message || error.message);
        }
    };
1    
    const fetchAllTrain=async()=>{
        try {
            const token = localStorage.getItem("token");

      if (!token) {
          throw new Error("No authentication token found");
      }


            const response=await axios.get("/api/train/get-all-trains",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setTrains(response.data);
         
        } catch (error) {
            console.error("Error while adding the train:", error.message);
        }

    }


    const searchTrain = async (source, destination) => {
        try {
          if (!source || !destination) {
            console.error("Source and destination are required");
            return { error: "Source and destination are required", trains: [] };
          }
      
          const response = await axios.get("/api/train/search-trains", 
            { params: { source, 
                destination } 
        });
          return { trains: response.data, error: null }; // Return trains in an object
      
        } catch (error) {
          console.error("Error searching for trains:", error.response?.data?.message || error.message);
          
          return {
            trains: [],
            error: error.response?.data?.message || "Something went wrong",
          };
        }
      };
      

      
    const updateTrain=async(id,updateTrainData
    )=>{
        try {
            const token = localStorage.getItem("token");

      if (!token) {
          throw new Error("No authentication token found");
      }


            const response =await axios.patch(`/api/train/update-train/${id}`,updateTrainData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                    
                }
            )
            setTrains((prev) =>
                prev.map((train) => (train._id === id ? response.data.train : train))
            );  

        } catch (error) {
            console.error("Error while adding the train:", error.message);
            
        }
    }

    const deleteTrain=async({id})=>{
        try {  
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response =await axios.delete(`/api/train//delete-train/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setTrains((prev)=>prev.filter((train)=>train._id!==id))
        } catch (error) {
            console.error("Error deleting the train:", error.message);
        }
    }


    const getTrainBooking = async ({ id }) => {
        try {
          const response = await axios.get(`/api/train/get-train-book/${id}`);
          return response.data; // Return the data directly
        } catch (error) {
          console.error("Error fetching train booking:", error.message);
          throw error; // Rethrow the error for handling in the calling function
        }
      };
    return (
        <TrainContext.Provider    
        value={{
            
            train,
            addTrain,
            fetchAllTrain,
            searchTrain,
            updateTrain,
            deleteTrain,
            getTrainBooking

        }}
        >
            {children}
        </TrainContext.Provider>
    )
}


export const TrainData=()=>useContext(TrainContext)