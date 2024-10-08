import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import {
  addBrand,
  fetchBrands,
  fetchGovernance,
  getAllBrandsApplication,
  getAtuthorizedBrands,
  addStore,
  editStore,
  getStores,
  getStore,
  deleteStore,
  addProduct,
  getCategories,
  getSubCategory,
  getUploadedProducts,
  updateUploadedProduct,
  deleteUploadedProduct,
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
    cleanUpGetStore: (state) => {
      state.singleStoreData = null;
    },
    cleanUpCategories: (state) => {
      state.categories = [];
    },
    cleanUpSubCategories: (state) => {
      state.subCategories = [];
    },
    cleanUpUploadedProducts: (state) => {
      state.uploadedProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state, action) => {
        state.loadingFetch = true;
        // state.error = false;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        // state.loading = false;
        // state.error = false;
        state.loadingFetch = false;

        state.brands = action.payload.brands;
        console.log(state.brands);
      })
      .addCase(fetchBrands.rejected, (state, action) => {
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
      .addCase(getAllBrandsApplication.rejected, (state, action) => {
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
      .addCase(getAtuthorizedBrands.rejected, (state, action) => {
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
        state.countOfStores = action.payload.stores.length;
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
        state.loadingEditStore = true;
      })
      .addCase(editStore.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadingEditStore = false;
        // localStorage.setItem(storeId,action.payload.)
        // state.storeId=localStorage.getItem("storeId")
      })
      .addCase(editStore.rejected, (state, action) => {
        state.loadingEditStore = false;
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
        state.loadingAddProduct = false;
      })
      .addCase(getUploadedProducts.pending, (state, action) => {
        state.loadingGetUploadedProducts = true;
      })
      .addCase(getUploadedProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadingGetUploadedProducts = false;
        state.uploadedProducts = action.payload.results;
        state.countOfUploadedProducts = action.payload.results.length;
      })
      .addCase(getUploadedProducts.rejected, (state, action) => {
        state.loadingGetUploadedProducts = false;
      })
      .addCase(deleteUploadedProduct.pending, (state, action) => {
        state.loadingDeleteProduct = true;
      })
      .addCase(deleteUploadedProduct.fulfilled, (state, action) => {
        state.countOfUploadedProducts--;
        state.loadingDeleteProduct = false;
      })
      .addCase(deleteUploadedProduct.rejected, (state, action) => {
        state.loadingDeleteProduct = false;
      })

      .addCase(updateUploadedProduct.pending, (state, action) => {
        state.loadingUpdateProduct = true;
      })
      .addCase(updateUploadedProduct.fulfilled, (state, action) => {
        state.loadingUpdateProduct = false;
      })
      .addCase(updateUploadedProduct.rejected, (state, action) => {
        state.loadingUpdateProduct = false;
      })
      .addCase(deleteStore.pending, (state, action) => {
        state.loadingDeleteStore = true;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.countOfStores -= 1;
        state.loadingDeleteStore = false;
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.loadingDeleteStore = false;
      });
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
  cleanUpUploadedProducts,
  cleanUpGetStore,
} = distributorSlice.actions;
export {
  addBrand,
  fetchBrands,
  fetchGovernance,
  getAllBrandsApplication,
  getAtuthorizedBrands,
  addStore,
  editStore,
  getStores,
  getStore,
  deleteStore,
  addProduct,
  getCategories,
  getSubCategory,
  getUploadedProducts,
  updateUploadedProduct,
  deleteUploadedProduct,
};
