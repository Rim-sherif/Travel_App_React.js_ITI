import { configureStore } from "@reduxjs/toolkit";
import categoryTripsSlice from "../reducers/heroCategoryTrips";
import tokenSlice from "../reducers/tokenSlice";
import userSlice from "../reducers/userSlice";

export const store = configureStore({
    reducer:{
        categoryTrips: categoryTripsSlice,
        token: tokenSlice,
        user: userSlice
    }
})