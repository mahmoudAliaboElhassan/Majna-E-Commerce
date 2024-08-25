import { createAsyncThunk } from "@reduxjs/toolkit";

import { majnAPI } from "@state/API/global-api";

export const getAllAddresses = createAsyncThunk(
  "customer/getAllAddresses",
  async ({ customerId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(`api/customers/${customerId}/addresses`);
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
export const addAddress = createAsyncThunk(
  "customer/addAddress",
  async ({ customerId, ...addressData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.post(
        `api/customers/${customerId}/addresses`,
        addressData
      );
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
export const editAddress = createAsyncThunk(
  "customer/editAddress",
  async ({ customerId, addressId, ...addressData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.patch(
        `api/customers/${customerId}/addresses/${addressId}`,
        addressData
      );
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
export const getAddress = createAsyncThunk(
  "customer/getAddress",
  async ({ customerId, addressId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(
        `api/customers/${customerId}/addresses/${addressId}`
      );
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
export const deleteAddress = createAsyncThunk(
  "customer/deleteAddress",
  async ({ customerId, addressId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.delete(
        `api/customers/${customerId}/addresses/${addressId}`
      );
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

export const getAllOrders = createAsyncThunk(
  "customer/getAllOrders",
  async ({ customerId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // try {
    //   const res = await majnAPI.get(`api/customers/${customerId}/addresses`);
    //   console.log("from slice res is");
    //   console.log(res);
    //   return res;
    // } catch (error) {
    //   if (error.response && error.response.status === 400) {
    //     // Handle 403 error here
    //     // Example: setConfirmed(true);
    //     console.log("400 Forbidden - User not authorized from slice");
    //   }
    //   return rejectWithValue(error);
    // }
  }
);
export const addOrder = createAsyncThunk(
  "customer/addOrder",
  async (orderData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.post(`api/orders/`, orderData);
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
