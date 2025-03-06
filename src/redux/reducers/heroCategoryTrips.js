import { createSlice } from "@reduxjs/toolkit";
import img1 from "/68.webp";
import img2 from "/86.jpeg";
import img3 from "/132.webp";
import res1 from "/res1.jpg";
import res2 from "/res2.jpg";
import res3 from "/res3.jpg";
import res4 from "/res4.jpg";
import cul1 from "/cul1.jpg";
import cul2 from "/cul2.jpg";
import cul3 from "/cul3.jpg";

const initialState = {
  allTrips: [
    {
      id: 1,
      imageUrl: img1,
      title: "Eiffel Tower Guided Tour",
      duration: "2 hours",
      rating: 4.8,
      reviewCount: 245,
      price: 45,
      currency: "€",
      category: "culture",
    },
    {
      id: 2,
      imageUrl: res4,
      title: "Colosseum Underground Experience",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
      category: "food",
    },
    {
      id: 3,
      imageUrl: res1,
      title: "Colosseum Underground Experience",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
      category: "food",
    },
    {
      id: 4,
      imageUrl: img2,
      title: "Colosseum Underground Experience",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
      category: "sport",
    },
    {
      id: 5,
      imageUrl: img2,
      title: "Colosseum Underground Experience",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
      category: "nature",
    },
    {
      id: 6,
      imageUrl: img2,
      title: "Colosseum Underground Experience",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
      category: "sport",
    },
    {
      id: 7,
      imageUrl: res2,
      title: "Colosseum Underground Experience",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
      category: "food",
    },
    {
      id: 8,
      imageUrl: res3,
      title: "Colosseum Underground Experience",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
      category: "food",
    },

    {
      id: 9,
      imageUrl: cul1,
      title: "Colosseum Underground Experience",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
      category: "culture",
    },
    {
      id: 10,
      imageUrl: cul2,
      title: "Colosseum Underground Experience",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
      category: "culture",
    },
    {
      id: 12,
      imageUrl: cul3,
      title: "Colosseum Underground Experience",
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 178,
      price: 65,
      currency: "€",
      category: "culture",
    },
  ],
  filteredTrips: [],
};

const categoryTripsSlice = createSlice({
  name: "categoryTrips",
  initialState,
  reducers: {
    getTripsBasedCategory: (state, action) => {
      state.filteredTrips = state.allTrips.filter(
        (trip) =>
          trip.category.toLowerCase() == action.payload.category.toLowerCase()
      );
      return state;
    },
  },
});
export const { getTripsBasedCategory } = categoryTripsSlice.actions;
export default categoryTripsSlice.reducer;
