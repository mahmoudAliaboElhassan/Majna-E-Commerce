import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import modeSlice from "@state/slices/mode";
import authSlice from "@state/slices/auth";
import distributorSlice from "@state/slices/distributor";
import reviewrSlice from "@state/slices/reviewer";
import cart from "@state/slices/cart";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // Change 'whiteList' to 'whitelist'
};
const cartPersistConfig = {
  key: 'cart',
 storage,
  whitelist:['items']
}
const rootReducer = combineReducers({
  mode: modeSlice,
  auth: authSlice,
  distributor: distributorSlice,
  reviewer: reviewrSlice,
  cart: persistReducer(cartPersistConfig,cart) ,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);
export { store, persistor };
