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
      .addCase(getSpecifiedReview.pending, (state, action) => {
        state.loadingGetReview = true;
      })
      .addCase(getSpecifiedReview.fulfilled, (state, action) => {
        state.loadingGetReview = false;
        state.reviewRating = action.payload.rating;
        state.reviewContent = action.payload.content;
      })
      .addCase(getSpecifiedReview.rejected, (state, action) => {
        state.loadingGetReview = false;
      })
      .addCase(updateSpecifiedReview.pending, (state, action) => {
        state.loadingUpdateReview = true;
      })
      .addCase(updateSpecifiedReview.fulfilled, (state, action) => {
        state.loadingUpdateReview = false;
      })
      .addCase(updateSpecifiedReview.rejected, (state, action) => {
        state.loadingUpdateReview = false;
      });
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
