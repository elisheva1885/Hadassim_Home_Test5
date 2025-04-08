
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import productsSlice from "./Slices/productsSlice";
import tokenSlice from "./Slices/tokenSlice";
import storeProductsSlice from "./Slices/storeProductsSlice";

const rootReducer = combineReducers({
  products: productsSlice,
  token: tokenSlice,
  storeProducts : storeProductsSlice
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token", "products", "storeProducts"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;