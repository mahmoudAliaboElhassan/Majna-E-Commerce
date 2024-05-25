// import React from "react";

// function AddProduct() {
//   return <div>AddProduct</div>;
//   // Brand_id
//   // title
//   // album => list => [file={file}&cover={true||false}]
//   // description  max 1000
//   // pricre
//   // SubCategory
//   // Store
// Quantity

//   // ===============
//   // Store
//   // name
//   // Governance
//   // city
//   // street
//   // phone
// }

// export default AddProduct;
import React, { useEffect, useState } from "react";

import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UseThemMode from "@hooks/use-theme";
import ButtonWrapper from "@components/formui/SubmitButton";
import { AppbarHeader } from "@styles/appbar";
import UseFormValidation from "@formValidation/use-form-validation";
import UseInitialValues from "@utils/use-initial-values";
import SelectComp from "@components/formui/Select";
import FileInput from "@components/formui/file";
import {
  cleanUpStores,
  getStores,
  getAtuthorizedBrands,
  cleanUpAuthorizedBrands,
} from "@state/slices/distributor";
import withGuard from "@utils/withGuard";
import LoadingFetching from "@components/loadingFetching";
import MultipleSelect from "@components/formui/multipleSelect";
import TextFieldWrapper from "@components/formui/textField";
import TextAreaWrapper from "@components/formui/textarea";
import ImageUploader from "../../components/formui/multipleImages";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color:
      theme.palette.type === "dark" ? theme.palette.common.white : "inherit",    backgroundColor: "transparent !important",

  },
  containerWrapper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
}));
const { INITIAL_FORM_STATE_ADD_PRODUCT } = UseInitialValues();

function AddProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { FORM_VALIDATION_SCHEMA_Add_PRODUCT } = UseFormValidation();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
  const { brands, loadingFetch } = useSelector((state) => state.distributor);
  const [count, setCount] = useState(1);
  const { Uid } = useSelector((state) => state.auth);
  const { approvedBrands, loadingAuthorized, stores, loadingStores } =
    useSelector((state) => state.distributor);

  useEffect(() => {
    dispatch(getAtuthorizedBrands({ Uid }));
    dispatch(getStores({ Uid }));
    return () => {
      dispatch(cleanUpAuthorizedBrands());
      dispatch(cleanUpStores());
    };
  }, [dispatch]);

  const handleAddClick = () => {
    setCount(count + 1); // Increment count
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>

      <Container maxWidth="sm">
        <ToastContainer />
        <Card raised>
          <Container maxWidth="md">
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item={12}>
                <Formik
                  initialValues={{
                    ...INITIAL_FORM_STATE_ADD_PRODUCT,
                  }}
                  validationSchema={FORM_VALIDATION_SCHEMA_Add_PRODUCT}
                  onSubmit={(values) => {
                    console.log({ ...values });
                    // console.log(values.StoresAndQuantities);
                    // console.log(values.imgs);
                    // dispatch(
                    // addBrand({
                    //   authorization_doc: values.authorizeDocument,
                    //   identity_doc: values.IdDistributor,
                    //   Uid: values.productType,
                    // });
                    // )
                    //   .unwrap()
                    //   .then(() => {
                    //     {
                    //       toast.success(t("brand-added"), {
                    //         position: "top-right",
                    //         autoClose: 1000,
                    //         hideProgressBar: false,
                    //         closeOnClick: true,
                    //         pauseOnHover: true,
                    //         draggable: true,
                    //         progress: undefined,
                    //         theme: themeMode,
                    //       });
                    //     }
                    //   })

                    //   .catch((error) => {
                    //     if (error.response.status === 409) {
                    //       Swal.fire({
                    //         title: t("error-add"),
                    //         text: t("error-wait-text"),
                    //         icon: "error",
                    //         confirmButtonColor: "#3085d6",
                    //         confirmButtonText: t("ok"),
                    //       });
                    //     } else if (error.response.status === 401) {
                    //       Swal.fire({
                    //         title: t("unauthorize"),
                    //         text: t("unauthorized-txt"),
                    //         icon: "error",
                    //         confirmButtonColor: "#3085d6",
                    //         confirmButtonText: t("ok"),
                    //       });
                    //     } else if (error.response.status === 403) {
                    //       Swal.fire({
                    //         title: t("forbidden"),
                    //         text: t("forbidden-txt"),
                    //         icon: "error",
                    //         confirmButtonColor: "#3085d6",
                    //         confirmButtonText: t("ok"),
                    //       });
                    //     }
                    //     console.log(error);
                    //   });
                  }}
                >
                  <Form className={classes.formWrapper}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>
                          <AppbarHeader>{t("add-product-now")}</AppbarHeader>
                        </Typography>
                      </Grid>{" "}
                      <Grid item xs={12}>
                        <TextFieldWrapper
                          name="productTitle"
                          label={t("product_title")}
                          autocomplete="off"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageUploader />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldWrapper
                          name="subcategory"
                          label={t("sub_category")}
                          autocomplete="off"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextAreaWrapper
                          name="productDescription"
                          textarea={3}
                          label={t("description")}
                          autocomplete="off"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <SelectComp
                          name="approvedBrands"
                          label={t("approved_brands")}
                          options={approvedBrands}
                        />
                      </Grid>{" "}
                      <Grid item xs={12}>
                        <TextFieldWrapper
                          name="productPrice"
                          label={t("product_price")}
                          type="number"
                        />
                      </Grid>{" "}
                      {[...Array(count)].map((_, index) => (
                        <Grid item xs={12} key={index}>
                          <MultipleSelect
                            nameStore={`StoresAndQuantities.${index}.store`}
                            nameQuantity={`StoresAndQuantities.${index}.quantity`}
                            options={stores}
                            label={`${t("quantity")} ${index + 1}`}
                          />
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Button variant="contained" onClick={handleAddClick}>
                          +
                        </Button>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <NameAndAgeSelector
                          nameStore="StoresAndQuantities.0.store"
                          nameQuantity={"StoresAndQuantities.0.quantity"}
                          label="quantity"
                        />
                      </Grid> */}
                      <Grid item xs={12}>
                        <ButtonWrapper>{t("add-product")}</ButtonWrapper>{" "}
                      </Grid>
                    </Grid>{" "}
                  </Form>
                </Formik>
              </Grid>
            </Grid>
          </Container>
        </Card>
      </Container>
    </div>
  );
}

export default withGuard(AddProduct);
