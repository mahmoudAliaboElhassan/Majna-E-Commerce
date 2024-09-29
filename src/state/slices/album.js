import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import {
  getAlbumItems,
  getAlbumItem,
  updateAlbmItem,
  deleteAlbumItem,
  addAlbumItem,
} from "@state/act/actAlbums";
const { initalStateAlbumItems } = UseInitialStates();

export const albumSlice = createSlice({
  name: "albumSlice",
  initialState: initalStateAlbumItems,
  reducers: {
    // handlelogOutState: (state) => {
    //   state.token = "";
    //   state.role = "";
    //   state.expireToken = "";
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumItems.pending, (state, action) => {
        state.loadingGetAlbumItems = true;
      })
      .addCase(getAlbumItems.fulfilled, (state, action) => {
        state.loadingGetAlbumItems = false;
        state.albumItems = action.payload.album_items;
      })
      .addCase(getAlbumItems.rejected, (state, action) => {
        state.loadingGetAlbumItems = false;
      });
    //   .addCase(signUp.pending, (state, action) => {
    //     state.loading = true; // Fix the typo here
    //     state.error = false;
    //   })
    //   .addCase(signUp.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = false;
    //     console.log(action.payload);
    //   })
    //   .addCase(signUp.rejected, (state, action) => {
    //     state.error = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(ActivateAccount.pending, (state, action) => {
    //     state.loading = true; // Fix the typo here
    //     state.error = false;
    //   })
    //   .addCase(ActivateAccount.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = false;
    //     console.log(action.payload);
    //   })
    //   .addCase(ActivateAccount.rejected, (state, action) => {
    //     state.error = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(ResendConfirmation.pending, (state, action) => {
    //     state.loading = true; // Fix the typo here
    //     state.error = false;
    //   })
    //   .addCase(ResendConfirmation.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = false;
    //     console.log(action.payload);
    //   })
    //   .addCase(ResendConfirmation.rejected, (state, action) => {
    //     state.error = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(logOut.pending, (state, action) => {
    //     state.loadingLogOut = true; // Fix the typo here
    //     state.error = false;
    //   })
    //   .addCase(logOut.fulfilled, (state, action) => {
    //     state.loadingLogOut = false;
    //     state.error = false;
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("type");
    //     localStorage.removeItem("role");
    //     localStorage.removeItem("expired");
    //     localStorage.removeItem("userId");
    //     localStorage.removeItem("countOfCartItem");
    //     state.token = "";
    //     state.role = "";
    //     state.expireToken = "";
    //     console.log(`token in logout is ${state.token}`);
    //   })
    //   .addCase(logOut.rejected, (state, action) => {
    //     state.error = action.payload;
    //     state.loadingLogOut = false;
    //   })
    //   .addCase(changePassword.pending, (state, action) => {
    //     state.loading = true;
    //     state.error = false;
    //   })
    //   .addCase(changePassword.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = false;
    //     //localStorage.removeItem("token");
    //     //state.token = "";
    //     console.log(`token in logout is ${state.token}`);
    //   })
    //   .addCase(changePassword.rejected, (state, action) => {
    //     state.error = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(forgetPassword.pending, (state, action) => {
    //     state.loading = true;
    //     state.error = false;
    //   })
    //   .addCase(forgetPassword.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = false;
    //     //localStorage.removeItem("token");
    //     //state.token = "";
    //   })
    //   .addCase(forgetPassword.rejected, (state, action) => {
    //     state.error = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(resetPassword.pending, (state, action) => {
    //     state.loading = true;
    //     state.error = false;
    //   })
    //   .addCase(resetPassword.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = false;
    //     //localStorage.removeItem("token");
    //     //state.token = "";
    //   })
    //   .addCase(resetPassword.rejected, (state, action) => {
    //     state.error = action.payload;
    //     state.loading = false;
    //   });
  },
});

export default albumSlice.reducer;
export {
  getAlbumItems,
  getAlbumItem,
  updateAlbmItem,
  deleteAlbumItem,
  addAlbumItem,
};
// export const { handlelogOutState } = authSlice.actions;
