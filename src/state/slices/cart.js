import { createSlice, createSelector } from "@reduxjs/toolkit";
import actGetCategoriesByItems from "@state/act/actGetCategoryByItems";
// import { getTotalQuantities } from "@state/slices/selectors";
import UseInitialStates from "@hooks/use-initial-state";
import {
  getCarts,
  getCartItem,
  updateQuantity,
  postCart,
  deleteCartItem,
  postFavorite,
  getFavorites,
  deleteFavorite,
  deleteCarts,
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
    cleanUpFavorites: (state) => {
      state.favoritesArray = null;
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
        // state.countOfCartItems = 0;
      })
      .addCase(getCarts.fulfilled, (state, action) => {
        state.loadingCarts = false;
        state.cartItems = action.payload.cart_items;
        localStorage.setItem(
          "countOfCartItem",
          action.payload.cart_items.length
        );
        state.countOfCartItems = localStorage.getItem("countOfCartItem");
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
      .addCase(postCart.pending, (state, action) => {
        state.loadingPostCart = true;
      })
      .addCase(postCart.fulfilled, (state, action) => {
        state.loadingPostCart = false;
        console.log("action?.meta?.arg?.quantity");
        localStorage.setItem(
          "countOfCartItem",
          localStorage.getItem("countOfCartItem") + 1
        );
        state.countOfCartItems = localStorage.getItem("countOfCartItem");
      })
      .addCase(postCart.rejected, (state, action) => {
        state.loadingPostCart = false;
      })
      .addCase(postFavorite.pending, (state, action) => {
        state.loadingAddtoFavorite = true;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        state.loadingAddtoFavorite = false;
        state.countOfFavoritesProducts += 1;
      })
      .addCase(postFavorite.rejected, (state, action) => {
        state.loadingAddtoFavorite = false;
      })
      .addCase(getFavorites.pending, (state, action) => {
        state.loadingGetFavorites = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.loadingGetFavorites = false;
        state.favoritesArray = action.payload.favorite_items;
        state.countOfFavoritesProducts = action.payload.favorite_items.length;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loadingGetFavorites = false;
        state.countOfFavoritesProducts = 0;
      })
      .addCase(deleteCartItem.pending, (state, action) => {
        state.loadingDeleteCart = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loadingDeleteCart = false;
        state.countOfCartItems--;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loadingDeleteCart = false;
      })
      .addCase(deleteFavorite.pending, (state, action) => {
        state.loadingDeleteFavorite = true;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.loadingDeleteFavorite = false;
        state.countOfFavoritesProducts--;
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.loadingDeleteFavorite = false;
      })

      .addCase(deleteCarts.pending, (state, action) => {
        state.loadingDeleteCarts = true;
      })
      .addCase(deleteCarts.fulfilled, (state, action) => {
        state.loadingDeleteCarts = false;
        localStorage.setItem("countOfCartItem", 0);
        state.countOfCartItems = localStorage.getItem("countOfCartItem");
      })
      .addCase(deleteCarts.rejected, (state, action) => {
        state.loadingDeleteCarts = false;
      });
  },
});

export default cart.reducer;
export const { addToCart } = cart.actions;
export {
  // getTotalQuantities,
  actGetCategoriesByItems,
  getCarts,
  getCartItem,
  updateQuantity,
  postCart,
  deleteCartItem,
  postFavorite,
  getFavorites,
  deleteFavorite,
  deleteCarts,
};
export const { cleanUpCartItems, cleanUpCartItem, cleanUpFavorites } =
  cart.actions;
