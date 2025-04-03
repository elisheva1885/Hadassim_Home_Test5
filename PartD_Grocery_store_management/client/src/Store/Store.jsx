import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./Slices/productsSlice";
import supplierDetailsSlice from "./Slices/supplierDetailsSlice";

const store = configureStore({
    reducer: {
      products: productsSlice, 
      supplierDetails: supplierDetailsSlice
    },
  });
  
  export default store;
