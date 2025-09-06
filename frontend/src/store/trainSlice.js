import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status: false,
    trainData:{},
    alltrainData:{},
}

const trainSlice=createSlice({

    name: "train",
    initialState,

    // todo to implement add train to existing train

     reducers: {
    addTrain:(state,action)=>{   
        const train=action.payload.train;
        state.alltrainData=[...state.alltrainData,...action.payload.train]

    },
    getAllTrain:(state,action)=>{

    },

    mytrain:(state,action)=>{
       state.trainData=action.payload.train;
    }

}
   
})

export const {mytrain,getAllTrain,addTrain}=trainSlice.actions;
export default trainSlice.reducer;