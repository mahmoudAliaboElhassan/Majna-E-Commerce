function UseInitialValues(props) {
  console.log(props?.city);
  console.log(props?.multiple);
  console.log("props?.multiple");
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
    productType: null,
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
    inventory: [{ store_pk: null, quantity: null }],
    album: [{ image: null, is_cover: "False" }],
    name: null,
    brand_pk: null,
    price: null,
    description: null,
    categories: null,
    sub_category_pk: null,
  };
  const INITIAL_FORM_STATE_PRICES = {
    priceFrom: localStorage.getItem("priceFrom"),
    priceTo: localStorage.getItem("priceTo"),
  };
  const INITIAL_FORM_STATE_CONTACT = {
    yourName: "",
    yourEmail: "",
    yourSubject: "",
    yourMessage: "",
    userRole: "",
  };
  const INITIAL_FORM_STATE_MULTIPLE = {
    multiple: props?.multiple,
  };
  const INITIAL_FORM_STATE_EDIT_PRODUCT = {
    singleProductName: props?.name,
    // singleProductInventory: [{ store_pk: null, quantity: null }],
    // album: [{ image: null, is_cover: "False" }],
    singleProductPrice: props?.price,
    singleProductDescription: props?.description,
    singleProductInventory: props?.inventory?.stores,
  };
  const INITIAL_FORM_STATE_ADD_ADDRESS = {
    city: null,
    address: null,
  };
  const INITIAL_FORM_STATE_Edit_ADDRESS = {
    singleAddressCity: props?.city_id,
    singleAddress: props?.address,
  };
  const INITIAL_FORM_STATE_ADD_ORDER = {
    pickup_address_id: null,
    order_items: [
      {
        product_id: null,
        quantity: null,
      },
    ],
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
    INITIAL_FORM_STATE_PRICES,
    INITIAL_FORM_STATE_CONTACT,
    INITIAL_FORM_STATE_MULTIPLE,
    INITIAL_FORM_STATE_EDIT_PRODUCT,
    INITIAL_FORM_STATE_ADD_ADDRESS,
    INITIAL_FORM_STATE_Edit_ADDRESS,
    INITIAL_FORM_STATE_ADD_ORDER,
  };
}

export default UseInitialValues;
// "{"inventory":[{"store_pk":1,"quantity":"44"}],"album":[{"image":"image-0","is_cover":"True"},{"image":"image-1","is_cover":"False"},{"image":"image-2","is_cover":"False"}],"title":"aaaaaaa","brand_pk":1,"price":44,"description":"dddddddddddddddddddddd","sub_category_pk":1,"image-0":{},"image-1":{},"image-2":{}}"
