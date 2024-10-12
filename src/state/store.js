import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import modeSlice from "@state/slices/mode";
import authSlice from "@state/slices/auth";
import distributorSlice from "@state/slices/distributor";
import reviewrSlice from "@state/slices/reviewer";
import activeLinkSlice from "@state/slices/active";
import productsSlice from "@state/slices/products";
import searchSlice from "@state/slices/search";
import cart from "@state/slices/cart";
import customerSlice from "@state/slices/customer";
import PageSlice from "@state/slices/page";
import deliverySlice from "@state/slices/delivery";
import albumSlice from "@state/slices/album";
import { productReview } from "./slices/reviews";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "mode"], // Changed 'whiteList' to 'whitelist'
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};
const rootReducer = combineReducers({
  mode: modeSlice,
  auth: authSlice,
  distributor: distributorSlice,
  reviewer: reviewrSlice,
  active: activeLinkSlice,
  products: productsSlice,
  search: searchSlice,
  customer: customerSlice,
  cart: persistReducer(cartPersistConfig, cart),
  PageSlice: PageSlice,
  delivery: deliverySlice,
  album: albumSlice,
  review: productReview,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          "persist/PERSIST",
        ],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
