import { useTranslation } from "react-i18next"
import * as Yup from "yup"
import { ref } from "yup"

function UseFormValidation() {
  const { t } = useTranslation()

  const FORM_VALIDATION_SCHEMA_Login = Yup.object().shape({
    email: Yup.string()
      .email(t("validation.email_valid"))
      .required(t("validation.email_required"))
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t("validation.email_valid")),

    password: Yup.string()
      .required(t("validation.password_required"))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        t("validation.password_letter_number")
      )
      .min(6, t("validation.password_min_6")),
  })

  const FORM_VALIDATION_SCHEMA_SignUp = Yup.object().shape({
    username: Yup.string(t("validation.username_chars_only"))
      .max(20, t("validation.username_max_20"))
      .required(t("validation.username_required")),

    email: Yup.string()
      .email(t("validation.email_valid"))
      .required(t("validation.email_required"))
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t("validation.email_valid")),

    password: Yup.string()
      .required(t("validation.password_required"))
      .min(6, t("validation.password_min_6"))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        t("validation.password_letter_number")
      ),

    confirm_password: Yup.string()
      .required(t("validation.confirm_password_required"))
      .oneOf([ref("password")], t("validation.passwords_not_match")),

    termsOfService: Yup.boolean().oneOf([true], t("validation.terms_required")),
  })

  const FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD = Yup.object().shape({
    currentPassword: Yup.string()
      .required(t("validation.password_required"))
      .min(6, t("validation.password_min_6"))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        t("validation.password_letter_number")
      ),

    newPassword: Yup.string()
      .required(t("validation.password_required"))
      .min(6, t("validation.password_min_6"))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        t("validation.password_letter_number")
      ),

    confirm_newPassword: Yup.string()
      .required(t("validation.confirm_new_password_required"))
      .oneOf([ref("newPassword")], t("validation.passwords_not_match")),
  })

  const FORM_VALIDATION_SCHEMA_FORGET_PASSWORD = Yup.object().shape({
    email: Yup.string()
      .email(t("validation.email_valid"))
      .required(t("validation.email_required"))
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t("validation.email_valid")),
  })

  const FORM_VALIDATION_SCHEMA_RESET_PASSWORD = Yup.object().shape({
    password: Yup.string()
      .required(t("validation.password_required"))
      .min(6, t("validation.password_min_6"))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        t("validation.password_letter_number")
      ),
  })

  const FORM_VALIDATION_SCHEMA_Add_BRAND = Yup.object().shape({
    productType: Yup.string().required(t("validation.product_type_required")),

    IdDistributor: Yup.mixed()
      .required(t("validation.id_user_required"))
      .test("fileFormat", t("validation.only_pdf"), (value) => {
        if (value) {
          const supportedFormats = ["pdf"]
          return supportedFormats.includes(value.name.split(".").pop())
        }
        return true
      })
      .test("fileSize", t("validation.file_size_7mb"), (value) => {
        if (value) {
          return value.size <= 7340032
        }
        return true
      }),

    authorizeDocument: Yup.mixed()
      .required(t("validation.authorize_doc_required"))
      .test(
        "notEqualFileName",
        t("validation.authorize_doc_different"),
        (value, { parent }) => {
          const { IdDistributor } = parent
          if (value && IdDistributor) {
            const idDistributorFileName = IdDistributor.name
            const authorizeDocumentFileName = value.name
            return idDistributorFileName !== authorizeDocumentFileName
          }
          return true
        }
      )
      .test("fileFormat", t("validation.only_pdf"), (value) => {
        if (value) {
          const supportedFormats = ["pdf"]
          return supportedFormats.includes(value.name.split(".").pop())
        }
        return true
      })
      .test("fileSize", t("validation.file_size_7mb"), (value) => {
        if (value) {
          return value.size <= 7340032
        }
        return true
      }),
  })

  const FORM_VALIDATION_SCHEMA_Add_STORE = Yup.object().shape({
    storeName: Yup.string().required(t("validation.store_name_required")),
    storeCity: Yup.string().required(t("validation.store_city_required")),
    storeAddress: Yup.string().required(t("validation.store_address_required")),
  })

  const FORM_VALIDATION_SCHEMA_EDIT_STORE = Yup.object().shape({
    singleStoreName: Yup.string().required(t("validation.store_name_required")),
    singleStoreAddress: Yup.string().required(
      t("validation.store_city_required")
    ),
    singleStoreCity: Yup.string().required(
      t("validation.store_address_required")
    ),
  })

  const FORM_VALIDATION_SCHEMA_Add_PRODUCT = Yup.object().shape({
    brand_pk: Yup.string().required(t("validation.product_brand_required")),
    name: Yup.string().required(t("validation.product_title_required")),
    price: Yup.number(t("validation.price_should_be_number"))
      .required(t("validation.product_price_required"))
      .min(1, t("validation.price_not_zero_negative")),
    sub_category_pk: Yup.string().required(
      t("validation.product_subcategory_required")
    ),
    categories: Yup.string().required(
      t("validation.product_category_required")
    ),
    description: Yup.string().required(
      t("validation.product_description_required")
    ),
    inventory: Yup.array().of(
      Yup.object().shape({
        store_pk: Yup.string().required(
          t("validation.store_name_required_short")
        ),
        quantity: Yup.number()
          .required(t("validation.quantity_required"))
          .min(1, t("validation.quantity_min_one")),
      })
    ),
    album: Yup.array()
      .of(
        Yup.object().shape({
          image: Yup.mixed().required(t("validation.image_required")),
          is_cover: Yup.string().required(""),
        })
      )
      .min(2, t("validation.images_min_two"))
      .test(
        "atLeastOneCover",
        t("validation.at_least_one_cover"),
        function (value) {
          const atLeastOneCover = value.some(
            (image) => image.is_cover === "True"
          )
          return atLeastOneCover
        }
      )
      .max(3, t("validation.images_max_three")),
  })

  const FORM_VALIDATION_SCHEMA_PRICES = Yup.object().shape({
    priceFrom: Yup.number(t("validation.price_from_number"))
      .required(t("validation.price_from_required"))
      .min(1, t("validation.price_from_not_negative_zero")),
    priceTo: Yup.number(t("validation.price_to_number"))
      .required(t("validation.price_to_required"))
      .min(Yup.ref("priceFrom"), t("validation.price_to_greater"))
      .test(
        "is-greater",
        t("validation.price_to_greater_by_one"),
        function (value) {
          const { priceFrom } = this.parent
          return value > priceFrom
        }
      ),
  })

  const FORM_VALIDATION_SCHEMA_UPDATE_QUANTITY = Yup.object().shape({
    quantity: Yup.number()
      .required(t("validation.product_quantity_required"))
      .min(0, t("validation.negative_not_allowed")),
  })

  const FORM_VALIDATION_SCHEMA_CONTACT = Yup.object().shape({
    yourName: Yup.string()
      .required(t("validation.name_required"))
      .max(20, t("validation.name_max_20")),
    yourEmail: Yup.string()
      .required(t("validation.email_required"))
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t("validation.email_valid")),
    yourSubject: Yup.string()
      .required(t("validation.subject_required"))
      .max(50, t("validation.subject_max_50")),
    yourMessage: Yup.string().required(t("validation.message_required")),
    userRole: Yup.string().required(t("validation.user_role_required")),
  })

  const FORM_VALIDATION_SCHEMA_UPDATE_PRODUCT = Yup.object().shape({
    singleProductName: Yup.string().required(
      t("validation.product_title_required")
    ),
    singleProductPrice: Yup.number(t("validation.price_should_be_number"))
      .required(t("validation.product_price_required"))
      .min(1, t("validation.price_not_zero_negative")),
    singleProductDescription: Yup.string().required(
      t("validation.product_description_required")
    ),
    singleProductInventory: Yup.array().of(
      Yup.object().shape({
        store_id: Yup.string().required(
          t("validation.store_name_required_short")
        ),
        quantity: Yup.number()
          .required(t("validation.quantity_required"))
          .min(1, t("validation.quantity_min_one")),
      })
    ),
  })

  const FORM_VALIDATION_SCHEMA_ADD_ADDRESS = Yup.object().shape({
    city: Yup.string().required(t("validation.city_required")),
    address: Yup.string().required(t("validation.full_address_required")),
  })

  const FORM_VALIDATION_SCHEMA_EDIT_ADDRESS = Yup.object().shape({
    singleAddressCity: Yup.string().required(t("validation.city_required")),
    singleAddress: Yup.string().required(t("validation.full_address_required")),
  })

  const FORM_VALIDATION_SCHEMA_ADD_ORDER = Yup.object().shape({
    pickup_address_id: Yup.string().required(
      t("validation.order_address_required")
    ),
    order_items: Yup.array().of(
      Yup.object().shape({
        product_id: Yup.string().required(t("validation.product_id_required")),
        quantity: Yup.string().required(
          t("validation.quantity_product_required")
        ),
      })
    ),
  })

  const FORM_VALIDATION_SCHEMA_ADD_ALBUM = Yup.object().shape({
    image: Yup.mixed().required(t("validation.image_required")),
    is_cover: Yup.string().required(""),
  })

  const FORM_VALIDATION_SCHEMA_ADD_REVIEW = Yup.object().shape({
    rating: Yup.mixed().required(t("validation.rating_required")),
    content: Yup.string()
      .required(t("validation.review_content_required"))
      .min(10, t("validation.review_content_min_10")),
  })

  const FORM_VALIDATION_SCHEMA_EDIT_REVIEW = Yup.object().shape({
    ratingEdit: Yup.mixed().required(t("validation.rating_required")),
    contentEdit: Yup.string()
      .required(t("validation.review_content_required"))
      .min(10, t("validation.review_content_min_10")),
  })

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
    FORM_VALIDATION_SCHEMA_UPDATE_PRODUCT,
    FORM_VALIDATION_SCHEMA_ADD_ADDRESS,
    FORM_VALIDATION_SCHEMA_EDIT_ADDRESS,
    FORM_VALIDATION_SCHEMA_ADD_ORDER,
    FORM_VALIDATION_SCHEMA_ADD_ALBUM,
    FORM_VALIDATION_SCHEMA_ADD_REVIEW,
    FORM_VALIDATION_SCHEMA_EDIT_REVIEW,
  }
}

export default UseFormValidation
