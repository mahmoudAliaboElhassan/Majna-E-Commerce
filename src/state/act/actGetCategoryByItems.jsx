import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetCategoriesByItems = createAsyncThunk(
  "cart/actGetCategoriesByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart } = getState();
    const itemsId = Object.keys(cart.items);
    console.log("keys is ");
    console.log(itemsId);
    const itemsConcatenatedId = itemsId.map((item) => `id=${item}`).join("&");
    console.log(itemsConcatenatedId);
    try {
      if(itemsConcatenatedId){
       const { data } = await axios.get(
        `http://localhost:30001/products?${itemsConcatenatedId}`
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
