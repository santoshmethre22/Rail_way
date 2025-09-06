import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import trainSlice from "./trainSlice.js";
import bookSlice from "./bookingSlice.js"
const store =configureStore({
    reducer:{
        auth:authSlice,
        train:trainSlice,
        book:bookSlice
    }   
})

export default store;