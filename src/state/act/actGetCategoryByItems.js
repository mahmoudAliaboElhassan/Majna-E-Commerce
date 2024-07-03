import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { majnAPI } from "@state/API/global-api";

const actGetCategoriesByItems = createAsyncThunk(
  "cart/actGetCategoriesByItems",
  async (query, thunkAPI) => {
    const entriesArray = Object.entries(query);
    console.log("entriesArray", entriesArray);

    // Filter out undefined values
    const queryParameters = entriesArray
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    console.log("queryParameters", queryParameters);
    console.log("query", query);
    console.log("Array.from(query)", Array.from(query));

    const { rejectWithValue, getState } = thunkAPI;
    const { cart } = getState();

    // If needed, uncomment and use these lines for getting items from the cart
    // const itemsId = Object.keys(cart.items);
    // console.log("keys is", itemsId);
    // const itemsConcatenatedId = itemsId.map((item) => `id=${item}`).join("&");
    // console.log(itemsConcatenatedId);

    try {
      const { data } = await majnAPI.get(`api/products?${queryParameters}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export default actGetCategoriesByItems;
