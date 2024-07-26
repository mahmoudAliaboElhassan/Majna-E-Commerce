import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import {
  getProducts,
  getProductsByCategory,
  getSpecifiedProduct,
} from "@state/act/actProducts";

const { initialStateProducts } = UseInitialStates();

export const productsSlice = createSlice({
  name: "products",
  initialState: initialStateProducts,
  reducers: {
    cleanUpGetProducts: (state) => {
      state.productsArray = [];
    },
    cleanUpgetProductsByCategory: (state) => {
      state.productsArray = [];
    },
    cleanUpGetSpecifiedProduct: (state) => {
      state.productData = [];
    },
  },
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
        state.countOfProducts = 0;
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
      .addCase(getSpecifiedProduct.pending, (state) => {
        state.loadingSpecificProduct = true;
      })
      .addCase(getSpecifiedProduct.fulfilled, (state, action) => {
        state.loadingSpecificProduct = false;
        state.productData = action.payload;
        console.log(action.payload);
        console.log(state.productData);
      })
      .addCase(getSpecifiedProduct.rejected, (state) => {
        state.loadingSpecificProduct = false;
      });
  },
});

export default productsSlice.reducer;
export { getProducts, getProductsByCategory, getSpecifiedProduct };
export const {
  cleanUpgetProductsByCategory,
  cleanUpGetProducts,
  cleanUpGetSpecifiedProduct,
} = productsSlice.actions;
