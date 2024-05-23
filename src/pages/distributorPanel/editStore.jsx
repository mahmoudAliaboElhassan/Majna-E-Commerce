import React, { useEffect } from "react";

import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UseThemMode from "@hooks/use-theme";
import ButtonWrapper from "@components/formui/SubmitButton";
import { AppbarHeader } from "@styles/appbar";
import UseFormValidation from "@formValidation/use-form-validation";
import UseInitialValues from "@utils/use-initial-values";
import SelectComp from "@components/formui/Select";
import {
  editStore,
  fetchsinglesingleStoreData,
  getStore,
  fetchGovernance,
} from "../../state/slices/distributor";
import withGuard from "../../utils/withGuard";
import LoadingFetching from "../../components/loadingFetching";
import TextFieldWrapper from "../../components/formui/textField";

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

function EditStore() {
  const classes = useStyles();
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const { FORM_VALIDATION_SCHEMA_EDIT_STORE } = UseFormValidation();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
  const {
    loadingGovernaces,
    loadingSingleStoreData,
    singleStoreData,
    governance,
  } = useSelector((state) => state.distributor);
  const { Uid } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getStore({ Uid, storeId }));
    dispatch(fetchGovernance());
  }, []);
  console.log(singleStoreData?.city);
  console.log(typeof singleStoreData?.city);
  const { INITIAL_FORM_STATE_EDIT_STORE } = UseInitialValues(singleStoreData);
  let allCities = [];

  governance?.forEach((obj) => {
    allCities = allCities.concat(obj.cities);
  });

  return (
    <>
      {!loadingGovernaces && !loadingSingleStoreData ? (
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
                      ...INITIAL_FORM_STATE_EDIT_STORE,

                      // singleStoreName: singleStoreData.name,
                      // singleStoreAddress: singleStoreData.address,
                      // singleStoreCity: singleStoreData.city,
                    }}
                    validationSchema={FORM_VALIDATION_SCHEMA_EDIT_STORE}
                    onSubmit={(values) => {
                      console.log({ ...values });

                      dispatch(
                        editStore({
                          Uid,
                          storeId,
                          name: values.singleStoreName,
                          address: values.singleStoreAddress,
                          city: values.singleStoreCity,
                        })
                      )
                        .unwrap()
                        .then(() => {
                          {
                            toast.success(t("store-edited"), {
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
                              navigate("/distributor-control-panel/all-stores");
                            }, 1000);
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
                            <AppbarHeader>{t("edit-store")}</AppbarHeader>
                          </Typography>
                        </Grid>{" "}
                        <Grid item xs={12}>
                          <TextFieldWrapper
                            name="singleStoreName"
                            label={t("storeName")}
                          />
                        </Grid>{" "}
                        <Grid item xs={12}>
                          <SelectComp
                            name="singleStoreCity"
                            label={t("storeCity")}
                            options={allCities}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          {" "}
                          <TextFieldWrapper
                            name={"singleStoreAddress"}
                            label={t("storeAddress")}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ButtonWrapper>{t("edit-store")}</ButtonWrapper>{" "}
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
        <LoadingFetching>{t("loading-singlesingleStoreData")}</LoadingFetching>
      )}
    </>
  );
}

export default EditStore;
