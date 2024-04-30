import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import { majnAPI } from "@state/API/global-api";

const { initialStateReviewer } = UseInitialStates();

// export const addBrand = createAsyncThunk(
//   "reviewrSlice/addBrand",
//   async ({ Uid, authorization_doc, identity_doc }, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const { data } = await majnAPI.post(
//         `api/brands/${Uid}/applications`,
//         { authorization_doc, identity_doc },
//         {
//           headers: {
//             Authorization: `Token ${localStorage.getItem("token")}`,
//             Accept: "application/json",
//             "Content-Type":
//               'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
//             // many kind of data
//           },
//         }
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         // Handle 403 error here
//         // Example: setConfirmed(true);
//         console.log("400 Forbidden - User not authorized from slice");
//       }
//       return rejectWithValue(error);
//     }
//   }
// );
export const getBrandsPyPage = createAsyncThunk(
  "reviewrSlice/getBrandsPyPage",
  async ({ page }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(
        `api/brands-applications?page=${page}`
        // {
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Token ${localStorage.getItem("token")}`,
        // },
        // }
      );
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
export const getSpecificBrand = createAsyncThunk(
  "reviewrSlice/getSpecificBrand",
  async ({ ApplicationId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(
        `api/brands-applications/${ApplicationId}`
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Token ${localStorage.getItem("token")}`,
        //   },
        // }
      );
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
export const UpdateBrandStatus = createAsyncThunk(
  "reviewrSlice/UpdateBrandStatus",
  async ({ id, status }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.patch(
        `api/brands-applications/${id}`,
        { status }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Token ${localStorage.getItem("token")}`,
        //   },
        // }
      );
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

export const reviewrSlice = createSlice({
  name: "reviewrSlice",
  initialState: initialStateReviewer,
  reducers: {
    cleanUpSpecifiedBrand: (state) => {
      state.authorizationDocument = null;
      state.identityDocument = null;
    },
    cleanUpBrandsByPage: (state) => {
      state.allBrans=[]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrandsPyPage.pending, (state, action) => {
        // state.loadingFetch = true;
        // state.error = false;
        state.loadingReviewer = true;
      })
      .addCase(getBrandsPyPage.fulfilled, (state, action) => {
        // state.loading = false;
        // state.error = false;
        // state.loadingFetch = false;
        state.countOfBrands = action.payload.count;
        console.log(action.payload);
        state.allBrans = action.payload.results;
        console.log(state.allBrans);

        state.loadingReviewer = false;
        // state.brands = action.payload.brands;
        // console.log(state.brands);
      })
      .addCase(getBrandsPyPage.rejected, (state, action) => {
        // state.loadingFetch = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingReviewer = false;
      })
      .addCase(getSpecificBrand.pending, (state, action) => {
        // state.loadingProducts = true;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingSpecificBrand = true;
      })
      .addCase(getSpecificBrand.fulfilled, (state, action) => {
        state.authorizationDocument = action.payload.authorization_doc;
        state.identityDocument = action.payload.identity_doc;

        console.log(action.payload);
        state.loadingSpecificBrand = false;
        state.brandName = action.payload.brand;
      })
      .addCase(getSpecificBrand.rejected, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingSpecificBrand = false;
      })
      .addCase(UpdateBrandStatus.pending, (state, action) => {
        // state.loadingProducts = true;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        // state.loadingReviewer = true;
        state.statusMessage = null;
        state.loadingStatus = true;
      })
      .addCase(UpdateBrandStatus.fulfilled, (state, action) => {
        state.statusMessage = action.payload.message;
        console.log(state.statusMessage);
        state.loadingStatus = false;
      })
      .addCase(UpdateBrandStatus.rejected, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        // state.loadingReviewer = false;
        state.statusMessage = action.payload;
        state.loadingStatus = false;
      });
  },
});

export default reviewrSlice.reducer;
export const { cleanUpSpecifiedBrand ,cleanUpBrandsByPage,} = reviewrSlice.actions;
