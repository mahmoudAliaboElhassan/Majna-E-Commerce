"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "addBrand", {
  enumerable: true,
  get: function get() {
    return _actDistributor.addBrand;
  }
});
Object.defineProperty(exports, "fetchPrands", {
  enumerable: true,
  get: function get() {
    return _actDistributor.fetchPrands;
  }
});
Object.defineProperty(exports, "fetchGovernance", {
  enumerable: true,
  get: function get() {
    return _actDistributor.fetchGovernance;
  }
});
Object.defineProperty(exports, "getAllBrandsApplication", {
  enumerable: true,
  get: function get() {
    return _actDistributor.getAllBrandsApplication;
  }
});
Object.defineProperty(exports, "getAtuthorizedBrands", {
  enumerable: true,
  get: function get() {
    return _actDistributor.getAtuthorizedBrands;
  }
});
Object.defineProperty(exports, "addStore", {
  enumerable: true,
  get: function get() {
    return _actDistributor.addStore;
  }
});
Object.defineProperty(exports, "editStore", {
  enumerable: true,
  get: function get() {
    return _actDistributor.editStore;
  }
});
Object.defineProperty(exports, "getStores", {
  enumerable: true,
  get: function get() {
    return _actDistributor.getStores;
  }
});
Object.defineProperty(exports, "getStore", {
  enumerable: true,
  get: function get() {
    return _actDistributor.getStore;
  }
});
Object.defineProperty(exports, "addProduct", {
  enumerable: true,
  get: function get() {
    return _actDistributor.addProduct;
  }
});
Object.defineProperty(exports, "getCategories", {
  enumerable: true,
  get: function get() {
    return _actDistributor.getCategories;
  }
});
Object.defineProperty(exports, "getSubCategory", {
  enumerable: true,
  get: function get() {
    return _actDistributor.getSubCategory;
  }
});
exports.cleanUpSubCategories = exports.cleanUpCategories = exports.cleanUpStores = exports.cleanUpAuthorizedBrands = exports.cleanUpBrandsApplication = exports.cleanUpGovernance = exports.cleanUpBrands = exports["default"] = exports.distributorSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _useInitialState = _interopRequireDefault(require("@hooks/use-initial-state"));

