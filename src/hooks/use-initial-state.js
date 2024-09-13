function UseInitialStates() {
  const initialStateMode = {
    // mymode: localStorage.getItem("mymode") === "true" ? "dark" : "light",
    mymode: "light",
  };
  const initialStateActiveLinks = {
    activeLink: sessionStorage.getItem("activeLink") || "",
    // mymode: null,
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
    loadingLogOut: false,
  };

  const initialStateDistributor = {
    brands: [],
    loadingAddBrand: false,
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
    loadingEditStore: false,
    loadingSubCategory: false,
    loadingCategories: false,
    categories: [],
    subCategories: [],
    loadingAddProduct: false,
    loadingGetUploadedProducts: false,
    loadingDeleteProduct: false,
    uploadedProducts: [],
    countOfUploadedProducts: 0,
    loadingUpdateProduct: false,
    loadingDeleteStore: false,
    countOfStores: 0,
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
  const initialStateProducts = {
    countOfProducts: 0,
    productsArray: [],
    loadingProducts: false,
  };
  const initialStateCart = {
    cartItems: [],
    cartArr: [],
    loadingEditCartQuantity: false,
    cartQuantity: null,
    loadingCarts: false,
    countOfCartItems: localStorage.getItem("countOfCartItem"),
    cartItem: null,
    loadingCart: false,
    loadingPostCart: false,
    loadingAddtoFavorite: false,
    loadingGetFavorites: false,
    countOfFavoritesProducts: null,
    loadingSpecificProduct: false,
    loadingDeleteCart: false,
    loadingDeleteFavorite: false,
  };
  const initialStateSearch = {
    searchChange: localStorage.getItem("searchChange") || "", // Should retrieve correctly
    searchValue: localStorage.getItem("searchValue") || "",
  };
  const initialStatePage = {
    page: localStorage.getItem("page") || "", // Should retrieve correctly
  };
  const initialStateCustomer = {
    loadingGetAddresses: false,
    loadingAddAddress: false,
    loadingGetSpecificAddress: false,
    loadingEditAddress: false,
    singleAddressData: null,
    addresses: null,
    countOfAddresses: 0,
    loadingAddOrder: false,
    loadingDeleteAddress: false,
    loadingGetOrders: false,
    allOrders: [],
    clientSecret: null,
  };
  const initialStateDelivery = {
    loadingOrdersDelivery: false,
    ordersDelivery: [],
    loadingSpecificOrderData: false,
    specificOrderData: null,
    loadingUpdateOrderStatus: false,
  };

  return {
    initialStateMode,
    initialStateAuth,
    initialStateDistributor,
    initialStateReviewer,
    initialStateActiveLinks,
    initialStateProducts,
    initialStateCart,
    initialStateSearch,
    initialStateCustomer,
    initialStatePage,
    initialStateDelivery,
  };
}

export default UseInitialStates;
