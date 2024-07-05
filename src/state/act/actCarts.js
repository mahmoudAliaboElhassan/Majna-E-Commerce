import { createAsyncThunk } from "@reduxjs/toolkit";

import { majnAPI } from "@state/API/global-api";

export const getCarts = createAsyncThunk(
  "products/getCarts"
  //   async (query, thunkAPI) => {
  //     const { rejectWithValue } = thunkAPI;
  //     const entriesArray = Object.entries(query);
  //     console.log("entriesArray");
  //     console.log(entriesArray);
  //     const queryParameters = entriesArray
  //       .map(([key, value]) => (value ? `${key}=${value}` : null))
  //       .filter(Boolean)
  //       .join("&");

  //     try {
  //       const data = await majnAPI.get(`api/products?${queryParameters}`);
  //       return data;
  //     } catch (error) {
  //       if (error.response && error.response.status === 400) {
  //         // Handle 400 error here
  //         console.log("400 Bad Request - Error in the request");
  //       }
  //       return rejectWithValue(error);
  //     }
  //   }
);
export const getCartItem = createAsyncThunk(
  "products/getCartItem"
  //   async ({ id, ...query }, thunkAPI) => {
  //     const { rejectWithValue } = thunkAPI;
  //     const entriesArray = Object.entries(query);
  //     console.log("entriesArray");
  //     console.log(entriesArray);
  //     const queryParameters = entriesArray
  //       .map(([key, value]) => (value ? `${key}=${value}` : null))
  //       .filter(Boolean)
  //       .join("&");

  //     try {
  //       const data = await majnAPI.get(
  //         `api/products/categories/${id}?${queryParameters}`
  //       );
  //       return data;
  //     } catch (error) {
  //       if (error.response && error.response.status === 400) {
  //         // Handle 400 error here
  //         console.log("400 Bad Request - Error in the request");
  //       }
  //       return rejectWithValue(error);
  //     }
  //   }
);
export const updateQuantity = createAsyncThunk(
  "products/updateQuantity"
  //   async ({ id, ...query }, thunkAPI) => {
  //     const { rejectWithValue } = thunkAPI;
  //     const entriesArray = Object.entries(query);
  //     console.log("entriesArray");
  //     console.log(entriesArray);
  //     const queryParameters = entriesArray
  //       .map(([key, value]) => (value ? `${key}=${value}` : null))
  //       .filter(Boolean)
  //       .join("&");

  //     try {
  //       const data = await majnAPI.get(
  //         `api/products/categories/${id}?${queryParameters}`
  //       );
  //       return data;
  //     } catch (error) {
  //       if (error.response && error.response.status === 400) {
  //         // Handle 400 error here
  //         console.log("400 Bad Request - Error in the request");
  //       }
  //       return rejectWithValue(error);
  //     }
  //   }
);
export const postCarts = createAsyncThunk(
  "products/postCarts"
  //   async ({ id, ...query }, thunkAPI) => {
  //     const { rejectWithValue } = thunkAPI;
  //     const entriesArray = Object.entries(query);
  //     console.log("entriesArray");
  //     console.log(entriesArray);
  //     const queryParameters = entriesArray
  //       .map(([key, value]) => (value ? `${key}=${value}` : null))
  //       .filter(Boolean)
  //       .join("&");

  //     try {
  //       const data = await majnAPI.get(
  //         `api/products/categories/${id}?${queryParameters}`
  //       );
  //       return data;
  //     } catch (error) {
  //       if (error.response && error.response.status === 400) {
  //         // Handle 400 error here
  //         console.log("400 Bad Request - Error in the request");
  //       }
  //       return rejectWithValue(error);
  //     }
  //   }
);
export const deleteCartItem = createAsyncThunk(
  "products/deleteCartItem"
  //   async ({ id, ...query }, thunkAPI) => {
  //     const { rejectWithValue } = thunkAPI;
  //     const entriesArray = Object.entries(query);
  //     console.log("entriesArray");
  //     console.log(entriesArray);
  //     const queryParameters = entriesArray
  //       .map(([key, value]) => (value ? `${key}=${value}` : null))
  //       .filter(Boolean)
  //       .join("&");

  //     try {
  //       const data = await majnAPI.get(
  //         `api/products/categories/${id}?${queryParameters}`
  //       );
  //       return data;
  //     } catch (error) {
  //       if (error.response && error.response.status === 400) {
  //         // Handle 400 error here
  //         console.log("400 Bad Request - Error in the request");
  //       }
  //       return rejectWithValue(error);
  //     }
  //   }
);
