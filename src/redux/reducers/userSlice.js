import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000/api/v1";

export const getUserDataThunk = createAsyncThunk("userData/getUserDataThunk" , async(token , thunkApi) =>{
    try{
        if(token){
            const {data}  = await axios.get(`${baseUrl}/profile/data` , {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });  
            return data;
        }
    }
    catch(error){
        const {rejectWithValue} = thunkApi;
        return rejectWithValue(error.message);
    }
})

const userSlice = createSlice({
    name: "userData",
    initialState: {},
    extraReducers: (builder)=>{
        builder.addCase(getUserDataThunk.pending , (state , action)=>{
            console.log("pending");
        }).addCase(getUserDataThunk.fulfilled , (state , action)=>{
            console.log("fulfilled");
            return action.payload;
        }).addCase(getUserDataThunk.rejected , (state , action)=>{
            console.log("Rejected");
        })
    }
})

export default userSlice.reducer;