import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { ref } from "yup";

function UseFormValidation() {
  const { t } = useTranslation();

  const FORM_VALIDATION_SCHEMA_Login = Yup.object().shape({
    email: Yup.string()
      .email("Enter a Valid Email")
      .required(t("required_email"))
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email Should be Valid Email"),

    // lastName: Yup.string().required("required"),
    password: Yup.string()
      .required("Password Field is required")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        "Password must contain at least one letter and one number"
      )
      .min(6, "Minimum Number of Chars is 6"),
    // Phone: Yup.number()
    //   .integer()
    //   .typeError("please enter a valid phone number")
    //   .required("Required"),
    // languages: Yup.string().required("required"),
    // arriveDate: Yup.date().required("Required"),
    // DepDate: Yup.date().required("Requeired"),
  });

  const FORM_VALIDATION_SCHEMA_SignUp = Yup.object().shape({
    username: Yup.string("User Name Should be of Chars Only")
      .max(20, "Maximum Number Of Characters is twenty")
      .required("User Name Field is Required"),

    email: Yup.string()
      .email("Enter a Valid Email")
      .required("Email Field is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email Should be Valid Email"),

    password: Yup.string()
      .required("Password Field is required")
      .min(6, "Minimum Number of Chars is 6")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        "Password must contain at least one letter and one number"
      ),

    confirm_password: Yup.string()
      .required("Please re-type your password")
      // use oneOf to match one of the values inside the array.
      // use "ref" to get the value of passwrod.
      .oneOf([ref("password")], "Passwords does not match"),
    //   Phone: Yup.number()
    //     .integer()
    //     .typeError("please enter a valid phone number")
    //     .required("Required"),
    //   languages: Yup.string().required("required"),
    //   arriveDate: Yup.date().required("Required"),
    //   DepDate: Yup.date().required("Requeired"),
    termsOfService: Yup.boolean().oneOf(
      [true],
      "The terms and conditions must be accepted."
    ),
  });

  const FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD = Yup.object().shape({
    currentPassword: Yup.string()
      .required("Password Field is required")
      .min(6, "Minimum Number of Chars is 6")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        "Password must contain at least one letter and one number"
      ),

    newPassword: Yup.string()
      .required("Password Field is required")
      .min(6, "Minimum Number of Chars is 6")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        "Password must contain at least one letter and one number"
      ),

    confirm_newPassword: Yup.string()
      .required("Please re-type your New password")
      // use oneOf to match one of the values inside the array.
      // use "ref" to get the value of passwrod.
      .oneOf([ref("newPassword")], "Passwords does not match"),
  });

  const FORM_VALIDATION_SCHEMA_FORGET_PASSWORD = Yup.object().shape({
    email: Yup.string()
      .email("Enter a Valid Email")
      .required("Email Field is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email Should be Valid Email"),
  });

  const FORM_VALIDATION_SCHEMA_RESET_PASSWORD = Yup.object().shape({
    password: Yup.string()
      .required("Password Field is required")
      .min(6, "Minimum Number of Chars is 6")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        "Password must contain at least one letter and one number"
      ),
  });

  const FORM_VALIDATION_SCHEMA_Add_BRAND = Yup.object().shape({
    productType: Yup.string().required("Product Type is Required"),

    IdDistributor: Yup.mixed()
      .required("Id of the User is required")
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        if (value) {
          const supportedFormats = ["pdf"];
          return supportedFormats.includes(value.name.split(".").pop());
        }
        return true;
      })
      .test("fileSize", "File size must not be more than 10MB", (value) => {
        if (value) {
          return value.size <= 10485760; // 10MB in bytes
        }
        return true;
      }),

    authorizeDocument: Yup.mixed()
      .required("Authorize Document is required")
      .test(
        "notEqualFileName",
        "Authorize Document file name must be different from IdDistributor file name",
        (value, { parent }) => {
          const { IdDistributor } = parent;
          if (value && IdDistributor) {
            const idDistributorFileName = IdDistributor.name;
            const authorizeDocumentFileName = value.name;
            return idDistributorFileName !== authorizeDocumentFileName;
          }
          return true;
        }
      )
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        if (value) {
          const supportedFormats = ["pdf"];
          return supportedFormats.includes(value.name.split(".").pop());
        }
        return true;
      })
      .test("fileSize", "File size must not be more than 10MB", (value) => {
        if (value) {
          return value.size <= 10485760; // 10MB in bytes
        }
        return true;
      }),
  });

  const FORM_VALIDATION_SCHEMA_Add_STORE = Yup.object().shape({
    storeName: Yup.string().required("Store Name is Required"),
    storeCity: Yup.string().required("Store City is Required"),
    storeAddress: Yup.string().required(
      "Full Address of the Store is Required"
    ),
  });
  const FORM_VALIDATION_SCHEMA_EDIT_STORE = Yup.object().shape({
    singleStoreName: Yup.string().required("Store Name is Required"),
    singleStoreAddress: Yup.string().required("Store City is Required"),
    singleStoreCity: Yup.string().required(
      "Full Address of the Store is Required"
    ),
  });
  const FORM_VALIDATION_SCHEMA_Add_PRODUCT = Yup.object().shape({
    StoresAndQuantities: Yup.array().of(
      Yup.object().shape({
        store: Yup.string().required("Required Store Name"),
        quantity: Yup.string().required("Required quantity"),
      })
    ),
  });

  return {
    FORM_VALIDATION_SCHEMA_SignUp,
    FORM_VALIDATION_SCHEMA_Login,
    FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD,
    FORM_VALIDATION_SCHEMA_FORGET_PASSWORD,
    FORM_VALIDATION_SCHEMA_RESET_PASSWORD,
    FORM_VALIDATION_SCHEMA_Add_BRAND,
    FORM_VALIDATION_SCHEMA_Add_STORE,
    FORM_VALIDATION_SCHEMA_EDIT_STORE,
    FORM_VALIDATION_SCHEMA_Add_PRODUCT,
  };
}

export default UseFormValidation;
