import React, { useEffect } from "react";

import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import TextFieldWrapper from "@components/formui/textField";
import PasswordField from "@components/formui/passwordField";
import CheckboxWrapper from "@components/formui/CheckBox";
import AuthLink from "@components/formui/authLink";
import PhoneNumber from "@components/formui/phone";
import ButtonWrapper from "@components/formui/SubmitButton";
import UseFormValidation from "@formValidation/use-form-validation";
import UseThemMode from "@hooks/use-theme";
import UseInitialValues from "@utils/use-initial-values";
import { signUp } from "@state/slices/auth";
import { AppbarHeader } from "@styles/appbar";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color:
      theme.palette.type === "dark" ? theme.palette.common.white : "inherit",
    backgroundColor: "transparent !important",
  },
}));
const { INITIAL_FORM_STATE_SignUp } = UseInitialValues();

function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { FORM_VALIDATION_SCHEMA_SignUp } = UseFormValidation();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
  const { token, role } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    token &&
      (role === "reviewer"
        ? navigate("/reviewer")
        : (role === "distributor" || role === "customer") &&
        navigate("/"))
  }, [])
  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item={12}>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE_SignUp,
            }}
            validationSchema={FORM_VALIDATION_SCHEMA_SignUp}
            onSubmit={(values) => {
              console.log(values);
              console.log(localStorage.getItem("type"))
              dispatch(
                signUp({
                  username: values.username,
                  email: values.email,
                  password: values.password,
                  role: localStorage.getItem("type"),
                })
              )
                .unwrap()
                .then(() => {
                  localStorage.setItem("email", values.email)
                  {
                    toast.success(t("signup-success"), {
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
                      title: t("error-signup"),
                      text: t("error-signup-text"),
                      icon: "error",
                      confirmButtonText: t("ok"),
                    });
                  }
                });
            }}
          >
            <Form className={classes.formWrapper}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    <AppbarHeader>{t("create-account")}</AppbarHeader>
                  </Typography>
                </Grid>{" "}
                <Grid item xs={12}>
                  <TextFieldWrapper
                    name="username"
                    type="text"
                    label={t("username")}
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <TextFieldWrapper name="email" label={t("email")} />
                </Grid>
                <Grid item xs={12}>
                  <PasswordField name="password" label={t("password")} />
                </Grid>{" "}
                <Grid item xs={12}>
                  <PasswordField
                    name="confirm_password"
                    label={t("confirm-password")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CheckboxWrapper
                    name="termsOfService"
                    legend={t("terms-conditions")}
                    label={t("i-agree")}
                  />{" "}
                </Grid>{" "}
                <Grid item xs={6}>
                  {/* <PhoneNumber />{" "} */}
                </Grid>{" "}
                <Grid item xs={12}>
                  <ButtonWrapper>{t("signup")}</ButtonWrapper>{" "}
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography component="span">
                    {t("have-account")}
                  </Typography>{" "}
                  <AuthLink>
                    <Typography component={Link} to="/login">
                      {t("login")}
                    </Typography>{" "}
                  </AuthLink>
                </Grid>
              </Grid>{" "}
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;
