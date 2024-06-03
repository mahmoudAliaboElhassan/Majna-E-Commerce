"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function UseInitialStates() {
  var initialStateMode = {
    // mymode: localStorage.getItem("mymode") === "true" ? "dark" : "light",
    mymode: "light"
  };
  var initialStateActiveLinks = {
    activeLink: localStorage.getItem("activeLink") // mymode: null,

  };
  var initialStateAuth = {
    myJob: "",
    loading: false,
    error: false,
    token: localStorage.getItem("token"),
    username: null,
    email: null,
    Uid: localStorage.getItem("userId"),
    role: localStorage.getItem("role"),
    expireToken: localStorage.getItem("expired")
  };
  var initialStateDistributor = {
    brands: [],
    loadingProducts: false,
    loadingFetch: false,
    distributorBrands: [],
    approvedBrands: [],
    loadingDistributorApplications: false,
    loadingAuthorized: false,
    countofBrandsApplication: 0,
    loadingStore: false,
    loadingGovernaces: false,
    governance: [],
    loadingStores: false,
    stores: [],
    singleStoreData: null,
    loadingSingleStoreData: false,
    loadingEdit: false,
    loadingSubCategory: false,
    loadingCategories: false,
    categories: [],
    subCategories: []
  };
  var initialStateReviewer = {
    allBrans: [],
    authorizationDocument: null,
    identityDocument: null,
    loadingReviewer: false,
    brandName: null,
    statusMessage: null,
    loadingStatus: false,
    loadingSpecificBrand: false,
    countOfBrands: 0
  };
  return {
    initialStateMode: initialStateMode,
    initialStateAuth: initialStateAuth,
    initialStateDistributor: initialStateDistributor,
    initialStateReviewer: initialStateReviewer,
    initialStateActiveLinks: initialStateActiveLinks
  };
}

var _default = UseInitialStates;
exports["default"] = _default;