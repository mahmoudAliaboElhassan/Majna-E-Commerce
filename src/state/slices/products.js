import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UseInitialStates from "@hooks/use-initial-state";
import axios from "axios";
import { majnAPI, majnaFiles } from "@state/API/global-api";

const initialState = {
  products: [],
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (query, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const entriesArray = Object.entries(query);
    console.log("entriesArray");
    console.log(entriesArray);
    const queryParameters = entriesArray
      .map(([key, value]) => (value ? `${key}=${value}` : null))
      .filter(Boolean)
      .join("&");

    try {
      const { data } = await majnAPI.get(
        `http://localhost:30001/products?${queryParameters}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 error here
        console.log("400 Bad Request - Error in the request");
      }
      return rejectWithValue(error);
    }
  }
);

export const products = createSlice({
  name: "products",
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
