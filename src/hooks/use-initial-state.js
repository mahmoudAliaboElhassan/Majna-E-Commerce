function UseInitialStates() {
  const initialStateMode = {
    mymode: localStorage.getItem("mymode") === "true" ? "dark" : "light",
  };

  const initialStateAuth = {
    myJob: "",
    loading: false,
    error: false,
    token: localStorage.getItem("token"),
    username: null,
    email: null,
    Uid: localStorage.getItem("userId"),
    role: localStorage.getItem("role"),
    expireToken: localStorage.getItem("expired"),
  };

  const initialStateDistributor = {
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
    loadingEdit:false
  };

  const initialStateReviewer = {
    allBrans: [],
    authorizationDocument: null,
    identityDocument: null,
    loadingReviewer: false,
    brandName: null,
    statusMessage: null,
    loadingStatus: false,
    loadingSpecificBrand: false,
    countOfBrands: 0,
  };

  return {
    initialStateMode,
    initialStateAuth,
    initialStateDistributor,
    initialStateReviewer,
  };
}

export default UseInitialStates;