var _actDistributor = require("@state/act/actDistributor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _UseInitialStates = (0, _useInitialState["default"])(),
    initialStateDistributor = _UseInitialStates.initialStateDistributor;

var distributorSlice = (0, _toolkit.createSlice)({
  name: "distributorSlice",
  initialState: initialStateDistributor,
  reducers: {
    cleanUpBrands: function cleanUpBrands(state) {
      state.brands = [];
    },
    cleanUpGovernance: function cleanUpGovernance(state) {
      state.governance = [];
    },
    cleanUpBrandsApplication: function cleanUpBrandsApplication(state) {
      state.distributorBrands = [];
    },
    cleanUpAuthorizedBrands: function cleanUpAuthorizedBrands(state) {
      state.approvedBrands = [];
    },
    cleanUpStores: function cleanUpStores(state) {
      state.stores = [];
    },
    cleanUpCategories: function cleanUpCategories(state) {
      state.categories = [];
    },
    cleanUpSubCategories: function cleanUpSubCategories(state) {
      state.subCategories = [];
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(_actDistributor.fetchPrands.pending, function (state, action) {
      state.loadingFetch = true; // state.error = false;
    }).addCase(_actDistributor.fetchPrands.fulfilled, function (state, action) {
      // state.loading = false;
      // state.error = false;
      state.loadingFetch = false;
      state.brands = action.payload.brands;
      console.log(state.brands);
    }).addCase(_actDistributor.fetchPrands.rejected, function (state, action) {
      state.loadingFetch = false; // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
    }).addCase(_actDistributor.addBrand.pending, function (state, action) {
      state.loadingProducts = true; // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
    }).addCase(_actDistributor.addBrand.fulfilled, function (state, action) {
      state.loadingProducts = false; // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
    }).addCase(_actDistributor.addBrand.rejected, function (state, action) {
      state.loadingProducts = false; // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
    }).addCase(_actDistributor.getAllBrandsApplication.pending, function (state, action) {
      // state.loadingProducts = false;
      // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
      state.loadingDistributorApplications = true;
    }).addCase(_actDistributor.getAllBrandsApplication.fulfilled, function (state, action) {
      // state.loadingProducts = false;
      // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
      state.distributorBrands = action.payload; // state.BrandAppLink = action.payload._links.self;

      console.log(action.payload);
      state.loadingDistributorApplications = false;
    }).addCase(_actDistributor.getAtuthorizedBrands.rejected, function (state, action) {// state.loadingProducts = false;
      // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
      // state.loadingDistributorApplications = false;
    }).addCase(_actDistributor.getAtuthorizedBrands.pending, function (state, action) {
      // state.loadingProducts = false;
      // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
      state.loadingAuthorized = true;
    }).addCase(_actDistributor.getAtuthorizedBrands.fulfilled, function (state, action) {
      // state.loadingProducts = false;
      // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
      state.approvedBrands = action.payload; // state.BrandAppLink = action.payload._links.self;

      console.log(action.payload);
      state.loadingAuthorized = false;
    }).addCase(_actDistributor.getAllBrandsApplication.rejected, function (state, action) {
      // state.loadingProducts = false;
      // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
      state.loadingAuthorized = false;
    }).addCase(_actDistributor.addStore.pending, function (state, action) {
      // state.loadingProducts = false;
      // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
      state.loadingStore = true;
    }).addCase(_actDistributor.addStore.fulfilled, function (state, action) {
      // state.loadingProducts = false;
      // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
      // state.approvedBrands = action.payload;
      // state.BrandAppLink = action.payload._links.self;
      console.log(action.payload);
      state.loadingStore = false;
    }).addCase(_actDistributor.addStore.rejected, function (state, action) {
      // state.loadingProducts = false;
      // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
      state.loadingStore = false;
    }).addCase(_actDistributor.fetchGovernance.pending, function (state, action) {
      // state.loadingProducts = false;
      // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
      state.loadingGovernaces = true;
    }).addCase(_actDistributor.fetchGovernance.fulfilled, function (state, action) {
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
    }).addCase(_actDistributor.fetchGovernance.rejected, function (state, action) {
      // state.loadingProducts = false;
      // state.error = action.payload;
      // state.loading = false;
      // state.Uid = null;
      state.loadingGovernaces = false;
    }).addCase(_actDistributor.getStores.pending, function (state, action) {
      state.loadingStores = true;
    }).addCase(_actDistributor.getStores.fulfilled, function (state, action) {
      console.log(action.payload);
      state.stores = action.payload.stores;
      state.loadingStores = false;
    }).addCase(_actDistributor.getStores.rejected, function (state, action) {
      state.loadingStores = false;
    }).addCase(_actDistributor.getSubCategory.pending, function (state, action) {
      state.loadingSubCategory = true;
    }).addCase(_actDistributor.getSubCategory.fulfilled, function (state, action) {
      console.log(action.payload);
      state.subCategories = action.payload.sub_categories;
      state.loadingSubCategory = false;
    }).addCase(_actDistributor.getSubCategory.rejected, function (state, action) {
      state.loadingSubCategory = false;
    }).addCase(_actDistributor.getCategories.pending, function (state, action) {
      state.loadingCategories = true;
    }).addCase(_actDistributor.getCategories.fulfilled, function (state, action) {
      console.log(action.payload);
      state.categories = action.payload.categories;
      state.loadingCategories = false;
    }).addCase(_actDistributor.getCategories.rejected, function (state, action) {
      state.loadingCategories = false;
    }).addCase(_actDistributor.getStore.pending, function (state, action) {
      state.loadingSingleStoreData = true;
    }).addCase(_actDistributor.getStore.fulfilled, function (state, action) {
      console.log(action.payload);
      state.singleStoreData = action.payload;
      state.loadingSingleStoreData = false; // localStorage.setItem(storeId,action.payload.)
      // state.storeId=localStorage.getItem("storeId")
    }).addCase(_actDistributor.getStore.rejected, function (state, action) {
      state.loadingSingleStoreData = false;
    }).addCase(_actDistributor.editStore.pending, function (state, action) {
      state.loadingEdit = true;
    }).addCase(_actDistributor.editStore.fulfilled, function (state, action) {
      console.log(action.payload);
      state.loadingEdit = false; // localStorage.setItem(storeId,action.payload.)
      // state.storeId=localStorage.getItem("storeId")
    }).addCase(_actDistributor.editStore.rejected, function (state, action) {
      state.loadingEdit = false;
    });
  }
});
exports.distributorSlice = distributorSlice;
var _default = distributorSlice.reducer;
exports["default"] = _default;
var _distributorSlice$act = distributorSlice.actions,
    cleanUpBrands = _distributorSlice$act.cleanUpBrands,
    cleanUpGovernance = _distributorSlice$act.cleanUpGovernance,
    cleanUpBrandsApplication = _distributorSlice$act.cleanUpBrandsApplication,
    cleanUpAuthorizedBrands = _distributorSlice$act.cleanUpAuthorizedBrands,
    cleanUpStores = _distributorSlice$act.cleanUpStores,
    cleanUpCategories = _distributorSlice$act.cleanUpCategories,
    cleanUpSubCategories = _distributorSlice$act.cleanUpSubCategories;
exports.cleanUpSubCategories = cleanUpSubCategories;
exports.cleanUpCategories = cleanUpCategories;
exports.cleanUpStores = cleanUpStores;
exports.cleanUpAuthorizedBrands = cleanUpAuthorizedBrands;
exports.cleanUpBrandsApplication = cleanUpBrandsApplication;
exports.cleanUpGovernance = cleanUpGovernance;
exports.cleanUpBrands = cleanUpBrands;