import { createSlice, createSelector } from "@reduxjs/toolkit";
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
});

export default cart.reducer;
export const { addToCart } = cart.actions;
export { getTotalQuantities };
