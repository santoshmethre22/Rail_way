import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookings: []
}
// "booking": {
//         "name": "santosh",
//         "age": 21,
//         "phone": 910804175,
//         "email": "santosh123@gmail.com",
//         "gender": "male",
//         "user": "68b7dcd498ef47b0ef494a13",
//         "train": "68b80ffef29047e0d8785381",
//         "seats": 85,
//         "totalFare": 1000,
//         "status": "confirm",
//         "_id": "68bbb55381bab19f9c394ebc",
//         "createdAt": "2025-09-06T04:15:15.325Z",
//         "updatedAt": "2025-09-06T04:15:15.325Z",
//         "__v": 0
//     }

const bookingSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        bookTicket: (state, action) => {
            state.bookings.push(action.payload.booking);
        },

        cancelTicket: (state, action) => {
            state.bookings = state.bookings.filter(
                (b) => b._id !== action.payload.bookingId
            );
        },

        editBookingDetail: (state, action) => {
            const index = state.bookings.findIndex(
                (b) => b._id === action.payload.bookingId
            );
            if (index !== -1) {
                state.bookings[index] = {
                    ...state.bookings[index],
                    ...action.payload.updatedData,
                };
            }
        },
    },
});

export const { bookTicket, cancelTicket, editBookingDetail } =
    bookingSlice.actions;
export default bookingSlice.reducer;