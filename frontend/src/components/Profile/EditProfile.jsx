import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../index.js";
import { Button } from "../index.js";
import authService from "../../server/auth";
import {updateProfile as update} from "../../store/authSlice.js"
import { useLocation } from "react-router-dom";


function EditProfile() {

  const {state}=useLocation();
  const data=state.user;
 
  const [user, setUser] = useState({});
  const { status } = useSelector((store) => store.auth);
  const dispatch=useDispatch();
  useEffect(() => {
    if (data) {
      setUser({ ...data });
    }
  }, [data]);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit =async(e)=>{
    try {

        e.prevenDefault();
      const res=  await authService.updateProfile(user);
        
   //   console.log(res);

      if(res.data.user){
        dispatch(update({user}))
      }
      else {
        res.data.message;
      }
        
    } catch (error) {
        throw error;
    }
  }

  if (!status) {
    return <div className="text-center text-xl font-semibold mt-10">Please login</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Edit Profile</h2>

        <form className="space-y-5">
          <Input
            label="Name"
            name="name"
            placeholder="Enter name"
            value={user.name || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <Input
            label="Phone Number"
            name="phone"
            placeholder="Enter Phone Number"
            value={user.phone || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
         

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
