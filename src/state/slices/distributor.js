import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import {
  addBrand,
  fetchPrands,
  fetchGovernance,
  getAllBrandsApplication,
  getAtuthorizedBrands,
  addStore,
  editStore,
  getStores,
  getStore,
  addProduct,
  getCategories,
  getSubCategory,
} from "@state/act/actDistributor";

const { initialStateDistributor } = UseInitialStates();

export const distributorSlice = createSlice({
  name: "distributorSlice",
  initialState: initialStateDistributor,
  reducers: {
    cleanUpBrands: (state) => {
      state.brands = [];
    },
    cleanUpGovernance: (state) => {
      state.governance = [];
    },
    cleanUpBrandsApplication: (state) => {
      state.distributorBrands = [];
    },
    cleanUpAuthorizedBrands: (state) => {
      state.approvedBrands = [];
    },
    cleanUpStores: (state) => {
      state.stores = [];
    },
    cleanUpCategories: (state) => {
      state.categories = [];
    },
    cleanUpSubCategories: (state) => {
      state.subCategories = [];
    },
  },
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
        state.loadingAddBrand = true;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
      })
      .addCase(getAllBrandsApplication.pending, (state, action) => {
        // state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingDistributorApplications = true;
      })
      .addCase(getAllBrandsApplication.fulfilled, (state, action) => {
        // state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.distributorBrands = action.payload;
        // state.BrandAppLink = action.payload._links.self;
        console.log(action.payload);
        state.loadingDistributorApplications = false;
      })
      .addCase(getAtuthorizedBrands.rejected, (state, action) => {
        // state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingDistributorApplications = false;
      })
      .addCase(getAtuthorizedBrands.pending, (state, action) => {
        // state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingAuthorized = true;
      })
      .addCase(getAtuthorizedBrands.fulfilled, (state, action) => {
        // state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.approvedBrands = action.payload;
        // state.BrandAppLink = action.payload._links.self;
        console.log(action.payload);
        state.loadingAuthorized = false;
      })
      .addCase(getAllBrandsApplication.rejected, (state, action) => {
        // state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingAuthorized = false;
      })
      .addCase(addStore.pending, (state, action) => {
        // state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingStore = true;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        // state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        // state.approvedBrands = action.payload;
        // state.BrandAppLink = action.payload._links.self;
        console.log(action.payload);
        state.loadingStore = false;
      })
      .addCase(addStore.rejected, (state, action) => {
        // state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingStore = false;
      })
      .addCase(fetchGovernance.pending, (state, action) => {
        // state.loadingAddBrand = false;
        // state.error = action.payload;
        // state.loading = false;
        // state.Uid = null;
        state.loadingGovernaces = true;
      })
      .addCase(fetchGovernance.fulfilled, (state, action) => {
        // state.loadingAddBrand = false;
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
        // state.loadingAddBrand = false;
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
      .addCase(getSubCategory.pending, (state, action) => {
        state.loadingSubCategory = true;
      })
      .addCase(getSubCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.subCategories = action.payload.sub_categories;
        state.loadingSubCategory = false;
      })
      .addCase(getSubCategory.rejected, (state, action) => {
        state.loadingSubCategory = false;
      })
      .addCase(getCategories.pending, (state, action) => {
        state.loadingCategories = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        console.log(action.payload);
        state.categories = action.payload.categories;
        state.loadingCategories = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loadingCategories = false;
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
        state.loadingAddProduct = false;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.loadingAddProduct = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadingAddProduct = false;
        // localStorage.setItem(storeId,action.payload.)
        // state.storeId=localStorage.getItem("storeId")
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loadingEdit = false;
      })
  },
});

export default distributorSlice.reducer;
export const {
  cleanUpBrands,
  cleanUpGovernance,
  cleanUpBrandsApplication,
  cleanUpAuthorizedBrands,
  cleanUpStores,
  cleanUpCategories,
  cleanUpSubCategories,
} = distributorSlice.actions;
export {
  addBrand,
  fetchPrands,
  fetchGovernance,
  getAllBrandsApplication,
  getAtuthorizedBrands,
  addStore,
  editStore,
  getStores,
  getStore,
  addProduct,
  getCategories,
  getSubCategory,
};
