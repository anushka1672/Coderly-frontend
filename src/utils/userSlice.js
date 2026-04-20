import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"feed",
    initialState: null,
    reducers:{
        addUser:(state,action)=>{
          return state = action.payload
        },
        RemoveUser:()=>{
          return null
        }
    }
})

export default userSlice.reducer;
export const {addUser,RemoveUser} = userSlice.actions