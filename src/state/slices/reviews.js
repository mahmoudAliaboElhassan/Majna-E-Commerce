import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import {
  addReview,
  getReviews,
  getSpecifiedReview,
  updateSpecifiedReview,
  deleteSpecifiedReview,
} from "@state/act/actProductReviews";

const { initialStateProductReview } = UseInitialStates();

export const productReview = createSlice({
  name: "productReview",
  initialState: initialStateProductReview,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.loadingGetRevies = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.results;
        state.loadingGetRevies = false;
        state.countOfReviews = action.payload.results?.length;
      })
      .addCase(getReviews.rejected, (state) => {
        state.loadingGetRevies = false;
      })
      .addCase(addReview.pending, (state) => {
        state.loadingAddReview = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews = action.payload.results;
        state.loadingAddReview = false;
        state.countOfReviews++;
      })  
      .addCase(addReview.rejected, (state) => {
        state.loadingAddReview = false;
      })
      .addCase(deleteSpecifiedReview.fulfilled, (state) => {
        state.countOfReviews--;
      })
  },
});

export default productReview.reducer;
export {
  addReview,
  getReviews,
  getSpecifiedReview,
  updateSpecifiedReview,
  deleteSpecifiedReview,
};
export const {} = productReview.actions;
