import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import trainSlice from "./trainSlice.js";
const store =configureStore({
    reducer:{
        auth:authSlice,
        train:trainSlice

    }   
})

export default store;