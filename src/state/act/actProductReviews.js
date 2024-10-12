import { createAsyncThunk } from "@reduxjs/toolkit";

import { majnAPI } from "@state/API/global-api";

export const addReview = createAsyncThunk(
  "productReview/addReview",
  async ({ productId, ...rest }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.post(`api/products/${productId}/reviews`, rest);
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
export const getReviews = createAsyncThunk(
  "productReview/getReviews",
  async ({ productId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.get(`api/products/${productId}/reviews`);
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
export const getSpecifiedReview = createAsyncThunk(
  "productReview/getSpecifiedReview",
  async ({ productId, reviewId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.get(
        `api/products/${productId}/reviews/${reviewId}`
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
export const updateSpecifiedReview = createAsyncThunk(
  "productReview/updateSpecifiedReview",
  async ({ productId, reviewId, ...rest }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.patch(
        `api/products/${productId}/reviews/${reviewId}`,
        rest
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
export const deleteSpecifiedReview = createAsyncThunk(
  "productReview/deleteSpecifiedReview",
  async ({ productId, reviewId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.delete(
        `api/products/${productId}/reviews/${reviewId}`
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
