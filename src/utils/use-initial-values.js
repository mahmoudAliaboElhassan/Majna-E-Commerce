function UseInitialValues(props) {
  console.log(props?.city);

  const INITIAL_FORM_STATE_Login = {
    email: "",
    password: "",
  };
  const INITIAL_FORM_STATE_SignUp = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    termsOfService: null,
  };
  const INITIAL_FORM_STATE_CHANGE_PASSWORD = {
    currentPassword: "",
    newPassword: "",
    confirm_newPassword: null,
  };
  const INITIAL_FORM_STATE_FORGET_PASSWORD = {
    email: "",
  };
  const INITIAL_FORM_STATE_RESET_PASSWORD = {
    password: "",
  };
  const INITIAL_FORM_STATE_ADD_BRAND = {
    productType: "",
    IdDistributor: null,
    authorizeDocument: null,
  };
  const INITIAL_FORM_STATE_ADD_STORE = {
    storeName: null,
    storeAddress: null,
    storeCity: null,
  };
  const INITIAL_FORM_STATE_EDIT_STORE = {
    // singleStoreName: singleStoreData.name,
    // singleStoreAddress: singleStoreData.address,
    singleStoreName: props?.name,
    singleStoreAddress: props?.address,
    singleStoreCity: props?.city_id,
  };
  const INITIAL_FORM_STATE_ADD_PRODUCT = {
    StoresAndQuantities: [{}],
  };
  return {
    INITIAL_FORM_STATE_Login,
    INITIAL_FORM_STATE_SignUp,
    INITIAL_FORM_STATE_CHANGE_PASSWORD,
    INITIAL_FORM_STATE_FORGET_PASSWORD,
    INITIAL_FORM_STATE_RESET_PASSWORD,
    INITIAL_FORM_STATE_ADD_BRAND,
    INITIAL_FORM_STATE_EDIT_STORE,
    INITIAL_FORM_STATE_ADD_STORE,
    INITIAL_FORM_STATE_ADD_PRODUCT,
  };
}

export default UseInitialValues;
