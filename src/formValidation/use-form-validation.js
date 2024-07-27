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
    brand_pk: Yup.string().required("Product Brand is Required"),
    name: Yup.string().required("Product Title is Required"),
    price: Yup.number("Price Should be Number")
      .required("Product Price is Required ")
      .min(1, "Price can not be zero or negative"),
    sub_category_pk: Yup.string().required("Product SubCategory is Required"),
    categories: Yup.string().required("Product Category is Required"),
    description: Yup.string().required("Product Description is Required"),
    inventory: Yup.array().of(
      Yup.object().shape({
        store_pk: Yup.string().required("Required Store Name"),
        quantity: Yup.number()
          .required("Required quantity")
          .min(1, "Minimum amount of Product is one"),
      })
    ),
    album: Yup.array()
      .of(
        Yup.object().shape({
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
          is_cover: Yup.string().required("isCover is required"),
        })
      )
      .test(
        "atLeastOneCover",
        "At least one image must be marked as cover",
        function (value) {
          const atLeastOneCover = value.some(
            (image) => image.is_cover === "True"
          );
          return atLeastOneCover;
        }
      )
      .max(3, "You can select only up to three images ."),
  });

  const FORM_VALIDATION_SCHEMA_PRICES = Yup.object().shape({
    priceFrom: Yup.number("Price From should be a number")
      .required("Price From is required")
      .min(0, "Price From cannot be negative"),
    priceTo: Yup.number("Price To should be a number")
      .required("Price To is required")
      .min(Yup.ref("priceFrom"), "Price To must be greater than Price From")
      .test(
        "is-greater",
        "Price To must be greater than Price From by at least 1",
        function (value) {
          const { priceFrom } = this.parent;
          return value > priceFrom;
        }
      ),
  });
  const FORM_VALIDATION_SCHEMA_UPDATE_QUANTITY = Yup.object().shape({
    quantity: Yup.number()
      .required("Product Quantity is Required")
      .min(0, "Negative Number is not Allowed"),
  });
  const FORM_VALIDATION_SCHEMA_CONTACT = Yup.object().shape({
    yourName: Yup.string()
      .required("Name is Required")
      .max(20, "Maximum number of characters is 20"),
    yourEmail: Yup.string()
      .required("Email is Required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email Should be Valid Email"),
    yourSubject: Yup.string()
      .required("Subject is Required")
      .max(50, "Maximum number of characters is 50"),
    yourMessage: Yup.string().required("Message is Required"),
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
    FORM_VALIDATION_SCHEMA_PRICES,
    FORM_VALIDATION_SCHEMA_UPDATE_QUANTITY,
    FORM_VALIDATION_SCHEMA_CONTACT,
  };
}

export default UseFormValidation;
