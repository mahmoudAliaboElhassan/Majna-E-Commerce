import React from "react";

import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import TextFieldWrapper from "@components/formui/textField";
import ButtonWrapper from "@components/formui/SubmitButton";
import UseFormValidation from "@formValidation/use-form-validation";
import UseThemMode from "@hooks/use-theme";
import UseInitialValues from "@utils/use-initial-values";
import { forgetPassword } from "@state/slices/auth";
import { AppbarHeader } from "@styles/appbar";

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
const { INITIAL_FORM_STATE_FORGET_PASSWORD } = UseInitialValues();
function ForgetPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { FORM_VALIDATION_SCHEMA_FORGET_PASSWORD } = UseFormValidation();
  const { t } = useTranslation();
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
                  ...INITIAL_FORM_STATE_FORGET_PASSWORD,
                }}
                validationSchema={FORM_VALIDATION_SCHEMA_FORGET_PASSWORD}
                onSubmit={(values) => {
                  console.log({ ...values });
                  dispatch(
                    forgetPassword({
                      email: values.email,
                    })
                  )
                    .unwrap()
                    .then(() => {
                      {
                        toast.success(t("check-inbox-reset"), {
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
                      Swal.fire({
                        title: t("error-forget-dispatch"),
                        text: t("error-forget-dispatch-text"),
                        icon: "error",
                      });
                    });
                }}
              >
                <Form className={classes.formWrapper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>
                        <AppbarHeader>
                          {t("forget-password-heading")}
                        </AppbarHeader>
                      </Typography>
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <TextFieldWrapper
                        name="email"
                        label={t("email")}
                        autocomplete="off"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonWrapper>{t("forget-password-btn")}</ButtonWrapper>{" "}
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                      <Typography component={Link} to={"/"}>
                        {t("go-back")}
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

export default ForgetPassword;
