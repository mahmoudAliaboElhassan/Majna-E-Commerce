import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import axios from "axios";

const initialState = {
  products: [],
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get("http://localhost:30001/products");
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      }
      return rejectWithValue(error);
    }
  }
);
export const products = createSlice({
  name: "producs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      console.log(state.products);
    });
  },
});

export default products.reducer;
