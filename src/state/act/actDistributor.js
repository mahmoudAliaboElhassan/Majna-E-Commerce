import { createAsyncThunk } from "@reduxjs/toolkit";

import { majnAPI, majnaFiles, majnAPIWithoutAuth } from "@state/API/global-api";

export const addBrand = createAsyncThunk(
  "distributorSlice/addBrand",
  async ({ brandId, authorization_doc, identity_doc }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnaFiles.post(
        `api/brands/${brandId}/applications`,
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
export const fetchBrands = createAsyncThunk(
  "distributorSlice/fetchBrands",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPIWithoutAuth.get(
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
      const res = await majnAPIWithoutAuth.get("api/locations/governorates");
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
export const deleteStore = createAsyncThunk(
  "distributorSlice/deleteStore",
  async ({ Uid, storeId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.delete(
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
export const getSubCategory = createAsyncThunk(
  "distributorSlice/getSubCategory",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPIWithoutAuth.get(`api/sub-categories`);
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
export const getCategories = createAsyncThunk(
  "distributorSlice/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPIWithoutAuth.get(`api/categories`);
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
export const addProduct = createAsyncThunk(
  "distributorSlice/addProduct",
  async (productData, thunkAPI) => {
    console.log({ ...productData });
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnaFiles.post(`api/products/`, productData);
      console.log("from slice res is for add product");
      console.log(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      } else if (error.response && error.response.status === 500) {
        console.log(error.message);
      }
      return rejectWithValue(error);
    }
  }
);
export const getUploadedProducts = createAsyncThunk(
  "distributorSlice/getUploadedProducts",
  async ({ distributorId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.get(
        `api/distributors/${distributorId}/products`
      );
      console.log("from slice res is for add product");
      console.log(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      } else if (error.response && error.response.status === 500) {
        console.log(error.message);
      }
      return rejectWithValue(error);
    }
  }
);
export const updateUploadedProduct = createAsyncThunk(
  "distributorSlice/updateUploadedProduct",
  async ({ distributorId, productId, ...productData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.patch(
        `api/distributors/${distributorId}/products/${productId}`,
        productData
      );
      console.log("from slice res is for add product");
      console.log(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      } else if (error.response && error.response.status === 500) {
        console.log(error.message);
      }
      return rejectWithValue(error);
    }
  }
);
export const deleteUploadedProduct = createAsyncThunk(
  "distributorSlice/deleteUploadedProduct",
  async ({ distributorId, productId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await majnAPI.delete(
        `api/distributors/${distributorId}/products/${productId}`
      );
      console.log("from slice res is for add product");
      console.log(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      } else if (error.response && error.response.status === 500) {
        console.log(error.message);
      }
      return rejectWithValue(error);
    }
  }
);
