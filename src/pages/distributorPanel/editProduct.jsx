import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UseThemMode from "@hooks/use-theme";
import UseMediaQueryHook from "@hooks/use-media-query";
import ButtonWrapper from "@components/formui/SubmitButton";
import { AppbarHeader } from "@styles/appbar";
import UseFormValidation from "@formValidation/use-form-validation";
import UseInitialValues from "@utils/use-initial-values";
import {
  getStores,
  cleanUpStores,
  updateUploadedProduct,
} from "@state/slices/distributor";
import { getSpecifiedProduct, cleanUpGetSpecifiedProduct } from "@state/slices/products"
import withGuard from "@utils/withGuard";
import LoadingFetching from "@components/loadingFetching";
import TextFieldWrapper from "@components/formui/textField";
import TextAreaWrapper from "@components/formui/textarea";
import ImageUploader from "@components/formui/multipleImages";
import { helperStyle } from "@styles/error";
import InventoryComp from "@components/inventory";
import { Description } from "@mui/icons-material";
import SingleProductInventory from "@components/singleProductInventory";

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



function EditProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { productId } = useParams()
  const { FORM_VALIDATION_SCHEMA_UPDATE_PRODUCT } = UseFormValidation();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
  const { isMatch } = UseMediaQueryHook();
  const { productData, loadingSpecificProduct } = useSelector((state) => state.products);
  const { INITIAL_FORM_STATE_EDIT_PRODUCT } = UseInitialValues(productData);
  console.log("productData?.inventory?.stores")
  console.log(productData?.inventory?.stores)
  const { Uid } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const {
    loadingStores,
  } = useSelector((state) => state.distributor);

  useEffect(() => {
    dispatch(getStores({ Uid }));
    dispatch(getSpecifiedProduct({ id: productId }))
    return () => {
      dispatch(cleanUpStores());
      dispatch(cleanUpGetSpecifiedProduct())
    };
  }, [dispatch]);
  return (
    <div>
      {loadingStores || loadingSpecificProduct ? (
        <LoadingFetching>{t("wait-data")}</LoadingFetching>
      ) :
        <div style={{ position: "relative", height: "100vh" }}>
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
                        ...INITIAL_FORM_STATE_EDIT_PRODUCT,
                      }}
                      validationSchema={FORM_VALIDATION_SCHEMA_UPDATE_PRODUCT}
                      onSubmit={(values) => {
                        console.log({ ...values });
                        // const processedAlbum = processAlbumArray(productData.album);
                        // const processedInventory = processAlbumArray(
                        //   productData.inventory
                        // );
                        // console.log(JSON.stringify(processedAlbum));
                        // console.log(typeof JSON.stringify(processedAlbum));
                        // console.log(JSON.stringify(processedInventory));
                        // console.log(typeof JSON.stringify(processedInventory));
                        // const productDataWithQuotedKeys = {
                        //   ...productData,
                        //   album: JSON.stringify(productData.album),
                        //   inventory: JSON.stringify(productData.inventory),
                        // };
                        const updatedInventory = values.singleProductInventory.map(item => ({
                          ...item,
                          store_pk: item.store_id,
                          store_id: undefined, // Remove the store_id field
                        }));
                        dispatch(updateUploadedProduct(
                          {
                            distributorId: Uid,
                            productId,
                            name: values.singleProductName,
                            description: values.singleProductDescription,
                            price: +values.singleProductPrice,
                            inventory: updatedInventory
                          }
                        ))
                          .unwrap()
                          .then(() => {
                            {
                              toast.success(t("product-edited"), {
                                position: "top-right",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: themeMode,
                              });
                              setTimeout(() => {
                                navigate("/distributor-control-panel/uploaded-products");
                              }, 1000);
                            }
                          })
                          .catch((error) => {
                            if (error.response.status === 400) {
                              Swal.fire({
                                title: t("error-edit-product"),
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
                                {t("edit-product-now")}
                              </AppbarHeader>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <TextFieldWrapper
                              name="singleProductName"
                              label={t("product_title")}
                              autocomplete="off"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextAreaWrapper
                              name="singleProductDescription"
                              textarea={3}
                              label={t("description")}
                              placeholder={t("description-txt")}
                              autocomplete="off"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextFieldWrapper
                              name="singleProductPrice"
                              label={t("product-price")}
                              type="number"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <SingleProductInventory SingleProductInventory={productData?.inventory?.stores} />
                          </Grid>
                          <Grid item xs={12}>
                            <ButtonWrapper>{t("edit-product")}</ButtonWrapper>
                          </Grid>
                        </Grid>
                      </Form>
                    </Formik>
                  </Grid>
                </Grid>
              </Container>
            </Card>
          </Container>
        </div>
      }
    </div>
  );
}

export default (EditProduct);
// https://www.youtube.com/shorts/tydbyfOu9zU
