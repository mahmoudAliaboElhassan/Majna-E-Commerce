import { createSlice, createSelector } from "@reduxjs/toolkit";
import actGetCategoriesByItems from "@state/act/actGetCategoryByItems";
import { getTotalQuantities } from "@state/slices/selectors";
import UseInitialStates from "@hooks/use-initial-state";
import {
  getCarts,
  getCartItem,
  updateQuantity,
  postCarts,
  deleteCartItem,
} from "@state/act/actCarts";
// const initialState = {
//   items: {}, //  1 :1  1 for id and 1 for quantity
//   productFullInfo: [],
// };
const { initialStateCart } = UseInitialStates();
const cart = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    // addToCart: (state, action) => {
    //   const id = action.payload;
    //   if (state.items[id]) {
    //     state.items[id]++;
    //   } else {
    //     state.items[id] = 1;
    //   }
    // },

    addToCart: (state, action) => {
      if (!state.cartArr) {
        state.cartArr = [];
      }
      state.cartArr.push(action.payload);
      localStorage.setItem("cartArr", JSON.stringify(state.cartArr));
    },
    cleanUpCartItems: (state) => {
      state.cartItems = [];
    },
    cleanUpCartItem: (state) => {
      state.cartItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetCategoriesByItems.fulfilled, (state, action) => {
        state.productFullInfo = action.payload;
        console.log(state.productFullInfo);
        // state.error = false;
      })
      .addCase(getCarts.pending, (state, action) => {
        state.loadingCarts = true;
      })
      .addCase(getCarts.fulfilled, (state, action) => {
        state.loadingCarts = false;
        state.cartItems = action.payload.cart_items;
        state.countOfCartItems = action.payload.cart_items.length;
      })
      .addCase(getCarts.rejected, (state, action) => {
        state.loadingCarts = false;
        state.countOfCartItems = 0;
      })
      .addCase(getCartItem.pending, (state, action) => {
        state.loadingCart = true;
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        state.loadingCart = false;
        state.cartItem = action.payload.cart_item;
      })
      .addCase(getCartItem.rejected, (state, action) => {
        state.loadingCart = false;
      })
      .addCase(updateQuantity.pending, (state, action) => {
        state.loadingEditCartQuantity = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loadingEditCartQuantity = false;
        console.log("action?.meta?.arg?.quantity");
        state.cartQuantity = action?.meta?.arg?.quantity;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loadingEditCartQuantity = false;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.countOfCartItems--;
      });
  },
});

export default cart.reducer;
export const { addToCart } = cart.actions;
export {
  getTotalQuantities,
  actGetCategoriesByItems,
  getCarts,
  getCartItem,
  updateQuantity,
  postCarts,
  deleteCartItem,
};
export const { cleanUpCartItems, cleanUpCartItem } = cart.actions;
