import { createAsyncThunk } from "@reduxjs/toolkit";
import { majnAPI, majnaFiles } from "@state/API/global-api";

// get albums
export const getAlbumItems = createAsyncThunk(
  "albumSlice/getAlbumItems",
  async ({ productId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(`api/products/${productId}/album-items`);
      console.log("from slice res is for add product");
      console.log(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      } else if (error.response && error.response.status === 500) {
        console.log(error.message);
      }
      return rejectWithValue(error);
    }
  }
);
// get album
export const getAlbumItem = createAsyncThunk(
  "albumSlice/getAlbumItem",
  async ({ albumId, productId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(
        `api/products/${productId}/album-items/${albumId}`
      );
      console.log("from slice res is for add product");
      console.log(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      } else if (error.response && error.response.status === 500) {
        console.log(error.message);
      }
      return rejectWithValue(error);
    }
  }
);
// update album
export const updateAlbumItem = createAsyncThunk(
  "albumSlice/updateAlbumItem",
  async ({ albumId, productId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnaFiles.put(
        `api/products/${productId}/album-items/${albumId}`
      );
      console.log("from slice res is for add product");
      console.log(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      } else if (error.response && error.response.status === 500) {
        console.log(error.message);
      }
      return rejectWithValue(error);
    }
  }
);
// delete album
export const deleteAlbum = createAsyncThunk(
  "albumSlice/deleteAlbum",
  async ({ albumId, productId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.delete(
        `api/products/${productId}/album-items/${albumId}`
      );
      console.log("from slice res is for add product");
      console.log(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      } else if (error.response && error.response.status === 500) {
        console.log(error.message);
      }
      return rejectWithValue(error);
    }
  }
);
// ADD album
export const addAlbumItem = createAsyncThunk(
  "albumSlice/addAlbumItem",
  async ({ productId, ...rest }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnaFiles.post(
        `api/products/${productId}/album-items`,
        rest
      );
      console.log("from slice res is for add product");
      console.log(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      } else if (error.response && error.response.status === 500) {
        console.log(error.message);
      }
      return rejectWithValue(error);
    }
  }
);
