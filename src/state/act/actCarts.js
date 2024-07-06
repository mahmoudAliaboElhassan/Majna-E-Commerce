import { createAsyncThunk } from "@reduxjs/toolkit";

import { majnAPI } from "@state/API/global-api";

export const getCarts = createAsyncThunk(
  "products/getCarts",
  async ({ id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await majnAPI.get(`api/customers/${id}/cart-items`);
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
export const getCartItem = createAsyncThunk(
  "products/getCartItem",
  async ({ customerId, cartId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const data = await majnAPI.get(
        `api/customers/${customerId}/cart-items/${cartId}`
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
export const updateQuantity = createAsyncThunk(
  "products/updateQuantity",
  async ({ customerId, cartId, quantity }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const data = await majnAPI.patch(
        `api/customers/${customerId}/cart-items/${cartId}`,
        { quantity }
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
  //       const data = await majnAPI.get(`api/customers/${id}/cart-items`);

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
  "products/deleteCartItem",
  async ({ customerId, cartId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const data = await majnAPI.delete(
        `api/customers/${customerId}/cart-items/${cartId}`
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
