import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./Slices/productsSlice";
import supplierDetailsSlice from "./Slices/supplierDetailsSlice";
import tokenSlice from "./Slices/tokenSlice";
import companiesSlice from "./Slices/companiesSlice";

const store = configureStore({
    reducer: {
      products: productsSlice, 
      supplierDetails: supplierDetailsSlice,
      token: tokenSlice,
      companies : companiesSlice
    },
  });
  
  export default store;
