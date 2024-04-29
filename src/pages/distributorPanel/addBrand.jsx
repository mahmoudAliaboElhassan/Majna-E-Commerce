import React, { useEffect } from "react";

import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
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
  addBrand,
  fetchPrands,
  cleanUpBrands,
} from "@state/slices/distributor";
import withGuard from "@utils/withGuard";
import LoadingFetching from "@components/loadingFetching";

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
const { INITIAL_FORM_STATE_ADD_BRAND } = UseInitialValues();

function AddBrand() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { FORM_VALIDATION_SCHEMA_Add_BRAND } = UseFormValidation();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
  const { brands, loadingFetch } = useSelector((state) => state.distributor);
  useEffect(() => {
    if (brands.length === 0) {
      dispatch(fetchPrands());
    }
    return () => {
      dispatch(cleanUpBrands());
    };
  }, [dispatch]);

  return (
    <>
      {!loadingFetch ? (
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
                      ...INITIAL_FORM_STATE_ADD_BRAND,
                    }}
                    validationSchema={FORM_VALIDATION_SCHEMA_Add_BRAND}
                    onSubmit={(values) => {
                      console.log({ ...values });
                      dispatch(
                        addBrand({
                          authorization_doc: values.authorizeDocument,
                          identity_doc: values.IdDistributor,
                          Uid: values.productType,
                        })
                      )
                        .unwrap()
                        .then(() => {
                          {
                            toast.success(t("brand-added"), {
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
                          if (error.response.status === 409) {
                            Swal.fire({
                              title: t("error-add"),
                              text: t("error-wait-text"),
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
                              text: t("forbidden-txt"),
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
                            <AppbarHeader>{t("add-brand")}</AppbarHeader>
                          </Typography>
                        </Grid>{" "}
                        <Grid item xs={12}>
                          <SelectComp
                            name="productType"
                            label={t("label_type")}
                            options={brands}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <FileInput
                            name="IdDistributor"
                            label={t("idDocument")}
                          />
                        </Grid>{" "}
                        <Grid item xs={12} md={6} lg={6}>
                          <FileInput
                            name="authorizeDocument"
                            label={t("authorizeDocument")}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ButtonWrapper>{t("add-brand")}</ButtonWrapper>{" "}
                        </Grid>
                      </Grid>{" "}
                    </Form>
                  </Formik>
                </Grid>
              </Grid>
            </Container>
          </Card>
        </Container>
      ) : (
        <LoadingFetching>{t("loading-brands")}</LoadingFetching>
      )}
    </>
  );
}

export default withGuard(AddBrand);
