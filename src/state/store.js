import { configureStore, combineReducers } from "@reduxjs/toolkit";

import modeSlice from "./slices/mode";
import authSlice from "./slices/auth";
import distributorSlice from "./slices/distributor";
import reviewrSlice from "./slices/reviewer";

const rootReducer = combineReducers({
  mode: modeSlice,
  auth: authSlice,
  distributor: distributorSlice,
  reviewer: reviewrSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
