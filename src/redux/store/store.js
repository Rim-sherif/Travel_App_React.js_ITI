import { configureStore } from "@reduxjs/toolkit";
import categoryTripsSlice from "../reducers/heroCategoryTrips";

export const store = configureStore({
    reducer:{
        categoryTrips: categoryTripsSlice
    }
})