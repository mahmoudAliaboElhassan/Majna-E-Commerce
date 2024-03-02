function UseInitialValues() {
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
    INITIAL_FORM_STATE_ADD_PRODUCT,
  };
}

export default UseInitialValues;
