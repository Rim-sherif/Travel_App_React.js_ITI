import { configureStore } from "@reduxjs/toolkit";
import categoryTripsSlice from "../reducers/heroCategoryTrips";
import tokenSlice from "../reducers/tokenSlice";

export const store = configureStore({
    reducer:{
        categoryTrips: categoryTripsSlice,
        token: tokenSlice
    }
})