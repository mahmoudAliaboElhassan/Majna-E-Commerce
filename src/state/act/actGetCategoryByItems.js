import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { majnAPI, majnaFiles } from "@state/API/global-api";

const actGetCategoriesByItems = createAsyncThunk(
  "cart/actGetCategoriesByItems",
  async (query, thunkAPI) => {
    const entriesArray = Object.entries(query);
    console.log("entriesArray");
    console.log(entriesArray);
    const queryParameters = entriesArray
      .map((qry) => {
        if (qry[1]) {
          return `${qry[0]}=${qry[1]}`;
        }
      })
      .join("&");
    console.log(queryParameters);
    console.log("query");
    console.log(query);
    console.log(Array.from(query));
    const { rejectWithValue, getState } = thunkAPI;
    const { cart } = getState();
    const itemsId = Object.keys(cart.items);
    console.log("keys is ");
    console.log(itemsId);
    const itemsConcatenatedId = itemsId.map((item) => `id=${item}`).join("&");
    console.log(itemsConcatenatedId);
    try {
      if (itemsConcatenatedId) {
        const { data } = await majnAPI.get(
          `http://localhost:30001/products?${queryParameters}`
        );
        return data;
      }
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
