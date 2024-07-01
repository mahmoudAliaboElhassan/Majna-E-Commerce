"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactI18next = require("react-i18next");

var Yup = _interopRequireWildcard(require("yup"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function UseFormValidation() {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var FORM_VALIDATION_SCHEMA_Login = Yup.object().shape({
    email: Yup.string().email("Enter a Valid Email").required(t("required_email")).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email Should be Valid Email"),
    // lastName: Yup.string().required("required"),
    password: Yup.string().required("Password Field is required").matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "Password must contain at least one letter and one number").min(6, "Minimum Number of Chars is 6") // Phone: Yup.number()
    //   .integer()
    //   .typeError("please enter a valid phone number")
    //   .required("Required"),
    // languages: Yup.string().required("required"),
    // arriveDate: Yup.date().required("Required"),
    // DepDate: Yup.date().required("Requeired"),

  });
  var FORM_VALIDATION_SCHEMA_SignUp = Yup.object().shape({
    username: Yup.string("User Name Should be of Chars Only").max(20, "Maximum Number Of Characters is twenty").required("User Name Field is Required"),
    email: Yup.string().email("Enter a Valid Email").required("Email Field is required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email Should be Valid Email"),
    password: Yup.string().required("Password Field is required").min(6, "Minimum Number of Chars is 6").matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "Password must contain at least one letter and one number"),
    confirm_password: Yup.string().required("Please re-type your password") // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of passwrod.
    .oneOf([(0, Yup.ref)("password")], "Passwords does not match"),
    //   Phone: Yup.number()
    //     .integer()
    //     .typeError("please enter a valid phone number")
    //     .required("Required"),
    //   languages: Yup.string().required("required"),
    //   arriveDate: Yup.date().required("Required"),
    //   DepDate: Yup.date().required("Requeired"),
    termsOfService: Yup["boolean"]().oneOf([true], "The terms and conditions must be accepted.")
  });
  var FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD = Yup.object().shape({
    currentPassword: Yup.string().required("Password Field is required").min(6, "Minimum Number of Chars is 6").matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "Password must contain at least one letter and one number"),
    newPassword: Yup.string().required("Password Field is required").min(6, "Minimum Number of Chars is 6").matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "Password must contain at least one letter and one number"),
    confirm_newPassword: Yup.string().required("Please re-type your New password") // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of passwrod.
    .oneOf([(0, Yup.ref)("newPassword")], "Passwords does not match")
  });
  var FORM_VALIDATION_SCHEMA_FORGET_PASSWORD = Yup.object().shape({
    email: Yup.string().email("Enter a Valid Email").required("Email Field is required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email Should be Valid Email")
  });
  var FORM_VALIDATION_SCHEMA_RESET_PASSWORD = Yup.object().shape({
    password: Yup.string().required("Password Field is required").min(6, "Minimum Number of Chars is 6").matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "Password must contain at least one letter and one number")
  });
  var FORM_VALIDATION_SCHEMA_Add_BRAND = Yup.object().shape({
    productType: Yup.string().required("Product Type is Required"),
    IdDistributor: Yup.mixed().required("Id of the User is required").test("fileFormat", "Only PDF files are allowed", function (value) {
      if (value) {
        var supportedFormats = ["pdf"];
        return supportedFormats.includes(value.name.split(".").pop());
      }

      return true;
    }).test("fileSize", "File size must not be more than 10MB", function (value) {
      if (value) {
        return value.size <= 10485760; // 10MB in bytes
      }

      return true;
    }),
    authorizeDocument: Yup.mixed().required("Authorize Document is required").test("notEqualFileName", "Authorize Document file name must be different from IdDistributor file name", function (value, _ref) {
      var parent = _ref.parent;
      var IdDistributor = parent.IdDistributor;

      if (value && IdDistributor) {
        var idDistributorFileName = IdDistributor.name;
        var authorizeDocumentFileName = value.name;
        return idDistributorFileName !== authorizeDocumentFileName;
      }

      return true;
    }).test("fileFormat", "Only PDF files are allowed", function (value) {
      if (value) {
        var supportedFormats = ["pdf"];
        return supportedFormats.includes(value.name.split(".").pop());
      }

      return true;
    }).test("fileSize", "File size must not be more than 10MB", function (value) {
      if (value) {
        return value.size <= 10485760; // 10MB in bytes
      }

      return true;
    })
  });
  var FORM_VALIDATION_SCHEMA_Add_STORE = Yup.object().shape({
    storeName: Yup.string().required("Store Name is Required"),
    storeCity: Yup.string().required("Store City is Required"),
    storeAddress: Yup.string().required("Full Address of the Store is Required")
  });
  var FORM_VALIDATION_SCHEMA_EDIT_STORE = Yup.object().shape({
    singleStoreName: Yup.string().required("Store Name is Required"),
    singleStoreAddress: Yup.string().required("Store City is Required"),
    singleStoreCity: Yup.string().required("Full Address of the Store is Required")
  });
  var FORM_VALIDATION_SCHEMA_Add_PRODUCT = Yup.object().shape({
    brand_pk: Yup.string().required("Product Brand is Required"),
    title: Yup.string().required("Product Title is Required"),
    price: Yup.number("Price Should be Number").required("Product Price is Required ").min(1, "Price can not be zero or negative"),
    sub_category_pk: Yup.string().required("Product SubCategory is Required"),
    categories: Yup.string().required("Product Category is Required"),
    description: Yup.string().required("Product Description is Required"),
    inventory: Yup.array().of(Yup.object().shape({
      store_pk: Yup.string().required("Required Store Name"),
      quantity: Yup.string().required("Required quantity")
    })),
    album: Yup.array().of(Yup.object().shape({
      image: Yup.mixed().required("Image is required"),
      // .test(
      //   "fileFormat",
      //   "Only PNG and JPG files are allowed",
      //   (value) => {
      //     if (value) {
      //       const supportedFormats = ["png", "jpg"];
      //       const fileExtension = value.name
      //         .split(".")
      //         .pop()
      //         .toLowerCase();
      //       return supportedFormats.includes(fileExtension);
      //     }
      //     return true;
      //   }
      // )
      is_cover: Yup.string().required("isCover is required")
    })).test("atLeastOneCover", "At least one image must be marked as cover", function (value) {
      var atLeastOneCover = value.some(function (image) {
        return image.is_cover === "True";
      });
      return atLeastOneCover;
    }).max(3, "You can select only up to three images .")
  });
  var FORM_VALIDATION_SCHEMA_Prices = Yup.object().shape({
    priceFrom: Yup.number("Price From should be a number").required("Price From is required").min(0, "Price From cannot be negative"),
    priceTo: Yup.number("Price To should be a number").required("Price To is required").min(Yup.ref('priceFrom'), "Price To must be greater than Price From").test("is-greater", "Price To must be greater than Price From by at least 1", function (value) {
      var priceFrom = this.parent.priceFrom;
      return value > priceFrom;
    })
  });
  return {
    FORM_VALIDATION_SCHEMA_SignUp: FORM_VALIDATION_SCHEMA_SignUp,
    FORM_VALIDATION_SCHEMA_Login: FORM_VALIDATION_SCHEMA_Login,
    FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD: FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD,
    FORM_VALIDATION_SCHEMA_FORGET_PASSWORD: FORM_VALIDATION_SCHEMA_FORGET_PASSWORD,
    FORM_VALIDATION_SCHEMA_RESET_PASSWORD: FORM_VALIDATION_SCHEMA_RESET_PASSWORD,
    FORM_VALIDATION_SCHEMA_Add_BRAND: FORM_VALIDATION_SCHEMA_Add_BRAND,
    FORM_VALIDATION_SCHEMA_Add_STORE: FORM_VALIDATION_SCHEMA_Add_STORE,
    FORM_VALIDATION_SCHEMA_EDIT_STORE: FORM_VALIDATION_SCHEMA_EDIT_STORE,
    FORM_VALIDATION_SCHEMA_Add_PRODUCT: FORM_VALIDATION_SCHEMA_Add_PRODUCT,
    FORM_VALIDATION_SCHEMA_PRICES: FORM_VALIDATION_SCHEMA_PRICES
  };
}

var _default = UseFormValidation;
exports["default"] = _default;