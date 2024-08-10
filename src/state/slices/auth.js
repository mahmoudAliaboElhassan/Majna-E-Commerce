import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import {
  signUp,
  logIn,
  changePassword,
  ActivateAccount,
  forgetPassword,
  ResendConfirmation,
  logOut,
  resetPassword,
} from "@state/act/actAuth";
const { initialStateAuth } = UseInitialStates();

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialStateAuth,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        localStorage.setItem("token", action.payload.token);
        state.token = localStorage.getItem("token");
        localStorage.setItem("expired", action.payload.expiry);
        state.expireToken = localStorage.getItem("expired");
        // console.log(state.token);
        state.username = action.payload.user.username;
        // console.log(state.username);
        console.log("all objects");
        console.log(action.payload.user);
        console.log(action.payload.user.id); // Check if this is the correct property
        localStorage.setItem("userId", action.payload.user.id);

        state.Uid = localStorage.getItem("userId");
        console.log("Updated Uid:", state.Uid);
        state.email = action.payload.user.email;

        localStorage.setItem("role", action.payload.user.user_role);
        state.role = localStorage.getItem("role");
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.Uid = null;
      })
      .addCase(signUp.pending, (state, action) => {
        state.loading = true; // Fix the typo here
        state.error = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        console.log(action.payload);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(ActivateAccount.pending, (state, action) => {
        state.loading = true; // Fix the typo here
        state.error = false;
      })
      .addCase(ActivateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        console.log(action.payload);
      })
      .addCase(ActivateAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(ResendConfirmation.pending, (state, action) => {
        state.loading = true; // Fix the typo here
        state.error = false;
      })
      .addCase(ResendConfirmation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        console.log(action.payload);
      })
      .addCase(ResendConfirmation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(logOut.pending, (state, action) => {
        state.loadingLogOut = true; // Fix the typo here
        state.error = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loadingLogOut = false;
        state.error = false;
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        localStorage.removeItem("role");
        localStorage.removeItem("expired");
        localStorage.removeItem("userId");
        localStorage.removeItem("countOfCartItem");
        state.token = "";
        state.role = "";
        state.expireToken = "";
        console.log(`token in logout is ${state.token}`);
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingLogOut = false;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        //localStorage.removeItem("token");
        //state.token = "";
        console.log(`token in logout is ${state.token}`);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(forgetPassword.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        //localStorage.removeItem("token");
        //state.token = "";
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        //localStorage.removeItem("token");
        //state.token = "";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
export {
  signUp,
  logIn,
  changePassword,
  ActivateAccount,
  ResendConfirmation,
  forgetPassword,
  logOut,
  resetPassword,
};
