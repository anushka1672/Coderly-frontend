import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState: [],
    reducers:{
       addUserFeed:(state,action)=>{
      return  action.payload
       },
       removeUserFeed:(state,action)=>{
        return state.filter((el)=>el._id !== action.payload)
       }
    }
})

export default feedSlice.reducer;
export const {addUserFeed,removeUserFeed} = feedSlice.actions