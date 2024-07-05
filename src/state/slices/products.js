import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import { getProducts, getProductsByCategory } from "@state/act/actProducts";

const initialState = {
  products: [],
  countOfProducts: 0,
};
const { initialStateProducts } = UseInitialStates();

export const productsSlice = createSlice({
  name: "products",
  initialState: initialStateProducts,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productsArray = action.payload.results;
        state.countOfProducts = action.payload.count;
        console.log("State");
        console.log(state.productsArray);
        console.log("Products");
        console.log(action.payload);
        state.loadingProducts = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loadingProducts = false;
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.productsArray = action.payload.results;
        state.countOfProducts = action.payload.count;
        console.log("State");
        console.log(state.productsArray);
        console.log("Products");
        console.log(action.payload);
        state.loadingProducts = false;
      })
      .addCase(getProductsByCategory.rejected, (state) => {
        state.loadingProducts = false;
      })
  },
});

export default productsSlice.reducer;
export { getProducts, getProductsByCategory };
