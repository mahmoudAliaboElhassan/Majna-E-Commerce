import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import {
  getBrandsReviewer,
  getSpecificBrand,
  UpdateBrandStatus,
} from "@state/act/actReviewer";

const { initialStateReviewer } = UseInitialStates();

export const reviewrSlice = createSlice({
  name: "reviewrSlice",
  initialState: initialStateReviewer,
  reducers: {
    cleanUpSpecifiedBrand: (state) => {
      state.authorizationDocument = null;
      state.identityDocument = null;
    },
    cleanUpBrandsReviewer: (state) => {
      state.allBrans = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrandsReviewer.pending, (state, action) => {
        // state.loadingFetch = true;
        // state.error = false;
        state.loadingReviewer = true;
      })
      .addCase(getBrandsReviewer.fulfilled, (state, action) => {
        // state.loading = false;
        // state.error = false;
        // state.loadingFetch = false;
        state.countOfBrands = action.payload.count;
        console.log(action.payload);
        state.allBrans = action.payload.results;
        console.log(state.allBrans);

        state.loadingReviewer = false;
        // state.brands = action.payload.brands;
        // console.log(state.brands);
      })
      .addCase(getBrandsReviewer.rejected, (state, action) => {
        // state.loadingFetch = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingReviewer = false;
      })
      .addCase(getSpecificBrand.pending, (state, action) => {
        // state.loadingProducts = true;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingSpecificBrand = true;
      })
      .addCase(getSpecificBrand.fulfilled, (state, action) => {
        state.authorizationDocument = action.payload.authorization_doc;
        state.identityDocument = action.payload.identity_doc;

        console.log(action.payload);
        state.loadingSpecificBrand = false;
        state.brandName = action.payload.brand;
      })
      .addCase(getSpecificBrand.rejected, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingSpecificBrand = false;
      })
      .addCase(UpdateBrandStatus.pending, (state, action) => {
        // state.loadingProducts = true;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        // state.loadingReviewer = true;
        state.statusMessage = null;
        state.loadingStatus = true;
      })
      .addCase(UpdateBrandStatus.fulfilled, (state, action) => {
        state.statusMessage = action.payload.message;
        console.log(state.statusMessage);
        state.loadingStatus = false;
      })
      .addCase(UpdateBrandStatus.rejected, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        // state.loadingReviewer = false;
        state.statusMessage = action.payload;
        state.loadingStatus = false;
      });
  },
});

export default reviewrSlice.reducer;
export const { cleanUpSpecifiedBrand, cleanUpBrandsReviewer } =
  reviewrSlice.actions;
export { getBrandsReviewer, getSpecificBrand, UpdateBrandStatus };
