import { createAsyncThunk } from "@reduxjs/toolkit";

import { majnAPI } from "@state/API/global-api";

export const getBrandsReviewer = createAsyncThunk(
  "reviewrSlice/getBrandsReviewer",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(
        `api/brands-applications`
        // {
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Token ${localStorage.getItem("token")}`,
        // },
        // }
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
export const getSpecificBrand = createAsyncThunk(
  "reviewrSlice/getSpecificBrand",
  async ({ ApplicationId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(
        `api/brands-applications/${ApplicationId}`
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Token ${localStorage.getItem("token")}`,
        //   },
        // }
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
export const UpdateBrandStatus = createAsyncThunk(
  "reviewrSlice/UpdateBrandStatus",
  async ({ id, status }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.patch(
        `api/brands-applications/${id}`,
        { status }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Token ${localStorage.getItem("token")}`,
        //   },
        // }
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
