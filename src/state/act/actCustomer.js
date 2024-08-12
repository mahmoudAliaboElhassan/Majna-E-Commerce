import { createAsyncThunk } from "@reduxjs/toolkit";

import { majnAPI } from "@state/API/global-api";

export const getAllAddresses = createAsyncThunk(
  "customer/getAllAddresses",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    // try {
    //   const res = await majnAPI.get("api/users/", userData);
    //   console.log("from slice res is");
    //   console.log(res);
    //   return res;
    // }
    // catch (error) {
    //   if (error.response && error.response.status === 400) {
    //     // Handle 403 error here
    //     // Example: setConfirmed(true);
    //     console.log("400 Forbidden - User not authorized from slice");
    //   }
    //   return rejectWithValue(error);
    // }
  }
);
export const addAddress = createAsyncThunk(
  "customer/addAddress",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    // try {
    //   const res = await majnAPI.post("api/users/", userData);
    //   console.log("from slice res is");
    //   console.log(res);
    //   return res;
    // }
    // catch (error) {
    //   if (error.response && error.response.status === 400) {
    //     // Handle 403 error here
    //     // Example: setConfirmed(true);
    //     console.log("400 Forbidden - User not authorized from slice");
    //   }
    //   return rejectWithValue(error);
    // }
  }
);
export const editAddress = createAsyncThunk(
  "customer/editAddress",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    // try {
    //   const res = await majnAPI.patch("api/users/", userData);
    //   console.log("from slice res is");
    //   console.log(res);
    //   return res;
    // }
    // catch (error) {
    //   if (error.response && error.response.status === 400) {
    //     // Handle 403 error here
    //     // Example: setConfirmed(true);
    //     console.log("400 Forbidden - User not authorized from slice");
    //   }
    //   return rejectWithValue(error);
    // }
  }
);
export const deleteAddress = createAsyncThunk(
  "customer/deleteAddress",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    // try {
    //   const res = await majnAPI.delete("api/users/", userData);
    //   console.log("from slice res is");
    //   console.log(res);
    //   return res;
    // }
    // catch (error) {
    //   if (error.response && error.response.status === 400) {
    //     // Handle 403 error here
    //     // Example: setConfirmed(true);
    //     console.log("400 Forbidden - User not authorized from slice");
    //   }
    //   return rejectWithValue(error);
    // }
  }
);
