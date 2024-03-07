// import React from "react";

// function AddProduct() {
//   return <div>AddProduct</div>;
//   // Brand
//   // title
//   // description
//   // pricre
//   // album
//   // Category
//   // SubCategory
//   // Store  // Quantity

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

import UseThemMode from "../../hooks/use-theme";
import ButtonWrapper from "../../components/formui/SubmitButton";
import { AppbarHeader } from "../../styles/appbar";
import UseFormValidation from "../../formValidation/use-form-validation";
import UseInitialValues from "../../utils/use-initial-values";
import SelectComp from "../../components/formui/Select";
import FileInput from "../../components/formui/file";
import {
  addBrand,
  fetchPrands,
  getStores,
} from "../../state/slices/distributor";
import withGuard from "../../utils/withGuard";
import LoadingFetching from "../../components/loadingFetching";
import MultipleSelect from "../../components/formui/multipleSelect";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color:
      theme.palette.type === "dark" ? theme.palette.common.white : "inherit",
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
  const [count, setCount] = useState(1); // Initial count state
  const { Uid } = useSelector((state) => state.auth);

  const handleAddClick = () => {
    setCount(count + 1); // Increment count
  };
  useEffect(() => {
    dispatch(getStores({ Uid }));
  });
  return (
    <>
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
                    console.log(values.StoresAndQuantities);
                    // dispatch(
                    addBrand({
                      authorization_doc: values.authorizeDocument,
                      identity_doc: values.IdDistributor,
                      Uid: values.productType,
                    });
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
                      {[...Array(count)].map((_, index) => (
                        <Grid item xs={12} key={index}>
                          <MultipleSelect
                            nameStore={`StoresAndQuantities.${index}.store`}
                            nameQuantity={`StoresAndQuantities.${index}.quantity`}
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
    </>
  );
}

export default withGuard(AddProduct);
