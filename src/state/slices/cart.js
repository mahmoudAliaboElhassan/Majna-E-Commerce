import { createSlice, createSelector } from "@reduxjs/toolkit";
import actGetCategoriesByItems from "@state/act/actGetCategoryByItems";
import { getTotalQuantities } from "@state/slices/selectors";
const initialState = {
  items: {}, //  1 :1  1 for id and 1 for quantity
  productFullInfo: [],
};
const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategoriesByItems.fulfilled, (state, action) => {
      state.productFullInfo = action.payload;
      console.log(state.productFullInfo);
      // state.error = false;
    });
  },
});

export default cart.reducer;
export const { addToCart } = cart.actions;
export { getTotalQuantities, actGetCategoriesByItems };
