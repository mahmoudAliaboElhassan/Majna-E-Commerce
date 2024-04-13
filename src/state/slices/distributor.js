import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import { majnAPI, majnaFiles } from "@state/API/global-api";

const { initialStateDistributor } = UseInitialStates();

export const addBrand = createAsyncThunk(
  "distributorSlice/addBrand",
  async ({ Uid, authorization_doc, identity_doc }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnaFiles.post(
        `api/brands/${Uid}/applications`,
        { authorization_doc, identity_doc }
        // {
        //   headers: {
        //     Authorization: `Token ${localStorage.getItem("token")}`,
        //     Accept: "application/json",
        //     "Content-Type":
        //       'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
        //     // many kind of data
        //   },
        // }
      );
      console.log("from slice res is");
      console.log(res);
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
export const fetchPrands = createAsyncThunk(
  "distributorSlice/fetchPrands",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(
        `api/brands`
        //  {
        //   headers: {
        //     // "Content-Type": "application/json",
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
export const fetchGovernance = createAsyncThunk(
  "distributorSlice/fetchGovernance",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get("api/locations/governorates");
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
export const getAllBrandsApplication = createAsyncThunk(
  "distributorSlice/getAllBrandsApplication",
  async ({ Uid }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(
        `api/distributors/${Uid}/brands-applications`
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Token ${localStorage.getItem("token")}`,
        //   },
        // }
      );
      console.log("From Slice all applications");
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
export const getAtuthorizedBrands = createAsyncThunk(
  "distributorSlice/getAtuthorizedBrands",
  async ({ Uid }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(
        `api/distributors/${Uid}/brands`
        // {
        //   headers: {
        //     // "Content-Type": "application/json",
        //     // Authorization: `Token ${localStorage.getItem("token")}`,
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
export const addStore = createAsyncThunk(
  "distributorSlice/addStore",
  async ({ Uid, ...rest }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.post(
        `api/distributors/${Uid}/stores`,
        rest
        // {
        //   headers: {
        //     // "Content-Type": "application/json",
        //     // Authorization: `Token ${localStorage.getItem("token")}`,
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

export const editStore = createAsyncThunk(
  "distributorSlice/editStore",
  async ({ Uid, storeId, ...rest }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.patch(
        `api/distributors/${Uid}/stores/${storeId}`,
        rest
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
export const getStores = createAsyncThunk(
  "distributorSlice/getStores",
  async ({ Uid }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(`api/distributors/${Uid}/stores`);
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
export const getStore = createAsyncThunk(
  "distributorSlice/getStore",
  async ({ Uid, storeId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(
        `api/distributors/${Uid}/stores/${storeId}`
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

export const distributorSlice = createSlice({
  name: "distributorSlice",
  initialState: initialStateDistributor,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrands.pending, (state, action) => {
        state.loadingFetch = true;
        // state.error = false;
      })
      .addCase(fetchPrands.fulfilled, (state, action) => {
        // state.loading = false;
        // state.error = false;
        state.loadingFetch = false;

        state.brands = action.payload.brands;
        console.log(state.brands);
      })
      .addCase(fetchPrands.rejected, (state, action) => {
        state.loadingFetch = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
      })
      .addCase(addBrand.pending, (state, action) => {
        state.loadingProducts = true;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
      })
      .addCase(getAllBrandsApplication.pending, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingDistributorApplications = true;
      })
      .addCase(getAllBrandsApplication.fulfilled, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.distributorBrands = action.payload;
        // state.BrandAppLink = action.payload._links.self;
        console.log(action.payload);
        state.loadingDistributorApplications = false;
      })
      .addCase(getAtuthorizedBrands.rejected, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        // state.loadingDistributorApplications = false;
      })
      .addCase(getAtuthorizedBrands.pending, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingAuthorized = true;
      })
      .addCase(getAtuthorizedBrands.fulfilled, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.approvedBrands = action.payload;
        // state.BrandAppLink = action.payload._links.self;
        console.log(action.payload);
        state.loadingAuthorized = false;
      })
      .addCase(getAllBrandsApplication.rejected, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingAuthorized = false;
      })
      .addCase(addStore.pending, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingStore = true;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        // state.approvedBrands = action.payload;
        // state.BrandAppLink = action.payload._links.self;
        console.log(action.payload);
        state.loadingStore = false;
      })
      .addCase(addStore.rejected, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingStore = false;
      })
      .addCase(fetchGovernance.pending, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingGovernaces = true;
      })
      .addCase(fetchGovernance.fulfilled, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        // state.approvedBrands = action.payload;
        // state.BrandAppLink = action.payload._links.self;
        console.log(action.payload);
        state.loadingGovernaces = false;
        state.governance = action.payload.governorates;
        console.log(state.governance);
      })
      .addCase(fetchGovernance.rejected, (state, action) => {
        // state.loadingProducts = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingGovernaces = false;
      })
      .addCase(getStores.pending, (state, action) => {
        state.loadingStores = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        console.log(action.payload);
        state.stores = action.payload.stores;
        state.loadingStores = false;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.loadingStores = false;
      })
      .addCase(getStore.pending, (state, action) => {
        state.loadingSingleStoreData = true;
      })
      .addCase(getStore.fulfilled, (state, action) => {
        console.log(action.payload);
        state.singleStoreData = action.payload;
        state.loadingSingleStoreData = false;
        // localStorage.setItem(storeId,action.payload.)
        // state.storeId=localStorage.getItem("storeId")
      })
      .addCase(getStore.rejected, (state, action) => {
        state.loadingSingleStoreData = false;
      })
      .addCase(editStore.pending, (state, action) => {
        state.loadingEdit = true;
      })
      .addCase(editStore.fulfilled, (state, action) => {
        console.log(action.payload);
         state.loadingEdit = false;
        // localStorage.setItem(storeId,action.payload.)
        // state.storeId=localStorage.getItem("storeId")
      })
      .addCase(editStore.rejected, (state, action) => {
        state.loadingEdit = false;
      })
  },
});

export default distributorSlice.reducer;
