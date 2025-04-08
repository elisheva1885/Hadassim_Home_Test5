import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./Slices/productsSlice";
import tokenSlice from "./Slices/tokenSlice";
import companiesSlice from "./Slices/companiesSlice";

const store = configureStore({
    reducer: {
      products: productsSlice, 
      token: tokenSlice,
      companies : companiesSlice
    },
  });
  
  export default store;
