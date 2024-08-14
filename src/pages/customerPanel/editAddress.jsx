import React, { useEffect } from "react";

import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UseThemMode from "@hooks/use-theme";
import ButtonWrapper from "@components/formui/SubmitButton";
import { AppbarHeader } from "@styles/appbar";
import UseFormValidation from "@formValidation/use-form-validation";
import UseInitialValues from "@utils/use-initial-values";
import SelectComp from "@components/formui/Select";
import { fetchGovernance, cleanUpGovernance } from "@state/slices/distributor";
import LoadingFetching from "@components/loadingFetching";
import TextFieldWrapper from "@components/formui/textField";
import { editAddress, getAddress, cleanUpGetAddresses } from "@state/slices/customer";

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

function EditAddress() {
  const classes = useStyles();
  const { addressId } = useParams();
  const dispatch = useDispatch();
  const { FORM_VALIDATION_SCHEMA_EDIT_ADDRESS } = UseFormValidation();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
  const {
    loadingGovernaces,
    loadingSingleStoreData,
    singleStoreData,
    governance,
  } = useSelector((state) => state.distributor);
  const {
    loadingGetSpecificAddress, singleAddressData
  } = useSelector((state) => state.customer);
  console.log("singleAddressData")
  console.log(singleAddressData)
  const { Uid } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAddress({ customerId: Uid, addressId }));
    if (governance.length === 0) {
      dispatch(fetchGovernance());
    }
    return () => {
      dispatch(cleanUpGetAddresses())
    }
  }, [])
  console.log(singleStoreData?.city);
  console.log(typeof singleStoreData?.city);
  const { INITIAL_FORM_STATE_Edit_ADDRESS } = UseInitialValues(singleAddressData);
  let allCities = [];

  governance?.forEach((obj) => {
    allCities = allCities.concat(obj.cities);
  });

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {!loadingGovernaces && !loadingGetSpecificAddress ? (
        <Container maxWidth="sm" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
          {/* <ToastContainer /> */}
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
                      ...INITIAL_FORM_STATE_Edit_ADDRESS,
                      // singleStoreName: singleStoreData.name,
                      // singleStoreAddress: singleStoreData.address,
                      // singleAddressCity: singleStoreData.city,
                    }}
                    validationSchema={FORM_VALIDATION_SCHEMA_EDIT_ADDRESS}
                    onSubmit={(values) => {
                      console.log({ ...values });
                      dispatch(
                        editAddress({
                          customerId: Uid,
                          addressId,
                          city_id: values.singleAddressCity,
                          address: values.singleAddress,
                        })
                      )
                        .unwrap()
                        .then(() => {
                          {
                            toast.success(t("address-edited"), {
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
                              navigate("/customer-control-panel/");
                            }, 1000);
                          }
                        })

                        .catch((error) => {
                          if (error.response.status === 401) {
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
                              text: t("forbidden-txt-buyer"),
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
                            <AppbarHeader data-aos="fade-up">{t("edit-address-now")}</AppbarHeader>
                          </Typography>
                        </Grid>{" "}
                        <Grid item xs={12}>
                          <SelectComp
                            name="singleAddressCity"
                            label={t("city")}
                            options={allCities}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextFieldWrapper
                            name="singleAddress"
                            label={t("full-address")}
                          />
                        </Grid>{" "}

                        <Grid item xs={12}>
                          <ButtonWrapper>{t("edit-address")}</ButtonWrapper>{" "}
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
        <LoadingFetching>{t("wait-address")}</LoadingFetching>
      )}
    </div>
  );
}

export default EditAddress;
