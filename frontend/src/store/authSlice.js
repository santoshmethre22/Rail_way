import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.user;
        },
        logout: (state) => {
            state.status = false;
            state.userData = "";
        },
        editProfile: (state, action) => {
            if (state.userData) {
                state.userData = { ...state.userData, ...action.payload.userData };
            }
        },
        editPic: (state, action) => {
            if (state.userData) {
                state.userData.profileImage = action.payload.profileImage;
            }
        },

        updateProfile: (state, action) => {

            state.userData ={ ...state.userData,...action.payload.user}

        }


    }
})


export const { login, logout, editProfile, editPic ,updateProfile} = authSlice.actions;

export default authSlice.reducer;