import { createAsyncThunk } from "@reduxjs/toolkit";

import { majnAPIWithoutAuth } from "@state/API/global-api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (query, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const entriesArray = Object?.entries(query);
    console.log("entriesArray");
    console.log(entriesArray);
    const queryParameters = entriesArray
      .map(([key, value]) => (value ? `${key}=${value}` : null))
      .filter(Boolean)
      .join("&");

    try {
      const data = await majnAPIWithoutAuth.get(
        `api/products?${queryParameters}`
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
export const getProductsByCategory = createAsyncThunk(
  "products/getProductsByCategory",
  async ({ id, ...query }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const entriesArray = Object.entries(query);
    console.log("entriesArray");
    console.log(entriesArray);
    const queryParameters = entriesArray
      .map(([key, value]) => (value ? `${key}=${value}` : null))
      .filter(Boolean)
      .join("&");

    try {
      const data = await majnAPIWithoutAuth.get(
        `api/categories/${id}/products?${queryParameters}`
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
export const getSpecifiedProduct = createAsyncThunk(
  "products/getSpecifiedProduct",
  async ({ id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const data = await majnAPIWithoutAuth.get(`api/products/${id}`);
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
