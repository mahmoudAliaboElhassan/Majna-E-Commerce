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
import { Form, Formik, useFormikContext } from "formik";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormHelperText } from "@material-ui/core";

import UseThemMode from "@hooks/use-theme";
import UseMediaQueryHook from "@hooks/use-media-query";
import ButtonWrapper from "@components/formui/SubmitButton";
import { AppbarHeader } from "@styles/appbar";
import UseFormValidation from "@formValidation/use-form-validation";
import UseInitialValues from "@utils/use-initial-values";
import SelectComp from "@components/formui/Select";
import {
  getStores,
  getAtuthorizedBrands,
  getCategories,
  getSubCategory,
  cleanUpStores,
  cleanUpAuthorizedBrands,
  cleanUpCategories,
  cleanUpSubCategories,
  addProduct,
} from "@state/slices/distributor";
import withGuard from "@utils/withGuard";
import LoadingFetching from "@components/loadingFetching";
import TextFieldWrapper from "@components/formui/textField";
import TextAreaWrapper from "@components/formui/textarea";
import ImageUploader from "@components/formui/multipleImages";
import { helperStyle } from "@styles/error";
import InventoryComp from "@components/inventory";
import SubCategorySelect from "@components/subCateogry";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color:
      theme.palette.type === "dark" ? theme.palette.common.white : "inherit",
    backgroundColor: "transparent !important",
  },
  containerWrapper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
}));
const { INITIAL_FORM_STATE_ADD_PRODUCT } = UseInitialValues();

// const quoteKeys = (obj) => {
//   return Object.keys(obj).reduce((acc, key) => {
//     acc[`"${key}"`] = obj[key];
//     return acc;
//   }, {});
// };

// const processAlbumArray = (albumArray) => {
//   return albumArray.map((item) => quoteKeys(item));
// };

function AddProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { FORM_VALIDATION_SCHEMA_Add_PRODUCT } = UseFormValidation();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
  const { isMatch } = UseMediaQueryHook();
  const { brands, loadingFetch } = useSelector((state) => state.distributor);
  const { Uid } = useSelector((state) => state.auth);
  const {
    approvedBrands,
    stores,
    subCategories,
    categories,
    loadingAuthorized,
    loadingStores,
    loadingSubCategory,
    loadingCategories,
  } = useSelector((state) => state.distributor);
  const loadingState =
    loadingStores ||
    loadingSubCategory ||
    loadingAuthorized ||
    loadingCategories;
  useEffect(() => {
    dispatch(getAtuthorizedBrands({ Uid }));
    dispatch(getStores({ Uid }));
    dispatch(getSubCategory());
    dispatch(getCategories());
    return () => {
      dispatch(cleanUpAuthorizedBrands());
      dispatch(cleanUpStores());
      dispatch(cleanUpCategories());
      dispatch(cleanUpSubCategories());
    };
  }, [dispatch]);
  return (
    <div>
      {loadingState ? (
        <LoadingFetching>{t("wait-data")}</LoadingFetching>
      ) : approvedBrands.length ? (
        <Container maxWidth={isMatch ? "md" : "lg"}>
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
                      const { categories, ...productData } = values;
                      // const processedAlbum = processAlbumArray(productData.album);
                      // const processedInventory = processAlbumArray(
                      //   productData.inventory
                      // );
                      // console.log(JSON.stringify(processedAlbum));
                      // console.log(typeof JSON.stringify(processedAlbum));
                      // console.log(JSON.stringify(processedInventory));
                      // console.log(typeof JSON.stringify(processedInventory));
                      const productDataWithQuotedKeys = {
                        ...productData,
                        album: JSON.stringify(productData.album),
                        inventory: JSON.stringify(productData.inventory),
                      };
                      dispatch(addProduct(productDataWithQuotedKeys))
                        .unwrap()
                        .then(() => {
                          {
                            toast.success(t("product-added"), {
                              position: "top-right",
                              autoClose: 1000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: themeMode,
                            });
                          }
                        })
                        .catch((error) => {
                          if (error.response.status === 400) {
                            Swal.fire({
                              title: t("error-add-product"),
                              text: t("error-bad-data"),
                              icon: "error",
                              confirmButtonColor: "#3085d6",
                              confirmButtonText: t("ok"),
                            });
                          } else if (error.response.status === 401) {
                            Swal.fire({
                              title: t("unauthorize"),
                              text: t("unauthorized-txt"),
                              icon: "error",
                              confirmButtonColor: "#3085d6",
                              confirmButtonText: t("ok"),
                            });
                          } else if (error.response.status === 403) {
                            Swal.fire({
                              title: t("forbidden"),
                              text: t("forbidden-txt-distributor"),
                              icon: "error",
                              confirmButtonColor: "#3085d6",
                              confirmButtonText: t("ok"),
                            });
                          }
                          console.log(error);
                        });
                    }}
                  >
                    <Form className={classes.formWrapper}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography>
                            <AppbarHeader data-aos="fade-up">
                              {t("add-product-now")}
                            </AppbarHeader>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextFieldWrapper
                            name="name"
                            label={t("product_title")}
                            autocomplete="off"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ImageUploader />
                        </Grid>
                        <Grid item xs={12}>
                          <TextAreaWrapper
                            name="description"
                            textarea={3}
                            label={t("description")}
                            placeholder={t("description-txt")}
                            autocomplete="off"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <SelectComp
                            name="categories"
                            label={t("categories")}
                            options={categories}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <SubCategorySelect subCategories={subCategories} />
                        </Grid>
                        <Grid item xs={12}>
                          <SelectComp
                            name="brand_pk"
                            label={t("brand")}
                            options={approvedBrands}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextFieldWrapper
                            name="price"
                            label={t("product-price")}
                            type="number"
                          />
                        </Grid>
                        <InventoryComp />
                        <Grid item xs={12}>
                          <ButtonWrapper>{t("add-product")}</ButtonWrapper>
                        </Grid>
                      </Grid>
                    </Form>
                  </Formik>
                </Grid>
              </Grid>
            </Container>
          </Card>
        </Container >
      ) : (
        <div>{t("no-brands")}</div>
      )
      }
    </div >
  );
}

export default (AddProduct);
// https://www.youtube.com/shorts/tydbyfOu9zU
