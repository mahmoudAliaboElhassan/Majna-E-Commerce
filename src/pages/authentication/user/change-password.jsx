import React, { useState } from "react";

import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ButtonWrapper from "@components/formui/SubmitButton";
import PasswordField from "@components/formui/passwordField";
import UseThemMode from "@hooks/use-theme";
import UseInitialValues from "@utils/use-initial-values";
import UseFormValidation from "@formValidation/use-form-validation";
import { changePassword, logOut } from "@state/slices/auth";
import { AppbarHeader } from "@styles/appbar";
import withGuard from "@utils/withGuard";

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
const { INITIAL_FORM_STATE_CHANGE_PASSWORD } = UseInitialValues();
function ChangePassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD } = UseFormValidation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Uid } = useSelector((state) => state.auth);
  const { themeMode } = UseThemMode();

  return (
    <Container maxWidth="sm" className={classes.containerWrapper}>
      <ToastContainer />
      <Card raised>
        <Container maxWidth="md">
          <Grid container>
            <Grid item={12}>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE_CHANGE_PASSWORD,
                }}
                validationSchema={FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD}
                onSubmit={(values) => {
                  dispatch(
                    changePassword({
                      userId: Uid,
                      current_password: values.currentPassword,
                      new_password: values.newPassword,
                      re_new_password: values.confirm_newPassword,
                    })
                  )
                    .unwrap()
                    .then(() => {
                      {
                        toast.success(t("change-password-success"), {
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
                          console.log("hello");
                          navigate("/");
                        }, 1000);
                      }
                    })
                    .catch((error) => {
                      if (error.response.status === 400) {
                        Swal.fire({
                          title: t("error-change-password"),
                          text: t("error-change-password-text"),
                          icon: "error",
                          confirmButtonText: t("ok"),
                        });
                      }
                      if (error.response.status === 404) {
                        Swal.fire({
                          title: t("error-change-password"),
                          text: t("error-change-password-not-user-text"),
                          icon: "error",
                          confirmButtonText: t("ok"),
                        });
                      }
                    });
                }}
              >
                <Form className={classes.formWrapper}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <Typography>
                        <AppbarHeader>
                          {t("change-password-heading")}
                        </AppbarHeader>
                      </Typography>
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <PasswordField
                        name="currentPassword"
                        label={t("current-password")}
                        autocomplete="off"
                      />
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <PasswordField
                        name="newPassword"
                        label={t("new-password")}
                        autocomplete="off"
                      />
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <PasswordField
                        name="confirm_newPassword"
                        label={t("confirm-new-password")}
                        autocomplete="off"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonWrapper>{t("change-password")}</ButtonWrapper>{" "}
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                      <Typography
                        component={Link}
                        onClick={() => dispatch(logOut())}
                      >
                        {t("logout")}
                      </Typography>{" "}
                    </Grid>
                  </Grid>{" "}
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </Container>
  );
}

export default withGuard(ChangePassword);
