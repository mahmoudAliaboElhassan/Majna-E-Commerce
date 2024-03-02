import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";
import { majnAPI } from "../API/global-api";

const { initialStateAuth } = UseInitialStates();

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
        userData,
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
        { token, password },
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
        state.loading = true; // Fix the typo here
        state.error = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        localStorage.removeItem("role");
        localStorage.removeItem("expired");
        state.token = "";
        state.role = "";
        state.expireToken = "";
        console.log(`token in logout is ${state.token}`);
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
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
