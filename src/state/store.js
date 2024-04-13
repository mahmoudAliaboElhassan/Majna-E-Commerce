import { configureStore, combineReducers } from "@reduxjs/toolkit";

import modeSlice from "@state/slices/mode";
import authSlice from "@state/slices/auth";
import distributorSlice from "@state/slices/distributor";
import reviewrSlice from "@state/slices/reviewer";

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
