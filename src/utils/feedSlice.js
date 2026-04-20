import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState: [],
    reducers:{
       addUserFeed:(state,action)=>{
      return  action.payload
       }
    }
})

export default feedSlice.reducer;
export const {addUserFeed} = feedSlice.actions