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
        state.reviews = action.payload;
        state.loadingGetRevies = false;
      })
      .addCase(getReviews.rejected, (state) => {
        state.loadingGetRevies = false;
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
