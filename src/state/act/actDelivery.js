import { createAsyncThunk } from "@reduxjs/toolkit";

import { majnAPI } from "@state/API/global-api";

export const getDeliveryOrders = createAsyncThunk(
  "deliverySlice/getDeliveryOrders",
  async (query, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const entriesArray = Object.entries(query);
    const queryParameters = entriesArray
      .map(([key, value]) => (value ? `${key}=${value}` : null))
      .filter(Boolean)
      .join("&");
    try {
      const res = await majnAPI.get(`api/orders?${queryParameters}`);
      console.log("from slice res is");
      console.log(res);
      return res;
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

export const getSpecificOrder = createAsyncThunk(
  "deliverySlice/getSpecificOrder",
  async ({ orderId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(`api/orders/${orderId}`);
      console.log("from slice res is");
      console.log(res);
      return res;
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
export const updateSpecificOrder = createAsyncThunk(
  "deliverySlice/updateSpecificOrder",
  async ({ orderId, status }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.patch(`api/orders/${orderId}`, { status });
      console.log("from slice res is");
      console.log(res);
      return res;
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
