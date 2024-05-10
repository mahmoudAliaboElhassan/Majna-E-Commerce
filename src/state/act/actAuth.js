import { createAsyncThunk } from "@reduxjs/toolkit";

import { majnAPI } from "@state/API/global-api";

export const signUp = createAsyncThunk(
  "authSlice/signUp",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.post("api/users/", userData);
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      }
      return rejectWithValue(error);
    }
  }
);
export const logIn = createAsyncThunk(
  "authSlice/logIn",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.post("api/auth/login", userData);
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("403 Forbidden - User not authorized from slice");
      }
      return rejectWithValue(error);
    }
  }
);
export const changePassword = createAsyncThunk(
  "authSlice/changePassword",
  async ({ userId, ...rest }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.post(
        `api/users/${userId}/password-change`,
        rest // Include the rest of the fields in the request body
        // {
        //   headers: {
        //     Authorization: `Token ${localStorage.getItem("token")}`,
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const ActivateAccount = createAsyncThunk(
  "authSlice/ActivateAccount",
  async ({ uid, token }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.post(
        `api/users/${uid}/email-confirm`,
        { token } // Include token in the request body
        // {
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const ResendConfirmation = createAsyncThunk(
  "authSlice/ResendConfirmation",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await majnAPI.post(
        "api/users/resend-confirmation-email",
        userData // Include email in the request body
        // {
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk(
  "authSlice/logOut",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await majnAPI.post(
        "api/auth/logout",
        userData
        //   {
        //   headers: {
        //     Authorization: `Token ${localStorage.getItem("token")}`,
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      // return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "authSlice/forgetPassword",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await majnAPI.post(
        "api/users/password-reset",
        userData
        // {
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      // return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "authSlice/resetPassword",
  async ({ uid, token, password }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await majnAPI.post(
        `api/users/${uid}/password-reset`,
        { token, password }
        // {
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      // return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
